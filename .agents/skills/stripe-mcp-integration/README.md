# Stripe MCP Integration

A Claude Code skill for integrating with Stripe payment infrastructure via the Model Context Protocol (MCP).

## Overview

This skill enables Claude to interact directly with Stripe APIs for:
- Customer management
- Subscription handling
- Invoice operations
- Product catalog management
- Documentation search

## Installation

### Method 1: Remote HTTP (Recommended)

Add to `~/.claude/settings.json`:

```json
{
  "mcpServers": {
    "stripe": {
      "type": "http",
      "url": "https://mcp.stripe.com/v1/sse"
    }
  }
}
```

### Method 2: Local npm

```bash
npm install -g @stripe/mcp
claude mcp add stripe -- npx -y @stripe/mcp
```

### Method 3: Project Configuration

Create `.mcp.json` in your project:

```json
{
  "mcpServers": {
    "stripe": {
      "command": "npx",
      "args": ["-y", "@stripe/mcp"],
      "env": {
        "STRIPE_SECRET_KEY": "${STRIPE_SECRET_KEY}"
      }
    }
  }
}
```

## Usage

After installation, interact with Stripe through natural language:

```
"Create a customer with email user@example.com"
"List all my Stripe products"
"Search Stripe docs for subscription billing"
"Cancel subscription sub_xxx"
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `STRIPE_SECRET_KEY` | Your Stripe API key |
| `STRIPE_WEBHOOK_SECRET` | Webhook signing secret |

## Documentation

- [SKILL.md](SKILL.md) - Complete skill reference
- [docs/webhooks.md](docs/webhooks.md) - Webhook security patterns
- [docs/testing.md](docs/testing.md) - Testing guide

## Resources

- [Stripe MCP Documentation](https://docs.stripe.com/mcp)
- [Stripe API Reference](https://docs.stripe.com/api)
- [Stripe CLI](https://docs.stripe.com/cli)

## License

MIT
