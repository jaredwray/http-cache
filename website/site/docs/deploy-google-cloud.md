---
title: "Deploy: Google Cloud"
navTitle: "Google Cloud"
description: "Set up http-cache behind a Google Cloud global external load balancer with a single anycast IP."
section: "Deployment"
order: 12
keywords:
  - google cloud
  - gcp
  - global load balancer
  - anycast
---

# Deploy on Google Cloud

Google Cloud's **Global External Application Load Balancer** gives you a *single
anycast IP* served from Google's edge worldwide, routing users to the nearest healthy
backend. That maps directly onto the `http-cache` [architecture](/docs/architecture).

## Why Google Cloud

- **One global anycast IP** — no per-region addresses to manage.
- **Closest-region routing** with automatic failover.
- **Managed instance groups / Cloud Run** for elastic, regional gateways.
- **Cloud CDN** can sit in front for an extra static tier when useful.

## Setup

1. **Deploy regional gateways** as either:
   - **Cloud Run** services (one per region), or
   - **Managed Instance Groups** running the container in two or more regions.

   ```bash
   gcloud run deploy http-cache \
     --image ghcr.io/jaredwray/http-cache:latest \
     --region us-central1 \
     --set-env-vars HTTP_CACHE_STORE=redis://10.0.0.3:6379
   ```

2. **Create backend services** and add each region's group/service as a backend.

3. **Add a health check** for `GET /health`; unhealthy backends are drained
   automatically.

4. **Create a Global External Application Load Balancer**, attach the backend services,
   and reserve a **global anycast IP**.

5. **Point your DNS** at that single global IP.

## Result

```
user ─▶ Google global anycast IP ─▶ nearest regional gateway ─▶ L1/L2 → keyv backend
```

Scale by adding a region's backend service to the load balancer — no clustering, no
rebalancing.
