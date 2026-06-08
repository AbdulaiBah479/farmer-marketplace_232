---
name: social-media-post
description: Post photos, videos, and text to all social media platforms (Instagram, LinkedIn, X, Facebook, TikTok, Threads, Pinterest, Bluesky, Reddit, YouTube, Google Business) via Upload Post API. Use when the user wants to post to social media, upload content to any platform, schedule posts, or check post analytics. Triggers on "post to", "upload to", "publish to", "share on", "schedule post", "social media", combined with any platform name.
allowed-tools: Read, Bash, Glob, Edit, WebFetch
---

# Social Media Post Skill

Post photos, videos, text, and documents to all major social media platforms using the Upload Post API.

## Setup

- **API Key**: Set `UPLOAD_POST_API_KEY` in your environment or `.env` file
- **Service**: Upload Post (https://api.upload-post.com/api)
- **Auth Header**: `Authorization: Apikey <key>`
- **Docs**: https://docs.upload-post.com

## Finding the API Key

Look for the key in this order:
1. Environment variable: `$UPLOAD_POST_API_KEY`
2. `.env` file in current directory
3. `~/.env` or common project `.env` locations

Load it with:
```bash
export UPLOAD_POST_API_KEY=$(grep UPLOAD_POST_API_KEY .env 2>/dev/null | cut -d= -f2 || echo "$UPLOAD_POST_API_KEY")
```

## Connected Accounts

> **CUSTOMIZE THIS**: Replace with your own profile names from Upload Post dashboard.
> After connecting your social accounts at upload-post.com, list them here.

| Profile Name | Platforms | Type |
|-------------|-----------|------|
| **my-business** | Instagram, LinkedIn, X | Business page |
| **my-personal** | Instagram, TikTok | Personal account |

## Core Rules

1. **ALWAYS ask which account** before posting — never assume
2. **ALWAYS show content preview** (image + caption/text) for approval before posting
3. **NEVER post without explicit user confirmation**
4. After posting, always display the live URL(s) for each platform
5. Monitor usage limits (shown in API response)

## Posting Commands

### Photo Post (Single or Carousel)

```bash
curl -s -X POST "https://api.upload-post.com/api/upload_photos" \
  -H "Authorization: Apikey $UPLOAD_POST_API_KEY" \
  -F "user=PROFILE_NAME" \
  -F "platform[]=instagram" \
  -F "platform[]=linkedin" \
  -F "description=Your caption here" \
  -F "photos[]=@/path/to/image.png"
```

For carousel (multiple images), add more `-F "photos[]=@/path/to/imageN.png"` fields.

### Video Post

```bash
curl -s -X POST "https://api.upload-post.com/api/upload_videos" \
  -H "Authorization: Apikey $UPLOAD_POST_API_KEY" \
  -F "user=PROFILE_NAME" \
  -F "platform[]=tiktok" \
  -F "platform[]=instagram" \
  -F "title=Video Title" \
  -F "description=Video description" \
  -F "videos[]=@/path/to/video.mp4"
```

### Text Post

```bash
curl -s -X POST "https://api.upload-post.com/api/upload_text" \
  -H "Authorization: Apikey $UPLOAD_POST_API_KEY" \
  -F "user=PROFILE_NAME" \
  -F "platform[]=twitter" \
  -F "platform[]=linkedin" \
  -F "platform[]=threads" \
  -F "title=Your text post content here"
```

### Document Post (LinkedIn Only)

```bash
curl -s -X POST "https://api.upload-post.com/api/uploadposts/documents" \
  -H "Authorization: Apikey $UPLOAD_POST_API_KEY" \
  -F "user=PROFILE_NAME" \
  -F "platform[]=linkedin" \
  -F "title=Document title" \
  -F "description=Document description" \
  -F "document=@/path/to/file.pdf"
```

## Scheduling

Add these fields to any upload command:

```bash
  -F "scheduled_date=2026-03-15T10:00:00" \
  -F "timezone=Asia/Jerusalem"
```

Or use the queue system for auto-scheduling:
```bash
  -F "add_to_queue=true"
```

## First Comment

Auto-post a comment after publishing:
```bash
  -F "first_comment=Link in bio! Check the full article at example.com"
```

## Platform-Specific Parameters

### Instagram
| Parameter | Description |
|-----------|-------------|
| `media_type` | `FEED` (default), `STORY`, `CAROUSEL` |
| `collaborators` | Comma-separated Instagram usernames |
| `user_tags` | Comma-separated usernames to tag |
| `location_id` | Instagram location ID |
| `first_comment` | Auto-posted comment after publishing |

### YouTube
| Parameter | Description |
|-----------|-------------|
| `title` | Video title (required) |
| `description` | Video description |
| `privacy_status` | `public`, `private`, `unlisted` |

### Pinterest
| Parameter | Description |
|-----------|-------------|
| `board_id` | Target board ID (get via boards endpoint) |
| `link` | Destination URL for the pin |

### TikTok
| Parameter | Description |
|-----------|-------------|
| `title` | Video caption |
| `privacy_level` | `PUBLIC_TO_EVERYONE`, `MUTUAL_FOLLOW_FRIENDS`, `SELF_ONLY` |

### Reddit
| Parameter | Description |
|-----------|-------------|
| `title` | Post title (required) |
| `subreddit` | Target subreddit name |

## Management Commands

### Check post status
```bash
curl -s -H "Authorization: Apikey $UPLOAD_POST_API_KEY" \
  "https://api.upload-post.com/api/uploadposts/status?request_id=REQUEST_ID"
```

### View scheduled posts
```bash
curl -s -H "Authorization: Apikey $UPLOAD_POST_API_KEY" \
  "https://api.upload-post.com/api/uploadposts/schedule"
```

### Cancel scheduled post
```bash
curl -s -X DELETE -H "Authorization: Apikey $UPLOAD_POST_API_KEY" \
  "https://api.upload-post.com/api/uploadposts/schedule/JOB_ID"
```

### Edit scheduled post
```bash
curl -s -X PATCH -H "Authorization: Apikey $UPLOAD_POST_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"scheduled_date": "2026-03-20T14:00:00", "title": "Updated caption"}' \
  "https://api.upload-post.com/api/uploadposts/schedule/JOB_ID"
```

### View upload history
```bash
curl -s -H "Authorization: Apikey $UPLOAD_POST_API_KEY" \
  "https://api.upload-post.com/api/uploadposts/history?page=1&limit=10"
```

### Get profile analytics
```bash
curl -s -H "Authorization: Apikey $UPLOAD_POST_API_KEY" \
  "https://api.upload-post.com/api/analytics/PROFILE_NAME?platforms=instagram,linkedin,twitter"
```

### Get post analytics
```bash
curl -s -H "Authorization: Apikey $UPLOAD_POST_API_KEY" \
  "https://api.upload-post.com/api/uploadposts/post-analytics/REQUEST_ID"
```

## Queue Management

### View queue settings
```bash
curl -s -H "Authorization: Apikey $UPLOAD_POST_API_KEY" \
  "https://api.upload-post.com/api/uploadposts/queue/settings?profile_username=PROFILE_NAME"
```

### Preview next queue slots
```bash
curl -s -H "Authorization: Apikey $UPLOAD_POST_API_KEY" \
  "https://api.upload-post.com/api/uploadposts/queue/preview?profile_username=PROFILE_NAME&count=5"
```

### Get next available slot
```bash
curl -s -H "Authorization: Apikey $UPLOAD_POST_API_KEY" \
  "https://api.upload-post.com/api/uploadposts/queue/next-slot?profile_username=PROFILE_NAME"
```

## Instagram Interactions

### Get comments on a post
```bash
curl -s -H "Authorization: Apikey $UPLOAD_POST_API_KEY" \
  "https://api.upload-post.com/api/uploadposts/comments?platform=instagram&user=PROFILE_NAME&post_id=POST_ID"
```

### Reply to a comment
```bash
curl -s -X POST "https://api.upload-post.com/api/uploadposts/comments/reply" \
  -H "Authorization: Apikey $UPLOAD_POST_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"platform": "instagram", "user": "PROFILE_NAME", "comment_id": "COMMENT_ID", "message": "Thanks!"}'
```

### Send a DM
```bash
curl -s -X POST "https://api.upload-post.com/api/uploadposts/dms/send" \
  -H "Authorization: Apikey $UPLOAD_POST_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"platform": "instagram", "user": "PROFILE_NAME", "recipient_id": "USER_ID", "message": "Hello!"}'
```

## Response Format

Successful posts return:
```json
{
  "success": true,
  "results": {
    "instagram": { "success": true, "post_id": "...", "url": "https://instagram.com/p/..." },
    "linkedin": { "success": true, "post_id": "...", "url": "https://linkedin.com/feed/update/..." }
  },
  "usage": { "count": 5, "limit": 10 }
}
```

Always display:
1. Success/failure per platform
2. Live URLs for each platform
3. Current usage count vs limit
