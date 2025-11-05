// Helper to safely call Smartlook tracking
export function track(event: string, props?: Record<string, any>) {
  try {
    const sl = (window as any).smartlook;
    if (!sl) return;

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
  } catch (err) {
    // Silently fail if Smartlook isn't available
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
  
  // Buttons and CTAs
  ctaClicked: (label: string, destination?: string) => track('cta_clicked', { label, destination }),
  
  // Section visibility
  sectionVisible: (section: string) => track('section_visible', { section }),
  sectionHidden: (section: string) => track('section_hidden', { section }),

  // Demo booking
  demoRequested: () => track('demo_requested'),
  demoScheduled: () => track('demo_scheduled'),
  
  // How It Works steps
  stepViewed: (step: string) => track('step_visible', { step }),
  stepInteraction: (step: string, interaction: string) => track('step_interaction', { step, interaction }),
  
  // Generic interaction events
  buttonClick: (label: string) => track('button_clicked', { label }),
  linkClick: (label: string, href: string) => track('link_clicked', { label, href }),
  formInteraction: (formId: string, field: string) => track('form_interaction', { formId, field }),
  
  // Generic tracking method for any event
  track
};