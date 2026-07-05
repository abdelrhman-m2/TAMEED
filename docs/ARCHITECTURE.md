# TAAMED ERP — System Architecture

## Overview
- **frontend/** — Vite + React + TypeScript + Tailwind. Marketing site, pricing calculator, and live ERP simulation. Bilingual Arabic (RTL) / English.
- **backend/** — Node.js (Express). REST API for lead capture, demo bookings, quote requests, and stats.
- **database/** — PostgreSQL schema and seed data.

## Data flow

```
User -> Frontend (React) -> REST API (Express) -> PostgreSQL
                                |
                                +--> /stats aggregations
```

## Forms behavior in production
The frontend reads `VITE_API_URL`. When unset (e.g. in a static preview),
it falls back to local persistence so demos keep working.

## Deployment

- **Frontend:** any static host (Vercel, Netlify, S3+CloudFront).
- **Backend:** any Node host (Render, Railway, Fly.io, AWS ECS).
- **Database:** managed PostgreSQL (Neon, Supabase, RDS).
