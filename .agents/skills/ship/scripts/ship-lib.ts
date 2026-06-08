// Shared helpers for the `ship` skill (TypeScript, run via bun).
// Import these; do not execute this file directly.
//
// Git/branch/remote work stays as subprocess calls — it is inherently a git
// operation, not an API one. The Azure DevOps and GitHub REST surfaces use their
// official SDKs (azure-devops-node-api, @octokit/rest). All subprocess calls go
// through execFile with an argument array — never a shell string — so nothing is
// interpolated into a shell.

import { execFileSync } from "node:child_process";

export type Platform = "azure" | "github" | "unknown";

export interface AdoParts {
  orgUrl: string;
  project: string;
  repo: string;
}

/** Run a command with an argument array (no shell). Returns trimmed stdout.
 *  With { allowFail: true }, a non-zero exit yields "" instead of throwing. */
export function sh(cmd: string, args: string[], opts: { allowFail?: boolean } = {}): string {
  try {
    return execFileSync(cmd, args, { encoding: "utf8" }).trim();
  } catch (err) {
    if (opts.allowFail) return "";
    throw err;
  }
}

/** Current checked-out branch name. */
export function currentBranch(): string {
  return sh("git", ["rev-parse", "--abbrev-ref", "HEAD"]);
}

/** Fetch URL of a remote (default: origin). Empty string if the remote is unset. */
export function remoteUrl(remote = "origin"): string {
  return sh("git", ["remote", "get-url", remote], { allowFail: true });
}

/** Classify a remote URL. Override with SHIP_PLATFORM=azure|github when detection
 *  is wrong (e.g. a custom SSH host alias that hides the real host). */
export function detectKind(url: string = remoteUrl()): Platform {
  const override = process.env.SHIP_PLATFORM;
  if (override === "azure" || override === "github") return override;
  if (/dev\.azure\.com|visualstudio\.com/.test(url)) return "azure";
  if (/github/.test(url)) return "github";
  return "unknown";
}

/** Parse an Azure DevOps remote URL into org URL / project / repo.
 *  Handles HTTPS (dev.azure.com), SSH (ssh.dev.azure.com:v3/...), and legacy
 *  *.visualstudio.com. Returns null if the URL is not an Azure DevOps URL. */
export function adoParts(url: string = remoteUrl()): AdoParts | null {
  let m = url.match(/dev\.azure\.com[^:/\s]*[:/]+(?:v3\/)?([^/]+)\/([^/]+)\/(?:_git\/)?([^/]+)$/);
  if (m) return { orgUrl: `https://dev.azure.com/${m[1]}`, project: m[2], repo: m[3].replace(/\.git$/, "") };
  m = url.match(/([^/@.]+)\.visualstudio\.com\/([^/]+)\/(?:_git\/)?([^/]+)$/);
  if (m) return { orgUrl: `https://dev.azure.com/${m[1]}`, project: m[2], repo: m[3].replace(/\.git$/, "") };
  return null;
}

/** Mint a short-lived Azure DevOps OAuth access token via the logged-in az CLI.
 *  499b84ac-1321-427f-aa17-267ca6975798 is the constant Azure DevOps API resource
 *  id (not a secret — the same for every org). Used as a git Bearer header and as
 *  the bearer for the azure-devops-node-api WebApi connection. */
export function adoToken(): string {
  return sh("az", [
    "account", "get-access-token",
    "--resource", "499b84ac-1321-427f-aa17-267ca6975798",
    "--query", "accessToken", "-o", "tsv",
  ]);
}

/** Best-effort extraction of a work-item id from a branch name or commit subject.
 *  Recognizes `AB#1234`, `AB1234`, and a number delimited by / _ - (e.g.
 *  feature/1234-foo). Returns the id or "". Heuristic — confirm it exists before
 *  trusting it (see adoWorkItemExists in ship-pr.ts). */
export function parseWorkItem(s: string = currentBranch()): string {
  let m = s.match(/[Aa][Bb]#?(\d{1,7})/);
  if (m) return m[1];
  m = s.match(/(?:^|[/_-])(\d{2,7})(?:[/_-]|$)/);
  if (m) return m[1];
  return "";
}
