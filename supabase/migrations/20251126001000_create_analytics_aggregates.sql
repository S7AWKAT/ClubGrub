-- Aggregation helper functions for analytics

-- 1) get_event_counts(period text, p_start timestamptz, p_end timestamptz)
--    returns rows: period (date_trunc), event, total, unique_users
create or replace function public.get_event_counts(
  p_period text,
  p_start timestamptz,
  p_end timestamptz
) returns table(period timestamptz, event text, total bigint, unique_users bigint) as $$
  select
    date_trunc(p_period, created_at) as period,
    event,
    count(*)::bigint as total,
    count(distinct user_id)::bigint as unique_users
  from public.analytics_events
  where created_at >= p_start and created_at <= p_end
  group by 1,2
  order by 1 asc;
$$ language sql stable;

-- 2) get_top_pages(p_limit int, p_start timestamptz, p_end timestamptz)
--    returns rows: path, total
create or replace function public.get_top_pages(
  p_limit int,
  p_start timestamptz,
  p_end timestamptz
) returns table(path text, total bigint) as $$
  select
    coalesce((props->> 'path')::text, path, '/') as path,
    count(*)::bigint as total
  from public.analytics_events
  where created_at >= p_start and created_at <= p_end
  group by 1
  order by 2 desc
  limit p_limit;
$$ language sql stable;

-- 3) get_unique_users_by_period(p_period text, p_start timestamptz, p_end timestamptz)
--    returns rows: period, unique_users
create or replace function public.get_unique_users_by_period(
  p_period text,
  p_start timestamptz,
  p_end timestamptz
) returns table(period timestamptz, unique_users bigint) as $$
  select
    date_trunc(p_period, created_at) as period,
    count(distinct user_id)::bigint as unique_users
  from public.analytics_events
  where created_at >= p_start and created_at <= p_end
  group by 1
  order by 1 asc;
$$ language sql stable;

-- 4) get_event_totals(p_start timestamptz, p_end timestamptz)
--    returns rows: event, total, unique_users
create or replace function public.get_event_totals(
  p_start timestamptz,
  p_end timestamptz
) returns table(event text, total bigint, unique_users bigint) as $$
  select
    event,
    count(*)::bigint as total,
    count(distinct user_id)::bigint as unique_users
  from public.analytics_events
  where created_at >= p_start and created_at <= p_end
  group by 1
  order by 2 desc;
$$ language sql stable;
