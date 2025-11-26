-- Create form_submissions table to store contact form data separately
create table if not exists public.form_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  first_name text,
  last_name text,
  email text,
  club_name text,
  role text,
  phone text,
  message text,
  ip text,
  user_agent text,
  raw_props jsonb
);

create index if not exists form_submissions_created_at_idx on public.form_submissions (created_at desc);
create index if not exists form_submissions_email_idx on public.form_submissions (email);
