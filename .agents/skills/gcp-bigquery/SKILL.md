---
name: gcp-bigquery
<<<<<<< HEAD
description: "Serverless data warehouse with BigQuery: SQL queries, partitioning, slots, and ML integration."
category: cloud
---

# GCP BigQuery Analytics

Serverless data warehouse with BigQuery: SQL queries, partitioning, slots, and ML integration.

## When to Use
Use this skill when working on tasks related to gcp bigquery analytics.

## Key Capabilities
- Expert guidance on gcp bigquery analytics workflows and best practices
- Step-by-step assistance for common gcp bigquery analytics tasks

## Limitations
- Use this skill only when the task clearly matches the scope described above.
=======
cluster: cloud-gcp
description: "Google Cloud's BigQuery is a serverless, fully managed data warehouse for running SQL queries on large datasets."
tags: ["bigquery","gcp","sql"]
dependencies: []
composes: []
similar_to: []
called_by: []
authorization_required: false
scope: general
model_hint: claude-sonnet
embedding_hint: "gcp bigquery sql data warehouse analytics"
---

# gcp-bigquery

## Google Cloud Integration

This skill delegates all GCP provisioning and operations to the official Google Cloud Python client libraries.

```bash
# Core GCP client library
pip install google-cloud-python

# Vertex AI + Agent Engine (AI/ML workloads)
pip install google-cloud-aiplatform

# Specific service clients (install only what you need)
pip install google-cloud-bigquery      # BigQuery
pip install google-cloud-storage       # Cloud Storage
pip install google-cloud-pubsub        # Pub/Sub
pip install google-cloud-run           # Cloud Run
```

**SDK Docs:** https://github.com/googleapis/google-cloud-python
**Vertex AI SDK:** https://cloud.google.com/vertex-ai/docs/python-sdk/use-vertex-ai-python-sdk

Use the Google Cloud Python SDK for all GCP provisioning and operational actions. This skill provides architecture guidance, cost modeling, and pre-flight requirements — the SDK handles execution.

## Architecture Guidance

Consult this skill for:
- GCP service selection and trade-off analysis
- Cost estimation and optimization (committed use discounts, sustained use)
- Pre-flight IAM / Workload Identity Federation requirements
- IaC approach (Terraform AzureRM vs Deployment Manager vs Config Connector)
- Integration patterns with Google Workspace and other GCP services
- Vertex AI Agent Engine for multi-agent workflow design

## Agent & AI Capabilities

| Capability | Tool |
|---|---|
| LLM agents | Vertex AI Agent Engine |
| Model serving | Vertex AI Model Garden |
| RAG | Vertex AI Search + Embeddings API |
| Multi-agent | Agent Development Kit (google/adk-python) |
| MCP | Vertex AI Extensions (MCP-compatible) |

## Reference

- [Google Cloud Python Client](https://github.com/googleapis/google-cloud-python)
- [Vertex AI Python SDK](https://cloud.google.com/vertex-ai/docs/python-sdk/use-vertex-ai-python-sdk)
- [Google ADK](https://github.com/google/adk-python)
- [GCP Pricing Calculator](https://cloud.google.com/products/calculator)
- [IAM Best Practices](https://cloud.google.com/iam/docs/best-practices-for-using-and-securing-service-accounts)
- [Workload Identity Federation](https://cloud.google.com/iam/docs/workload-identity-federation)
>>>>>>> 4b9d09d6dab9a725d3e3c3e2f77c256484dc8d8b
