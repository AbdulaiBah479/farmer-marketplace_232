# WoopSocial Social Media Skill

Publish, schedule, and manage social media posts across 7 platforms directly from Claude, Claude Code, or any agent that supports [Agent Skills](https://agentskills.io).

## What this does

This skill teaches Claude the complete workflow for posting to social media through [WoopSocial](https://woopsocial.com):

- **Post to any platform** — Facebook, Instagram, LinkedIn, X/Twitter, Pinterest, TikTok, YouTube
- **Schedule content** — Set posts for future dates and times
- **Build content calendars** — Create a week or month of content in one conversation
- **Upload media** — Attach images and videos to posts automatically
- **Cross-platform adaptation** — Automatically adjusts content per platform (character limits, tone, hashtags)

The skill handles all the orchestration: resolving project IDs, finding the right social accounts, validating posts before publishing, and managing media uploads. You just say what you want to post.

## Prerequisites

You need a WoopSocial account with the MCP connected. Setup takes about 60 seconds:

1. Sign up at [woopsocial.com](https://woopsocial.com)
2. Connect your social media accounts in the dashboard
3. Connect the WoopSocial MCP — [setup guide](https://woopsocial.com/social-media-mcp)

## Install

**Claude Code:**
```bash
npx skills add woopsocial/woopsocial-social-media-skill
```

**Manual install (any agent):**
Copy the `SKILL.md` file into your agent's skills directory.

## Example prompts

Once installed, just talk to Claude naturally:

- "Post 'Just launched our new feature!' to LinkedIn and X"
- "Create a week of Instagram content about our product launch"
- "Schedule a TikTok post for tomorrow at 2pm EST"
- "Show me what's scheduled for this week"
- "Build a 30-day content calendar for our social accounts"

## How it works

```
You: "Post this announcement to all my social accounts"
                          │
            ┌─────────────▼──────────────┐
            │  Skill reads the workflow   │
            │  instructions in SKILL.md   │
            └─────────────┬──────────────┘
                          │
         ┌────────────────▼────────────────┐
         │ 1. projects_list → gets project │
         │ 2. social_accounts_list → finds │
         │    connected platforms           │
         │ 3. Adapts content per platform  │
         │ 4. posts_validate → checks      │
         │ 5. posts_create → publishes     │
         └────────────────┬────────────────┘
                          │
                          ▼
              Posted to all platforms ✓
```

Without this skill, AI assistants often ask you for project IDs and account IDs instead of looking them up automatically. The skill encodes the correct workflow so Claude resolves everything silently.

## Platforms supported

| Platform | Text | Images | Video | Scheduling |
|----------|------|--------|-------|------------|
| Facebook | ✓ | ✓ | ✓ | ✓ |
| Instagram | ✓ | ✓ | ✓ | ✓ |
| LinkedIn | ✓ | ✓ | ✓ | ✓ |
| X/Twitter | ✓ | ✓ | ✓ | ✓ |
| Pinterest | ✓ | ✓ | ✓ | ✓ |
| TikTok | ✓ | ✓ | ✓ | ✓ |
| YouTube | ✓ | ✓ | ✓ | ✓ |

## License

MIT

## Links

- [WoopSocial](https://woopsocial.com)
- [MCP Setup Guide](https://woopsocial.com/social-media-mcp)
- [API Documentation](https://docs.woopsocial.com)
- [MCP Tools Reference](https://docs.woopsocial.com/mcp/tools-reference)
