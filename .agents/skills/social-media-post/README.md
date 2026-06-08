# Social Media Post — Claude Code Skill

Post to **all your professional social media accounts** directly from Claude Code. One command, every platform.

Supports: Instagram, LinkedIn, X (Twitter), Facebook, TikTok, Threads, Pinterest, Bluesky, Reddit, YouTube, Google Business Profile.

## Quick Install

```bash
# Copy the skill to your Claude Code skills directory
mkdir -p ~/.claude/skills/social-media-post
cp SKILL.md ~/.claude/skills/social-media-post/SKILL.md
```

Or clone and copy:

```bash
git clone https://github.com/guyaga/claude-code-social-media-skill.git
mkdir -p ~/.claude/skills/social-media-post
cp claude-code-social-media-skill/SKILL.md ~/.claude/skills/social-media-post/SKILL.md
```

## Setup

1. **Get an API key** from [upload-post.com](https://upload-post.com)
2. **Connect your social accounts** in the Upload Post dashboard
3. **Add your API key** to your environment:

```bash
# Add to your .env file or export directly
export UPLOAD_POST_API_KEY="your-api-key-here"
```

Or create a `.env` file in your project root:

```
UPLOAD_POST_API_KEY=your-api-key-here
```

4. **Update the skill** — Edit `SKILL.md` and replace the profile names in the "Connected Accounts" table with your own account names from Upload Post.

## Usage

Once installed, just tell Claude Code what you want to post:

```
> Post this image to Instagram and LinkedIn
> Schedule a post for tomorrow at 10am on all platforms
> Post "Just shipped v2.0!" to X and Threads
> Create a carousel from these 3 images and post to Instagram
> Check analytics for my last post
```

The skill will:

1. Ask which account to use
2. Show you a preview of the content
3. Wait for your explicit approval
4. Post and return the live URL(s)

## Features

- **Multi-platform** — Post to 11 platforms with a single command
- **Photo posts** — Single images or carousels
- **Text posts** — Text-only updates for X, LinkedIn, Threads, etc.
- **Video posts** — Upload videos to TikTok, Instagram Reels, YouTube, etc.
- **Document posts** — Share PDFs and presentations on LinkedIn
- **Scheduling** — Schedule posts up to 365 days ahead
- **Queue system** — Auto-schedule to your optimal posting times
- **First comments** — Auto-post a comment after publishing
- **Analytics** — Check post performance from the terminal
- **Upload history** — View past posts and their status
- **Instagram interactions** — Read comments, reply, send DMs

## Supported Platforms

| Platform | Photos | Videos | Text | Carousels | Documents |
|----------|--------|--------|------|-----------|-----------|
| Instagram | ✓ | ✓ | — | ✓ | — |
| LinkedIn | ✓ | ✓ | ✓ | — | ✓ (PDF/PPT) |
| X (Twitter) | ✓ | ✓ | ✓ | — | — |
| Facebook | ✓ | ✓ | ✓ | — | — |
| TikTok | ✓ | ✓ | — | — | — |
| Threads | ✓ | ✓ | ✓ | — | — |
| Pinterest | ✓ | ✓ | — | — | — |
| Bluesky | ✓ | ✓ | ✓ | — | — |
| Reddit | ✓ | — | ✓ | — | — |
| YouTube | — | ✓ | — | — | — |
| Google Business | ✓ | — | ✓ | — | — |

## API Reference

This skill uses the [Upload Post API](https://docs.upload-post.com). Key endpoints:

- `POST /api/upload_photos` — Photo/carousel posts
- `POST /api/upload_videos` — Video posts
- `POST /api/upload_text` — Text-only posts
- `POST /api/uploadposts/documents` — Document posts (LinkedIn)
- `GET /api/uploadposts/status` — Check post status
- `GET /api/uploadposts/schedule` — View scheduled posts
- `GET /api/analytics/:profile` — Get analytics

## Blog Post

Read the full tutorial on how this skill was built: [Claude Code Hub — Social Media Autopilot](https://claudecode.co.il/blog/social-media-skill)

## License

MIT
