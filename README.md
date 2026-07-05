# TAAMED — Enterprise ERP Platform

A modern, bilingual (Arabic / English) marketing site for **TAAMED ERP** with an interactive
live-simulation dashboard, pricing calculator, lead capture, and a separate Node/Express + PostgreSQL backend.

```
erp-website/
├── frontend/        # React + Vite + Tailwind (this repo)
├── backend/         # Node.js + Express REST API
├── database/        # PostgreSQL schema + seed
├── public/          # Static assets
├── docs/            # Architecture notes
└── README.md
```

> Note: the actual frontend source lives under `src/` (Vite project root).
> The `frontend/` reference above is conceptual — this whole repository
> *is* the frontend, with the backend and database scaffolds inside
> their own folders.

## Frontend

```bash
npm install
npm run dev          # http://localhost:5173
```

Optional: connect to the backend by creating `.env`:

```
VITE_API_URL=http://localhost:4000
```

## Backend

See [`backend/README.md`](backend/README.md).

```bash
cd backend
cp .env.example .env
npm install
npm run db:migrate
npm run dev          # http://localhost:4000
```

## Database

Schema and seed in [`database/`](database/). Compatible with PostgreSQL 13+.

## Architecture

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## Pages

- `/`            — Home (hero, pains, solutions, POS, tech, stats, testimonials, CTA)
- `/about`       — Vision, mission, values
- `/systems`     — All ERP modules
- `/industries`  — Verticals (supermarket, restaurants, pharmacy, retail, …)
- `/clients`     — Trust + testimonials
- `/pricing`     — Interactive pricing calculator
- `/simulation`  — Live POS + inventory + reports dashboard
- `/contact`     — Lead capture form (POST /contact)

## Stack

| Layer    | Tech                                         |
|----------|----------------------------------------------|
| Frontend | React 18, Vite, TypeScript, Tailwind, shadcn |
| Backend  | Node.js 18+, Express, Zod, Helmet, CORS      |
| Database | PostgreSQL                                   |
| Charts   | Recharts                                     |
| i18n     | Custom lightweight provider (RTL-aware)      |

© TAAMED. All rights reserved.
