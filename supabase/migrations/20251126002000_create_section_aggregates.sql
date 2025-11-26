-- Create a daily aggregates table for section-level analytics
create table if not exists public.analytics_section_daily (
  id uuid primary key default gen_random_uuid(),
  section text not null,
  day date not null,
  views bigint default 0,
  avg_time_seconds double precision default 0,
  clicks bigint default 0,
  form_submits bigint default 0,
  unique_users bigint default 0,
  top_buttons jsonb,
  top_referrers jsonb,
  created_at timestamptz default now()
);

create unique index if not exists analytics_section_daily_section_day_idx on public.analytics_section_daily(section, day);

-- RPC: compute section daily aggregates for a date range and optionally a section
create or replace function public.get_section_daily_aggregates(p_start timestamptz, p_end timestamptz, p_section text default null)
returns table(section text, day date, views bigint, avg_time_seconds double precision, clicks bigint, form_submits bigint, unique_users bigint, top_buttons jsonb, top_referrers jsonb) as $$
  with filtered as (
    select *, coalesce((props->> 'section')::text, path, '/') as section_key, (created_at::date) as day
    from public.analytics_events
    where created_at >= p_start and created_at <= p_end
      and (p_section is null or coalesce((props->> 'section')::text, path, '/') = p_section)
  ),
  button_counts as (
    select section_key, day, (props->> 'label') as label, count(*) as cnt
    from filtered
    where event in ('cta_clicked','button_clicked','link_clicked')
    group by 1,2,3
  ),
  ref_counts as (
    select section_key, day, coalesce(props->> 'referrer', props->> 'utm_source', props->> 'source') as ref, count(*) as cnt
    from filtered
    group by 1,2,3
  ),
  agg as (
    select
      section_key as section,
      day,
      sum(case when event = 'section_visible' then 1 else 0 end) as views,
      avg(case when event in ('section_engagement','time_on_page') then coalesce((props->> 'timeSpentSeconds')::double precision, (props->> 'seconds')::double precision, (props->> 'timeSpentMs')::double precision / 1000) else null end) as avg_time_seconds,
      sum(case when event in ('cta_clicked','button_clicked','link_clicked') then 1 else 0 end) as clicks,
      sum(case when event in ('contact_form_submitted','form_submitted') then 1 else 0 end) as form_submits,
      count(distinct user_id) as unique_users
    from filtered
    group by section_key, day
  )
  select
    a.section,
    a.day,
    a.views,
    coalesce(a.avg_time_seconds,0) as avg_time_seconds,
    a.clicks,
    a.form_submits,
    a.unique_users,
    (select jsonb_agg(jsonb_build_object('label', label, 'count', cnt) order by cnt desc) from button_counts b where b.section_key = a.section and b.day = a.day) as top_buttons,
    (select jsonb_agg(jsonb_build_object('ref', ref, 'count', cnt) order by cnt desc) from ref_counts r where r.section_key = a.section and r.day = a.day) as top_referrers
  from agg a
  order by a.day asc;
$$ language sql stable;
