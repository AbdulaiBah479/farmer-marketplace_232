---
name: python-logging
<<<<<<< HEAD
description: "Best practices and patterns for logging in Python development."
category: programming-python
=======
description: Use when choosing or configuring Python logging, especially deciding between stdlib logging and loguru for apps or CLIs.
>>>>>>> 4b9d09d6dab9a725d3e3c3e2f77c256484dc8d8b
---

# Python Logging

<<<<<<< HEAD
Best practices and patterns for logging in Python development.
=======
## Overview

Choose the logging system based on project needs. Core principle: stdlib logging for libraries and ecosystem integration, loguru for fast, simple app/CLI logging.

## Quick Reference

| Need | Use |
| --- | --- |
| Library or long-lived service | stdlib `logging` |
| Simple app or CLI | `loguru` |
| Integrations (Sentry/OTel) | stdlib `logging` |

## Decision Rules

Use stdlib `logging` when:
- Building a reusable library
- You need handler hierarchies or integration with ops tooling

Use `loguru` when:
- You want minimal setup and readable output
- You are building a small app or CLI

## Example

Stdlib logger setup:
```python
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
logger.info("App started")
```

## Common Mistakes

- Forcing loguru in a reusable library.
- Mixing two logging systems without a clear boundary.

## Red Flags

- Logging recommendations with no rationale for library vs app use.

## References

- `references/logging.md` - stdlib logging patterns
- `references/loguru.md` - loguru patterns
>>>>>>> 4b9d09d6dab9a725d3e3c3e2f77c256484dc8d8b
