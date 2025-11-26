// Helper to safely call Smartlook tracking and persist to Supabase
import { supabase } from "@/integrations/supabase/client";

async function postToIngest(event: string, props?: Record<string, any>) {
  try {
    const ingestUrl = (import.meta as any).env?.VITE_ANALYTICS_INGEST_URL;
    if (!ingestUrl) return false;

    const payload = {
      event,
      props: props ?? null,
      path: typeof window !== 'undefined' ? window.location.pathname + window.location.search : null,
      timestamp: new Date().toISOString(),
    };

    const res = await fetch(ingestUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      credentials: 'omit'
    });

    // Only consider it successful if the endpoint returned a 2xx
    return res.ok;
  } catch (e) {
    return false;
  }
}

export function track(event: string, props?: Record<string, any>) {
  try {
    const sl = (window as any).smartlook;
    if (sl) {
      // Use both track and tag for maximum compatibility
      try {
        sl('track', event, props);
      } catch (e) {
        // ignore
      }
      try {
        sl('tag', event, props);
      } catch (e) {
        // ignore
      }
    }
  } catch (err) {
    // Silently fail if Smartlook isn't available
  }

  // Persist a copy of the event to the ingestion endpoint if configured (preferred),
  // otherwise attempt a direct Supabase insert (best-effort, non-blocking).
  try {
    (async () => {
      try {
        const posted = await postToIngest(event, props);
        if (posted) return;

        // fallback to client-side insert (may be blocked by RLS/policies)
        let userId: string | null = null;
        try {
          const sessionRes = await supabase.auth.getSession();
          userId = (sessionRes as any)?.data?.session?.user?.id ?? null;
        } catch (e) {
          // ignore
        }

        await supabase.from('analytics_events').insert([{ 
          event,
          props: props ?? null,
          path: (typeof window !== 'undefined' && window.location) ? window.location.pathname : null,
          user_id: userId
        }]);
      } catch (e) {
        // swallow errors; analytics should not break app
      }
    })();
  } catch (e) {
    // swallow
  }
}

// Common events
export const analytics = {
  // FAQ interactions
  faqItemOpened: (question: string) => track('faq_item_opened', { question }),
  faqItemClosed: (question: string) => track('faq_item_closed', { question }),
  
  // Contact form
  contactFormStarted: () => track('contact_form_started'),
  contactFormSubmitted: () => track('contact_form_submitted'),
  contactFormError: (error: string) => track('contact_form_error', { error }),
  formFieldComplete: (formId: string, field: string) => track('form_field_complete', { formId, field }),
  
  // Buttons and CTAs
  ctaClicked: (label: string, destination?: string, section?: string) => track('cta_clicked', { label, destination, section }),
  
  // Section visibility and engagement
  sectionVisible: (section: string) => track('section_visible', { section }),
  sectionHidden: (section: string) => track('section_hidden', { section }),
  sectionEngagement: (section: string, timeSpentMs: number) => track('section_engagement', { 
    section, 
    timeSpentSeconds: Math.round(timeSpentMs / 1000)
  }),

  // Conversion events
  demoRequested: () => track('demo_requested'),
  demoScheduled: () => track('demo_scheduled'),
  pricingViewed: () => track('pricing_viewed'),
  featuresExplored: (feature: string) => track('features_explored', { feature }),
  downloadResource: (resource: string) => track('resource_downloaded', { resource }),
  
  // How It Works steps
  stepViewed: (step: string) => track('step_visible', { step }),
  stepInteraction: (step: string, interaction: string) => track('step_interaction', { step, interaction }),
  stepComplete: (step: string) => track('step_complete', { step }),
  
  // Use case engagement
  useCaseViewed: (useCase: string) => track('use_case_viewed', { useCase }),
  useCaseEngaged: (useCase: string, interaction: string) => track('use_case_engaged', { useCase, interaction }),
  
  // Social proof
  testimonialViewed: (author: string) => track('testimonial_viewed', { author }),
  socialProofClicked: (proof: string) => track('social_proof_clicked', { proof }),
  
  // User qualification
  userQualified: (criteria: Record<string, any>) => track('user_qualified', criteria),
  userSegmented: (segment: string) => track('user_segmented', { segment }),
  
  // Generic interaction events
  buttonClick: (label: string) => track('button_clicked', { label }),
  linkClick: (label: string, href: string) => track('link_clicked', { label, href }),
  formInteraction: (formId: string, field: string) => track('form_interaction', { formId, field }),
  copyText: (text: string) => track('text_copied', { text }),
  
  // Engagement metrics
  scrollDepth: (depth: number) => track('scroll_depth', { depth }),
  timeOnPage: (seconds: number) => track('time_on_page', { seconds }),
  interactionGap: (milliseconds: number) => track('interaction_gap', { seconds: Math.round(milliseconds / 1000) }),
  exitIntent: (trigger: string) => track('exit_intent', { trigger }),
  
  // Generic tracking method for any event
  track
};