// Supabase Edge Function (Deno) to ingest analytics events server-side.
// Deploy this with `supabase functions deploy ingest-analytics` and set
// the environment variable `SUPABASE_SERVICE_ROLE_KEY` for DB writes.

import { serve } from 'https://deno.land/std@0.203.0/http/server.ts';
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || ''; // supabase project url
const SERVICE_ROLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE, { auth: { persistSession: false } });

serve(async (req) => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });

  try {
    const body = await req.json();
    const { event, props, path, user_id, timestamp } = body;

    // Basic validation
    if (!event) return new Response('Missing event', { status: 400 });

    const payload: any = {
      event,
      props: props ?? null,
      path: path ?? null,
      user_id: user_id ?? null,
      created_at: timestamp ? new Date(timestamp).toISOString() : undefined,
    };

    // Insert into analytics_events table
    const { error } = await supabase.from('analytics_events').insert([payload]);

    if (error) {
      console.error('analytics_events insert error', error);
      // continue: attempt to process form_submissions fallback below
    }

    // If this is a form submission event, also persist into form_submissions table
    try {
      if (event === 'form_submission') {
        const p = props ?? {};
        const first_name = p.firstName || p.first_name || null;
        const last_name = p.lastName || p.last_name || null;
        const email = p.email || null;
        const club_name = p.clubName || p.club_name || null;
        const roleVal = p.role || null;
        const phone = p.phone || null;
        const message = p.message || null;

        const ip = req.headers.get('x-forwarded-for') || req.headers.get('cf-connecting-ip') || req.headers.get('x-real-ip') || null;
        const user_agent = req.headers.get('user-agent') || null;

        const { error: subErr } = await supabase.from('form_submissions').insert([{
          first_name,
          last_name,
          email,
          club_name,
          role: roleVal,
          phone,
          message,
          ip,
          user_agent,
          raw_props: p ?? null
        }]);

        if (subErr) console.error('form_submissions insert error', subErr);
      }
    } catch (e) {
      console.error('form_submissions processing error', e);
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error('ingest error', err);
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
  }
});
