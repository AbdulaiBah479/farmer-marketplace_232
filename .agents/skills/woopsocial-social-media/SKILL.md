---
name: woopsocial-social-media
description: Publish, schedule, and manage social media posts across Facebook, Instagram, LinkedIn, X/Twitter, Pinterest, TikTok, and YouTube through the WoopSocial MCP. Use this skill whenever the user wants to post to social media, schedule content, build a content calendar, manage social accounts, upload media for social posts, or automate multi-platform publishing. Also triggers when the user mentions WoopSocial, cross-posting, social scheduling, or wants to turn any content (blog posts, ideas, announcements) into social media posts. If the user asks to "post this", "share this on social", "schedule for next week", or anything involving publishing content to social platforms, use this skill.
---

# WoopSocial Social Media Skill

You help the user create, schedule, and manage social media content across platforms using WoopSocial's MCP tools.

## Golden Rule: Never Ask for Internal IDs

The user does not know (and should never need to know) project IDs, social account IDs, or post IDs. Always resolve these silently by calling the appropriate tool first. This is the single most important behavior in this skill.

## Tool Reference

These are the WoopSocial MCP tools available to you:

**Discovery (call these first, silently):**
- `projects_list` — returns the user's projects (called "Business Profiles" in the UI)
- `social_accounts_list` — returns connected social accounts and their platforms
- `social_accounts_get_platform_inputs` — returns platform-specific options (e.g. Instagram post types, YouTube privacy settings)

**Posting:**
- `posts_create` — creates and optionally schedules a post to one or more social accounts
- `posts_validate` — dry-run validation without actually creating the post
- `posts_get` — retrieves a specific post by ID
- `posts_delete` — deletes a scheduled post
- `social_account_posts_list` — lists posts across social accounts

**Media:**
- `media_uploads_create_session` — starts a chunked upload and returns presigned URLs
- `media_uploads_get_session` — checks upload progress
- `media_uploads_complete_session` — finalizes the upload

**Webhooks:**
- `webhooks_create_endpoint` — registers a callback URL for post events
- `webhooks_list_endpoints` — lists active webhooks
- `webhooks_delete_endpoint` — removes a webhook

**Utility:**
- `health_get` — confirms the API is reachable

## Core Workflows

### Posting Content

When the user wants to post or schedule content, follow this exact sequence:

**Step 1 — Resolve the project.**
Call `projects_list`. If there is exactly one project, use it. If there are multiple, present them by name and ask which one to use. Never show raw IDs.

**Step 2 — Resolve social accounts.**
Call `social_accounts_list` for the chosen project. Match accounts to the platforms the user mentioned. If the user said "post to Instagram and LinkedIn", find those accounts. If they didn't specify platforms, show available accounts by platform name and ask which ones to post to.

**Step 3 — Check platform-specific options (when relevant).**
If posting to a platform with special options (Instagram carousels, YouTube privacy settings, Pinterest boards), call `social_accounts_get_platform_inputs` for that account so you can set options correctly.

**Step 4 — Validate before posting.**
Call `posts_validate` with the assembled post data. If validation returns errors, fix them or tell the user what needs to change (character limits, missing media, unsupported format). Do not create the post until validation passes.

**Step 5 — Create the post.**
Call `posts_create`. Confirm success to the user with a brief summary: which platforms, when it will publish, and a preview of the content.

### Scheduling Content

When the user wants to schedule for a future time:
- Include the `scheduledAt` timestamp in the `posts_create` call
- Always confirm the timezone with the user if they say something ambiguous like "tomorrow at 9am"
- Present the scheduled time back to the user in their local context

### Building a Content Calendar

When the user wants a batch of posts (e.g. "create a week of content" or "build a 30-day calendar"):

1. Resolve project and accounts first (Steps 1-2 above, once)
2. Draft all posts as a calendar preview and present it to the user for approval before creating anything
3. After approval, create posts one at a time using `posts_create` with appropriate `scheduledAt` values
4. If any post fails validation, flag it and continue with the rest
5. Summarize the results at the end: how many posted, how many need fixes

### Uploading Media

When a post requires images or videos:

1. Call `media_uploads_create_session` to get presigned upload URLs
2. Upload the media using the presigned URLs
3. Call `media_uploads_complete_session` to finalize
4. Attach the resulting media ID to the post in `posts_create`

If the user provides an image URL or asks you to generate an image, handle the media upload transparently. The user should not have to think about upload sessions.

### Reviewing Posted Content

When the user asks about existing posts or wants to see what's scheduled:

1. Resolve the project (Step 1)
2. Call `social_account_posts_list` to retrieve posts
3. Present results clearly: post content, platform, status (scheduled/published), and date

## Platform-Specific Guidance

When adapting content across platforms, apply these defaults unless the user says otherwise:

- **X/Twitter**: Keep under 280 characters. Use 1-3 hashtags max. Punchy and conversational.
- **LinkedIn**: Professional tone. Can be longer (up to 3,000 chars). Use line breaks for readability. 3-5 hashtags.
- **Instagram**: Caption-focused. Hashtags can go heavier (up to 10-15). Include a call to action.
- **Facebook**: Conversational. Medium length. Minimal hashtags (0-3).
- **Pinterest**: Description should be keyword-rich and searchable. Include a destination URL if available.
- **TikTok**: Short description. Trend-aware hashtags. Pair with video content.
- **YouTube**: Title, description, and tags. Description should front-load key info in first 2 lines.

When the user asks to post the same content to multiple platforms, adapt the content per platform rather than posting identical text everywhere. Ask the user if they want you to adapt it or keep it identical.

## Error Handling

- If `health_get` fails, tell the user WoopSocial's API is temporarily unreachable and to try again shortly.
- If `projects_list` returns empty, the user hasn't set up a project yet. Direct them to create one at app.woopsocial.com.
- If `social_accounts_list` returns empty for a project, the user hasn't connected any social accounts. Direct them to connect accounts in the WoopSocial dashboard.
- If `posts_create` fails after `posts_validate` succeeded, retry once. If it fails again, report the error clearly.
- If media upload fails, suggest the user check file size (max 5GB) and format compatibility.

## Tone

Be efficient and action-oriented. The user wants posts published, not a lecture about social media strategy — unless they specifically ask for strategy advice. When presenting a content calendar or post previews, use clean formatting but don't over-explain. Get things posted.
