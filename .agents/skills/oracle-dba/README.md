> ⚠️ **DEPRECATED** — This repository has been consolidated into [acedergren/agentic-tools](https://github.com/acedergren/agentic-tools).
> 
> Install the oracle-dba skill with:
> ```bash
> npx skills add acedergren/agentic-tools@oracle-dba -g
> ```
> This repo is kept for reference only and will no longer be updated.

# Oracle DBA Skill for Claude Code

A comprehensive Oracle Database Administration skill for [Claude Code](https://claude.ai/code) that provides expert DBA and DevOps guidance for Oracle Autonomous Database on OCI.

## Overview

This skill transforms Claude into an expert Oracle DBA with deep knowledge of:

- **Oracle Autonomous Database** (Shared, Dedicated, Free Tier)
- **Database Versions**: 19c, 21c, 23ai, 26ai
- **Security**: TDE, Database Vault, Data Safe, SQL Firewall
- **High Availability**: Autonomous Data Guard, PITR, Backup-Based DR
- **Performance**: AWR, ADDM, SQL Tuning, Auto Indexing
- **OCI CLI**: Complete automation commands for ADB
- **Oracle MCP Servers**: AI-assisted database operations

## Installation

### For Claude Code Users

1. Download or clone this repository
2. Add the skill to your Claude Code configuration:

```bash
# Copy to your Claude Code skills directory
cp -r oracle-dba-skill ~/.claude/skills/
```

Or add to your project's `.claude/skills/` directory.

### Skill Structure

```
oracle-dba-skill/
├── SKILL.md                    # Main skill file
├── README.md                   # This file
├── LICENSE                     # MIT License
└── references/
    ├── mcp-tools.md           # Oracle MCP server tool catalog
    ├── oci-cli.md             # OCI CLI commands for ADB
    ├── adb-security.md        # Security configuration guide
    ├── adb-ha-dr.md           # HA/DR patterns and procedures
    └── sql-patterns.md        # SQL/PLSQL best practices
```

## Features

### MCP Server Integration

Works with Oracle's official MCP servers:

- **Oracle SQLcl MCP Server** - Execute SQL and manage connections
- **Oracle Database MCP Server** - 100+ database management tools
- **Oracle DB Documentation MCP Server** - Search Oracle docs

### Comprehensive Reference Guides

| Guide | Description |
|-------|-------------|
| `mcp-tools.md` | Complete MCP server tool catalog with examples |
| `oci-cli.md` | 50+ OCI CLI commands for ADB management |
| `adb-security.md` | TDE, Database Vault, Data Redaction, Unified Audit |
| `adb-ha-dr.md` | Data Guard, PITR, Backup/Restore, DR runbooks |
| `sql-patterns.md` | Optimized SQL, Vector Search, JSON, PLSQL patterns |

### Key Capabilities

- **Performance Troubleshooting**: AWR/ADDM analysis, execution plans, wait events
- **Security Configuration**: TDE encryption, Database Vault realms, audit policies
- **HA/DR Management**: Data Guard setup, failover procedures, PITR recovery
- **SQL Optimization**: Query tuning, indexing strategies, bulk operations
- **AI Vector Search**: Vector similarity queries, hybrid search (23ai/26ai)
- **Select AI**: Natural language to SQL (23ai/26ai)

## Usage Examples

Once installed, Claude will automatically use this skill when you ask about Oracle databases:

```
> How do I enable Autonomous Data Guard for my ADB?

> Write a query to find top 10 slow SQL statements

> Set up TDE with customer-managed keys in OCI Vault

> Create a refreshable clone for DR testing

> Implement vector similarity search for RAG
```

## Requirements

- Claude Code CLI (any version supporting skills)
- For MCP integration: Oracle SQLcl 25.1+ (optional)
- For OCI CLI commands: OCI CLI installed and configured (optional)

## Related Resources

- [Oracle Database 26ai Documentation](https://docs.oracle.com/en/database/oracle/oracle-database/26/)
- [Autonomous Database Documentation](https://docs.oracle.com/en-us/iaas/autonomous-database-serverless/)
- [Oracle MCP Servers](https://github.com/oracle-samples/oracle-mcp-servers)
- [OCI CLI Reference](https://docs.oracle.com/en-us/iaas/tools/oci-cli/latest/)
- [SQLcl Documentation](https://docs.oracle.com/en/database/oracle/sql-developer-command-line/)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see [LICENSE](LICENSE) for details.

## Author

Created by [acedergren](https://github.com/acedergren)