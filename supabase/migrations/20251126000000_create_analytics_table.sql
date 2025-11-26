-- Create analytics events table for storing client-side events
create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  event text not null,
  props jsonb,
  path text,
  user_id uuid,
  created_at timestamptz default now()
);

create index if not exists analytics_events_event_idx on public.analytics_events (event);
create index if not exists analytics_events_created_at_idx on public.analytics_events (created_at desc);
