---
name: gcp-gke
<<<<<<< HEAD
description: "Managed Kubernetes with Google Kubernetes Engine: Autopilot, Workload Identity, and Config Connector."
category: cloud
---

# GCP GKE Kubernetes

Managed Kubernetes with Google Kubernetes Engine: Autopilot, Workload Identity, and Config Connector.

## When to Use
Use this skill when working on tasks related to gcp gke kubernetes.

## Key Capabilities
- Expert guidance on gcp gke kubernetes workflows and best practices
- Step-by-step assistance for common gcp gke kubernetes tasks

## Limitations
- Use this skill only when the task clearly matches the scope described above.
=======
description: Deploy and manage Google Kubernetes Engine clusters. Configure node pools, networking, and workload identity. Use when running Kubernetes on GCP.
license: MIT
metadata:
  author: devops-skills
  version: "1.0"
---

# Google Kubernetes Engine

Deploy managed Kubernetes clusters on GCP.

## Create Cluster

```bash
gcloud container clusters create my-cluster \
  --num-nodes=3 \
  --machine-type=e2-medium \
  --zone=us-central1-a \
  --enable-autoscaling \
  --min-nodes=1 \
  --max-nodes=5 \
  --workload-pool=${PROJECT_ID}.svc.id.goog

# Get credentials
gcloud container clusters get-credentials my-cluster --zone=us-central1-a
```

## Node Pools

```bash
gcloud container node-pools create gpu-pool \
  --cluster=my-cluster \
  --zone=us-central1-a \
  --machine-type=n1-standard-4 \
  --accelerator=type=nvidia-tesla-k80,count=1 \
  --num-nodes=1
```

## Workload Identity

```bash
gcloud iam service-accounts add-iam-policy-binding \
  --role=roles/iam.workloadIdentityUser \
  --member="serviceAccount:${PROJECT_ID}.svc.id.goog[NAMESPACE/KSA_NAME]" \
  GSA_NAME@${PROJECT_ID}.iam.gserviceaccount.com
```

## Best Practices

- Use Workload Identity
- Enable VPC-native clusters
- Implement node auto-provisioning
- Use regional clusters for HA
>>>>>>> 4b9d09d6dab9a725d3e3c3e2f77c256484dc8d8b
