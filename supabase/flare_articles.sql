-- Run this in your StopTheFlare Supabase project: SQL Editor -> New query -> paste -> Run.
-- Creates the table that the daily article cron writes to and the /latest pages read from.

create table if not exists public.flare_articles (
  id              uuid primary key default gen_random_uuid(),
  slug            text unique not null,
  title           text not null,
  seo_description text,
  excerpt         text,
  category        text,
  condition_slug  text,
  read_time       text,
  body            jsonb not null default '[]'::jsonb,   -- array of strings ("## "/"### "/paragraph)
  faqs            jsonb not null default '[]'::jsonb,   -- array of { q, a }
  tags            jsonb not null default '[]'::jsonb,   -- array of strings
  published_at    timestamptz not null default now(),
  created_at      timestamptz not null default now()
);

create index if not exists flare_articles_published_at_idx
  on public.flare_articles (published_at desc);

-- The app connects with the service-role key (server-only), which bypasses RLS.
-- Enable RLS so the public anon key cannot read/write directly.
alter table public.flare_articles enable row level security;
