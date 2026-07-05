# TAAMED Backend (Node.js + Express + PostgreSQL)

REST API for the TAAMED ERP marketing site. Stores leads, demo bookings and quote requests in PostgreSQL.

## Quick start

```bash
cd backend
cp .env.example .env       # set DATABASE_URL
npm install

# Create the database (PostgreSQL must be running)
createdb taamed

# Apply schema and (optionally) seed
npm run db:migrate
npm run db:seed

# Run the API
npm run dev      # http://localhost:4000
```

## Endpoints

| Method | Path       | Body                                                            | Description            |
|--------|------------|-----------------------------------------------------------------|------------------------|
| POST   | /contact   | `{ name, phone, business_type, message }`                       | Save a contact lead    |
| POST   | /demo      | `{ name, phone, company }`                                      | Save a demo booking    |
| POST   | /quote     | `{ name, phone, users, business_type, modules[], estimate }`    | Save a quote request   |
| GET    | /stats     | —                                                               | Aggregated counters    |
| GET    | /health    | —                                                               | Health check           |

## Connect from the frontend

Set in `frontend/.env`:

```
VITE_API_URL=http://localhost:4000
```
