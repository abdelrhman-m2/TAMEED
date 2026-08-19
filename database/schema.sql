-- TAAMED ERP — PostgreSQL schema
-- Run: psql $DATABASE_URL -f database/schema.sql

CREATE TABLE IF NOT EXISTS leads (
  id            BIGSERIAL PRIMARY KEY,
  name          VARCHAR(100) NOT NULL,
  phone         VARCHAR(20)  NOT NULL,
  business_type VARCHAR(80)  NOT NULL,
  message       TEXT         NOT NULL,
  source        VARCHAR(30)  NOT NULL DEFAULT 'contact_form',
  notes         TEXT,
  created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);
ALTER TABLE leads ADD COLUMN IF NOT EXISTS source VARCHAR(30) NOT NULL DEFAULT 'contact_form';
ALTER TABLE leads ADD COLUMN IF NOT EXISTS notes TEXT;
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);

CREATE TABLE IF NOT EXISTS demo_requests (
  id         BIGSERIAL PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  phone      VARCHAR(20)  NOT NULL,
  company    VARCHAR(120) NOT NULL,
  created_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS quote_requests (
  id            BIGSERIAL PRIMARY KEY,
  name          VARCHAR(100) NOT NULL,
  phone         VARCHAR(20)  NOT NULL,
  users         INTEGER      NOT NULL,
  business_type VARCHAR(80)  NOT NULL,
  modules       TEXT[]       NOT NULL DEFAULT '{}',
  estimate      NUMERIC(12,2) NOT NULL,
  created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Optional: backoffice users
CREATE TABLE IF NOT EXISTS users (
  id            BIGSERIAL PRIMARY KEY,
  email         VARCHAR(180) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role          VARCHAR(30) NOT NULL DEFAULT 'admin',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Clients table for contact form submissions
CREATE TABLE IF NOT EXISTS clients (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  phone         TEXT NOT NULL,
  business_type TEXT NOT NULL,
  message       TEXT NOT NULL
);

