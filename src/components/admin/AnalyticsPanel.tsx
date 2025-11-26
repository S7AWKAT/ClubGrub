import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  BarChart,
  Bar,
} from 'recharts';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Eye, FileText, Copy, Mail, Calendar } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type EventRow = {
  id: string;
  event: string;
  props: Record<string, any> | null;
  path: string | null;
  user_id: string | null;
  created_at: string;
};

const PRESETS = [7, 30, 90];

export function AnalyticsPanel() {
  const [loading, setLoading] = useState(true);
  const [rangeDays, setRangeDays] = useState<number>(7);
  const [events, setEvents] = useState<EventRow[]>([]);
  const [dailyCounts, setDailyCounts] = useState<any[]>([]);
  const [topPages, setTopPages] = useState<Array<{ path: string; total: number }>>([]);
  const [totals, setTotals] = useState<Record<string, { total: number; unique_users: number }>>({});
  const [uniqueByDay, setUniqueByDay] = useState<Array<{ period: string; unique_users: number }>>([]);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [sectionsList] = useState<string[]>(["hero","app-anatomy","how-it-works","outcomes","faq","contact","trusted","launch-playbook","hospitality","app"]);
  const [exporting, setExporting] = useState(false);
  const [showSubmissions, setShowSubmissions] = useState(false);
  const [submissions, setSubmissions] = useState<EventRow[]>([]);
  const [loadingSubs, setLoadingSubs] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSubmission, setModalSubmission] = useState<EventRow | null>(null);

  const end = useMemo(() => new Date(), []);
  const start = useMemo(() => {
    const s = new Date();
    s.setDate(s.getDate() - (rangeDays - 1));
    s.setHours(0, 0, 0, 0);
    return s;
  }, [rangeDays]);

  useEffect(() => {
    loadAggregates();
  }, [rangeDays]);

  // load per-section aggregates when selectedSection changes
  const [sectionDetails, setSectionDetails] = useState<any | null>(null);
  useEffect(() => {
    (async () => {
      if (!selectedSection) {
        setSectionDetails(null);
        return;
      }

      setLoading(true);
      try {
        const p_start = start.toISOString();
        const p_end = new Date().toISOString();
        const { data } = await (supabase as any).rpc('get_section_daily_aggregates', { p_start, p_end, p_section: selectedSection });
        // data is array of daily aggregates; compute totals and latest
        const rows = Array.isArray(data) ? data : [];
        const totals = rows.reduce((acc: any, r: any) => {
          acc.views = (acc.views || 0) + Number(r.views || 0);
          acc.clicks = (acc.clicks || 0) + Number(r.clicks || 0);
          acc.form_submits = (acc.form_submits || 0) + Number(r.form_submits || 0);
          acc.unique_users = (acc.unique_users || 0) + Number(r.unique_users || 0);
          return acc;
        }, {});

        // aggregate button labels and referrers across days
        const buttonsMap: Record<string, number> = {};
        const refsMap: Record<string, number> = {};
        for (const r of rows) {
          if (r.top_buttons) {
            for (const b of r.top_buttons) buttonsMap[b.label] = (buttonsMap[b.label] || 0) + Number(b.count || 0);
          }
          if (r.top_referrers) {
            for (const f of r.top_referrers) refsMap[f.ref] = (refsMap[f.ref] || 0) + Number(f.count || 0);
          }
        }

        setSectionDetails({ rows, totals, buttonsMap, refsMap });
      } catch (e) {
        console.error('failed to load section aggregates', e);
        setSectionDetails(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [selectedSection, rangeDays]);

  const loadAggregates = async () => {
    setLoading(true);
    const p_start = start.toISOString();
    const p_end = new Date().toISOString();

    try {
      // 1) call rpc get_event_counts to get daily counts by event
      const { data: countsData, error: countsErr } = await (supabase as any).rpc('get_event_counts', {
        p_period: 'day',
        p_start,
        p_end,
      });

      // 2) top pages
      const { data: topPagesData } = await (supabase as any).rpc('get_top_pages', { p_limit: 10, p_start, p_end });

      // 3) totals per event
      const { data: totalsData } = await (supabase as any).rpc('get_event_totals', { p_start, p_end });

      // 4) unique users per day
      const { data: uniquesData } = await (supabase as any).rpc('get_unique_users_by_period', { p_period: 'day', p_start, p_end });

      // normalize results (rpc returns any[] or null)
      const counts = Array.isArray(countsData) ? countsData : [];
      const tops = Array.isArray(topPagesData) ? topPagesData : [];
      const tot = Array.isArray(totalsData) ? totalsData : [];
      const uniques = Array.isArray(uniquesData) ? uniquesData : [];

      // Build a map date -> record
      const map: Record<string, any> = {};
      // initialize map for each day in range
      for (let d = new Date(start); d <= new Date(); d.setDate(d.getDate() + 1)) {
        const iso = new Date(d).toISOString().slice(0, 10);
        map[iso] = { date: iso, viewers: 0, clicks: 0, forms: 0, unique: 0 };
      }

      // categorize events
      const viewerEvents = new Set(['section_visible', 'time_on_page', 'step_visible', 'use_case_viewed', 'testimonial_viewed']);
      const clickEvents = new Set(['cta_clicked', 'button_clicked', 'link_clicked']);
      const formEvents = new Set(['contact_form_submitted', 'contact_form_started', 'form_submitted']);

      for (const row of counts) {
        // postgres returns period as string or object, normalize
        const period = (row as any).period ? new Date((row as any).period).toISOString().slice(0, 10) : null;
        if (!period) continue;

        const eventName = (row as any).event ?? 'unknown';
        const total = Number((row as any).total ?? 0);

        if (!map[period]) map[period] = { date: period, viewers: 0, clicks: 0, forms: 0, unique: 0 };

        if (viewerEvents.has(eventName)) map[period].viewers += total;
        if (clickEvents.has(eventName)) map[period].clicks += total;
        if (formEvents.has(eventName)) map[period].forms += total;
      }

      for (const u of uniques) {
        const period = u.period ? new Date(u.period).toISOString().slice(0, 10) : null;
        if (!period) continue;
        if (!map[period]) map[period] = { date: period, viewers: 0, clicks: 0, forms: 0, unique: 0 };
        map[period].unique = Number(u.unique_users ?? 0);
      }

      const daily = Object.values(map).sort((a: any, b: any) => a.date.localeCompare(b.date));

      const totalsMap: Record<string, { total: number; unique_users: number }> = {};
      for (const t of tot) {
        totalsMap[(t as any).event] = { total: Number((t as any).total ?? 0), unique_users: Number((t as any).unique_users ?? 0) };
      }

      setDailyCounts(daily);
      setTopPages(tops as any[]);
      setTotals(totalsMap);
      setUniqueByDay(uniques.map((u: any) => ({ period: new Date(u.period).toISOString().slice(0, 10), unique_users: Number(u.unique_users ?? 0) })));

      // fallback: also fetch recent raw events for detail table (limited)
      const { data: rawEvents } = await (supabase as any)
        .from('analytics_events')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(200);

      setEvents(rawEvents ?? []);
    } catch (err) {
      console.error('Failed to load analytics aggregates', err);
      // fallback to fetching raw events only
      const { data: rawEvents } = await (supabase as any)
        .from('analytics_events')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(500);
      setEvents(rawEvents ?? []);
    } finally {
      setLoading(false);
    }
  };
  const loadSubmissions = async () => {
    setLoadingSubs(true);
    try {
      const { data } = await (supabase as any)
        .from('analytics_events')
        .select('*')
        .eq('event', 'form_submission')
        .order('created_at', { ascending: false })
        .limit(500);

      setSubmissions(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error('failed to load submissions', e);
      setSubmissions([]);
    } finally {
      setLoadingSubs(false);
    }
  };

  const exportSubmissionsCSV = () => {
    try {
      const rows = submissions;
      const csvHeader = ['#','time','firstName','lastName','email','clubName','role','phone','message','raw_props'];
      const csvRows = rows.map((r, idx) => {
        const p = r.props ?? {};
        return [idx + 1, new Date(r.created_at).toISOString(), p.firstName ?? '', p.lastName ?? '', p.email ?? '', p.clubName ?? '', p.role ?? '', p.phone ?? '', (p.message ?? '').replace(/\n/g, ' '), JSON.stringify(p)];
      });
      const csv = [csvHeader.join(','), ...csvRows.map(r => r.map(cell => '"'+String(cell).replace(/"/g,'""')+'"').join(','))].join('\n');

      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `form_submissions_${new Date().toISOString().slice(0,10)}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('export submissions failed', e);
    }
  };

  // compute per-section metrics from loaded `events`
  const sectionMetrics = useMemo(() => {
    if (!events || events.length === 0) return {} as Record<string, any>;
    const map: Record<string, any> = {};
    for (const s of sectionsList) map[s] = { views: 0, avgDuration: 0, durations: [], buttons: {}, referrals: {}, uniqueUsersSet: new Set<string>(), uniqueUsers: 0 };

    // also track unattributed cta labels (for debugging missing section props)
    const unattributedCtas: Record<string, number> = {};

    for (const ev of events) {
      try {
        const p = ev.props ?? {};
        const section = (p.section as string) || (p.path as string) || ev.path || null;

        // normalize section id: if path like '/#faq' or '/#contact', try to extract
        let sectionKey = null;
        if (section) {
          if (typeof section === 'string') {
            // try exact match
            if (sectionsList.includes(section)) sectionKey = section;
            else {
              // try last segment
              const clean = section.replace(/^\//, '').split(/[?#]/)[0];
              if (sectionsList.includes(clean)) sectionKey = clean;
            }
          }
        }

        // fallback: if event is 'section_visible' with props.section
        if (!sectionKey && ev.event === 'section_visible' && ev.props?.section && sectionsList.includes(ev.props.section)) sectionKey = ev.props.section;

        if (!sectionKey) continue;

        const entry = map[sectionKey];
        if (!entry) continue;

        if (ev.event === 'section_visible') entry.views += 1;
        if (ev.event === 'section_engagement') {
          const secs = Number(ev.props?.timeSpentSeconds ?? ev.props?.seconds ?? (ev.props?.timeSpentMs ? Number(ev.props.timeSpentMs)/1000 : 0)) || 0;
          entry.durations.push(secs);
        }

        // track unique users when available
        if (ev.user_id) entry.uniqueUsersSet.add(ev.user_id);

        if (ev.event === 'cta_clicked' || ev.event === 'button_clicked' || ev.event === 'link_clicked') {
          const label = ev.props?.label ?? ev.props?.href ?? 'unknown';
          entry.buttons[label] = (entry.buttons[label] || 0) + 1;
        }

        // referrals
        const ref = ev.props?.referrer ?? ev.props?.utm_source ?? ev.props?.source ?? null;
        if (ref) entry.referrals[ref] = (entry.referrals[ref] || 0) + 1;
      } catch (e) {
        // ignore malformed event
      }
    }

    // compute avg durations
    for (const k of Object.keys(map)) {
      const d = map[k].durations;
      map[k].avgDuration = d.length ? Math.round(d.reduce((a:any,b:any)=>a+b,0)/d.length) : 0;
      // median
      map[k].medianDuration = 0;
      if (d.length) {
        const sorted = d.slice().sort((a:any,b:any)=>a-b);
        const mid = Math.floor(sorted.length/2);
        map[k].medianDuration = sorted.length % 2 === 1 ? sorted[mid] : Math.round((sorted[mid-1] + sorted[mid]) / 2);
      }
      map[k].uniqueUsers = map[k].uniqueUsersSet ? map[k].uniqueUsersSet.size : 0;
    }

    // collect unattributed CTAs across all events
    for (const ev of events) {
      if ((ev.event === 'cta_clicked' || ev.event === 'button_clicked') && !(ev.props?.section)) {
        const label = ev.props?.label ?? 'unknown';
        unattributedCtas[label] = (unattributedCtas[label] || 0) + 1;
      }
    }

    // attach unattributed summary
    map.__unattributed = { ctas: unattributedCtas, total: Object.values(unattributedCtas).reduce((a,b)=>a+b,0) };

    return map;
  }, [events, sectionsList]);

  const unattributedClicks = useMemo(() => {
    return (sectionMetrics.__unattributed?.total) || 0;
  }, [sectionMetrics]);

  const exportSectionCSV = async (sectionId: string | null) => {
    setExporting(true);
    try {
      const rows = events.filter(ev => {
        const p = ev.props ?? {};
        return (p.section === sectionId) || (ev.path && ev.path.includes(sectionId ?? '')) || ev.event === 'section_visible' && p.section === sectionId;
      });

      const csvHeader = ['time','event','path','user_id','props'];
      const csvRows = rows.map(r => [new Date(r.created_at).toISOString(), r.event, r.path ?? '', r.user_id ?? '', JSON.stringify(r.props ?? {})]);
      const csv = [csvHeader.join(','), ...csvRows.map(r => r.map(cell => '"'+String(cell).replace(/"/g,'""')+'"').join(','))].join('\n');

      // download in browser
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `analytics_${sectionId ?? 'all'}_${new Date().toISOString().slice(0,10)}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('export failed', e);
    } finally {
      setExporting(false);
    }
  };

  const totalEvents = Object.values(totals).reduce((s, v) => s + (v?.total ?? 0), 0);
  const totalForms = (totals['contact_form_submitted']?.total ?? 0) + (totals['form_submitted']?.total ?? 0);
  const totalClicks = (totals['cta_clicked']?.total ?? 0) + (totals['button_clicked']?.total ?? 0) + (totals['link_clicked']?.total ?? 0);
  const uniqueVisitors = uniqueByDay.reduce((s, d) => s + d.unique_users, 0);


  // compute avg time by fetching recent time events (client-side) as a fallback
  const [avgTimeSeconds, setAvgTimeSeconds] = useState<number>(0);
  useEffect(() => {
    (async () => {
      try {
        const { data: timeRows } = await (supabase as any)
          .from('analytics_events')
          .select('props')
          .in('event', ['time_on_page', 'section_engagement'])
          .gte('created_at', start.toISOString())
          .lte('created_at', new Date().toISOString())
          .limit(1000);

        if (timeRows && Array.isArray(timeRows) && timeRows.length > 0) {
          const secs = timeRows.map((r: any) => {
            const p = r.props ?? {};
            const s = Number(p.seconds ?? p.timeSpentSeconds ?? (p.timeSpentMs ? Number(p.timeSpentMs) / 1000 : 0));
            return isNaN(s) ? 0 : s;
          });
          const avg = Math.round(secs.reduce((a: number, b: number) => a + b, 0) / secs.length);
          setAvgTimeSeconds(avg);
        } else {
          setAvgTimeSeconds(0);
        }
      } catch (e) {
        setAvgTimeSeconds(0);
      }
    })();
  }, [rangeDays]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {PRESETS.map(p => (
            <button
              key={p}
              onClick={() => setRangeDays(p)}
              className={`px-3 py-1 rounded ${rangeDays === p ? 'bg-club-gold text-black' : 'bg-card'}`}>
              Last {p}d
            </button>
          ))}
        </div>
        <div className="text-sm text-muted-foreground">Range: {start.toLocaleDateString()} — {new Date().toLocaleDateString()}</div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          {sectionsList.map(s => (
            <button key={s} onClick={() => setSelectedSection(selectedSection === s ? null : s)} className={`px-3 py-1 rounded ${selectedSection === s ? 'bg-club-gold text-black' : 'bg-card'}`}>
              {s}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
            <button onClick={() => exportSectionCSV(selectedSection)} disabled={exporting} className="px-3 py-1 rounded bg-card">
              {exporting ? 'Exporting...' : `Export ${selectedSection ?? 'All'}`}
            </button>
            <button onClick={async () => {
              setShowSubmissions(s => !s);
              if (!showSubmissions) await loadSubmissions();
            }} className="px-3 py-1 rounded bg-card">{showSubmissions ? 'Hide Submissions' : 'View Submissions'}</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 border rounded-lg bg-card">
          <div className="text-sm text-muted-foreground">Total Events</div>
          <div className="text-2xl font-semibold">{totalEvents}</div>
        </div>

        <div className="p-4 border rounded-lg bg-card">
          <div className="text-sm text-muted-foreground">Unique Visitors (sum days)</div>
          <div className="text-2xl font-semibold">{uniqueVisitors}</div>
        </div>

        <div className="p-4 border rounded-lg bg-card">
          <div className="text-sm text-muted-foreground">Clicks</div>
          <div className="text-2xl font-semibold">{totalClicks}</div>
        </div>

        <div className="p-4 border rounded-lg bg-card">
          <div className="text-sm text-muted-foreground">Form Submits</div>
          <div className="text-2xl font-semibold">{totalForms}</div>
        </div>
        <div className="p-4 border rounded-lg bg-card">
          <div className="text-sm text-muted-foreground">Unattributed Clicks</div>
          <div className="text-2xl font-semibold">{unattributedClicks}</div>
        </div>
      </div>

      {/* Submissions Panel */}
      {showSubmissions && (
        <div className="mt-6 p-4 border rounded-lg bg-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Form Submissions</h3>
            <div className="flex gap-2">
              <button onClick={loadSubmissions} className="px-3 py-1 rounded bg-card">Refresh</button>
              <button onClick={() => exportSubmissionsCSV()} className="px-3 py-1 rounded bg-card">Export CSV</button>
            </div>
          </div>

          <div className="max-h-72 overflow-auto text-sm">
            {loadingSubs ? (
              <div>Loading submissions...</div>
            ) : submissions.length === 0 ? (
              <div>No submissions yet.</div>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th className="pb-2">#</th>
                    <th className="pb-2">Time</th>
                    <th className="pb-2">Name</th>
                    <th className="pb-2">Email</th>
                    <th className="pb-2">Club</th>
                    <th className="pb-2">Message</th>
                    <th className="pb-2">View</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((s, idx) => {
                    const p = s.props ?? {};
                    return (
                      <tr key={s.id} className="border-t align-top">
                        <td className="py-2 text-xs">{idx + 1}</td>
                        <td className="py-2 text-xs">{new Date(s.created_at).toLocaleString()}</td>
                        <td className="py-2">{(p.firstName ? p.firstName + ' ' + (p.lastName ?? '') : '-')}</td>
                        <td className="py-2">{p.email ?? '-'}</td>
                        <td className="py-2">{p.clubName ?? '-'}</td>
                        <td className="py-2 truncate max-w-md">{p.message ?? '-'}</td>
                        <td className="py-2"><button onClick={() => { setModalSubmission(s); setModalOpen(true); }} className="p-1 rounded hover:bg-card"><Eye className="w-4 h-4" /></button></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}


      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Submission Details</DialogTitle>
            <DialogDescription>Full submission payload and metadata</DialogDescription>
          </DialogHeader>

          <Card className="mt-4 p-4">
            {modalSubmission ? (
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Submitted</div>
                    <div className="text-base font-semibold">{new Date(modalSubmission.created_at).toLocaleString()}</div>
                    <div className="mt-2 flex items-center gap-3 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <div className="text-muted-foreground">{modalSubmission.props?.email ?? '-'}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="ghost" onClick={() => {
                      try { navigator.clipboard.writeText(JSON.stringify(modalSubmission.props ?? {})); } catch (e) {}
                    }} className="flex items-center gap-2">
                      <Copy className="w-4 h-4" /> Copy JSON
                    </Button>
                    <Button variant="ghost" onClick={() => { setModalOpen(false); }} className="flex items-center gap-2">
                      Close
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Name</div>
                    <div className="font-medium">{(modalSubmission.props?.firstName ?? '') + ' ' + (modalSubmission.props?.lastName ?? '')}</div>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground">Club</div>
                    <div className="font-medium">{modalSubmission.props?.clubName ?? '-'}</div>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground">Role</div>
                    <div className="font-medium">{modalSubmission.props?.role ?? '-'}</div>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground">Phone</div>
                    <div className="font-medium">{modalSubmission.props?.phone ?? '-'}</div>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-muted-foreground">Message</div>
                  <div className="mt-1 whitespace-pre-wrap bg-surface p-3 rounded text-sm">{modalSubmission.props?.message ?? '-'}</div>
                </div>

                <div className="text-xs text-muted-foreground">Full payload</div>
                <pre className="whitespace-pre-wrap text-xs max-h-56 overflow-auto bg-muted p-3 rounded">{JSON.stringify({ id: modalSubmission.id, created_at: modalSubmission.created_at, props: modalSubmission.props }, null, 2)}</pre>
              </div>
            ) : (
              <div>No submission selected.</div>
            )}
          </Card>
        </DialogContent>
      </Dialog>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border rounded-lg bg-card h-96">
          <div className="text-sm text-muted-foreground mb-2">Viewers / Clicks (by day)</div>
          <ResponsiveContainer width="100%" height="85%">
            <LineChart data={dailyCounts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="viewers" stroke="#8884d8" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="clicks" stroke="#82ca9d" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="p-4 border rounded-lg bg-card h-96">
          <div className="text-sm text-muted-foreground mb-2">Forms & Unique Visitors (by day)</div>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={dailyCounts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="forms" fill="#ffc658" />
              <Line type="monotone" dataKey="unique" stroke="#8884d8" strokeWidth={2} dot={false} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border rounded-lg bg-card">
          <div className="text-sm text-muted-foreground mb-2">Top Pages</div>
          <ol className="list-decimal list-inside space-y-1 max-h-64 overflow-auto">
            {topPages.length === 0 ? <li>No pages yet</li> : topPages.map((p: any) => (
              <li key={p.path} className="flex justify-between">
                <span className="truncate">{p.path}</span>
                <span className="ml-2 text-sm text-muted-foreground">{p.total}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="p-4 border rounded-lg bg-card">
          <div className="text-sm text-muted-foreground mb-2">Recent Events</div>
          <div className="max-h-64 overflow-auto text-sm">
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="pb-2">Time</th>
                  <th className="pb-2">Event</th>
                  <th className="pb-2">Path</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={3}>Loading...</td></tr>
                ) : events.length === 0 ? (
                  <tr><td colSpan={3}>No events yet.</td></tr>
                ) : (
                  events.map(ev => (
                    <tr key={ev.id} className="border-t">
                      <td className="py-2 align-top text-xs">{new Date(ev.created_at).toLocaleString()}</td>
                      <td className="py-2 align-top">{ev.event}</td>
                      <td className="py-2 align-top truncate">{ev.props?.path ?? ev.path ?? '-'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Section details panel */}
      {selectedSection && sectionDetails && (
        <div className="mt-6 p-4 border rounded-lg bg-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Section: {selectedSection}</h3>
              <div className="text-sm text-muted-foreground">Range: {start.toLocaleDateString()} — {new Date().toLocaleDateString()}</div>
            </div>
            <div className="flex gap-4">
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Views</div>
                <div className="text-2xl font-semibold">{sectionDetails.totals.views ?? 0}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Avg Time (s)</div>
                <div className="text-2xl font-semibold">{Math.round((sectionDetails.rows.reduce((a:any,b:any)=>a+(b.avg_time_seconds||0),0) / (sectionDetails.rows.length||1))||0)}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Clicks</div>
                <div className="text-2xl font-semibold">{sectionDetails.totals.clicks ?? 0}</div>
              </div>
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Form Submits</div>
                <div className="text-2xl font-semibold">{sectionDetails.totals.form_submits ?? 0}</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
                <div className="text-sm text-muted-foreground mb-2">Top Buttons</div>
                <ol className="list-decimal list-inside space-y-1 max-h-40 overflow-auto">
                  {Object.entries(sectionDetails.buttonsMap).length === 0 ? (
                    // fallback: show unattributed CTAs that may belong here
                    (() => {
                      const un = sectionMetrics.__unattributed?.ctas ?? {};
                      const items = Object.entries(un).sort((a:any,b:any)=>b[1]-a[1]);
                      if (items.length === 0) return <li>No button events</li>;
                      return items.map(([label,count]) => (
                        <li key={label} className="flex justify-between">
                          <span className="truncate">{label} <span className="text-xs text-muted-foreground">(untagged)</span></span>
                          <span className="ml-2 text-sm text-muted-foreground">{String(count)}</span>
                        </li>
                      ));
                    })()
                  ) : Object.entries(sectionDetails.buttonsMap).sort((a:any,b:any)=>b[1]-a[1]).map(([label,count]) => (
                    <li key={label} className="flex justify-between">
                      <span className="truncate">{label}</span>
                      <span className="ml-2 text-sm text-muted-foreground">{String(count)}</span>
                    </li>
                  ))}
                </ol>
            </div>

            <div>
              <div className="text-sm text-muted-foreground mb-2">Top Referrers</div>
              <ol className="list-decimal list-inside space-y-1 max-h-40 overflow-auto">
                {Object.entries(sectionDetails.refsMap).length === 0 ? <li>No referrals</li> : Object.entries(sectionDetails.refsMap).sort((a:any,b:any)=>b[1]-a[1]).map(([ref,count]) => (
                  <li key={ref} className="flex justify-between">
                    <span className="truncate">{ref}</span>
                    <span className="ml-2 text-sm text-muted-foreground">{String(count)}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <div className="text-sm text-muted-foreground mb-2">Daily Breakdown</div>
              <div className="text-sm max-h-40 overflow-auto">
                {sectionDetails.rows.length === 0 ? <div>No daily data</div> : sectionDetails.rows.map((r:any) => (
                  <div key={r.day} className="flex justify-between border-b py-1">
                    <div className="truncate">{new Date(r.day).toLocaleDateString()}</div>
                    <div className="ml-2 text-sm text-muted-foreground">views: {r.views}, clicks: {r.clicks}, avg: {Math.round(r.avg_time_seconds||0)}s</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="text-sm text-muted-foreground">Avg Time on Page (approx): {avgTimeSeconds} s</div>

    </div>
  );
}

export default AnalyticsPanel;
