import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { scrollToSection } from "@/lib/utils";
import { analytics } from "@/lib/analytics";

export const FAQ = () => {
  const faqs = [
    {
      question: "How quickly can we implement ClubGrub?",
      answer: "Most clubs are accepting orders within 24 hours. Our typical implementation includes menu setup, staff training, and technology configuration all completed in 1-2 hours. We handle everything so you can focus on serving members."
    },
    {
      question: "What are the costs and pricing structure?",
      answer: "ClubGrub offers flat-fee licensing with no setup fees or long-term contracts. We include complimentary hardware, staff training, and ongoing support. Contact us for a customized quote based on your club's operational needs."
    },
    {
      question: "Does ClubGrub work with our existing POS system?",
      answer: "Yes, ClubGrub can be used with any POS system. No expensive system replacements or operational disruptions."
    },
    {
      question: "How do members pay for orders?",
      answer: "Members can pay using their existing club billing account, credit cards, or any payment method already configured in your POS system. Contact us to discuss options for your club."
    },
    {
      question: "How does GPS delivery work on the golf course?",
      answer: "Our GPS system provides precise real-time coordinates to your delivery team, eliminating guesswork and ensuring accurate, timely delivery anywhere on your property."
    },
    {
      question: "Can we customize the menu and pricing?",
      answer: "Absolutely. ClubGrub adapts to your existing menu, pricing, and service style. We build custom digital menus with your branding, photos, and descriptions. You maintain full control over pricing, availability, and menu modifications."
    },
    {
      question: "What kind of training and support do you provide?",
      answer: "We provide comprehensive training for all staff levels, from kitchen teams to management. This includes on-site training, digital resources, and ongoing support. Our success team is available 24/7 with average response times under 2 minutes."
    },
    {
      question: "What happens if we need technical support?",
      answer: "Our support team is available 24/7 via phone, chat, or email. Most issues are resolved remotely within minutes. We also provide proactive monitoring and regular system updates to prevent problems before they occur."
    },
  ];

  return (
    <section id="faq" className="py-24 bg-surface">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-club-gold/10 text-club-gold border-club-gold/20 mb-6">
            Common Questions
          </Badge>
          <h2 className="heading-section text-text-primary mb-6">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="body-large text-text-secondary max-w-2xl mx-auto">
            Get answers to the most common questions about implementing ClubGrub at your club.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="animate-fade-up">
          <Accordion 
            type="single" 
            collapsible 
            className="space-y-4"
            onValueChange={(value) => {
              const idx = value ? parseInt(value.split('-')[1]) : -1;
              if (idx >= 0) {
                analytics.faqItemOpened(faqs[idx].question);
              }
            }}
          >
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-2xl border border-border-muted px-8 py-2 hover:shadow-lg transition-shadow"
              >
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="heading-card text-text-primary pr-4">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <p className="body-medium text-text-secondary leading-relaxed">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Still have questions CTA */}
        <div className="text-center mt-16 bg-gradient-to-r from-club-gold/5 to-club-gold/10 rounded-3xl p-12">
          <h3 className="heading-card text-text-primary mb-4">
            Still have questions?
          </h3>
          <p className="body-large text-text-secondary mb-8 max-w-2xl mx-auto">
            Our team of club hospitality experts is standing by to answer any specific questions about your implementation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => {
                analytics.ctaClicked('Schedule a Call', 'calendly');
                window.open("https://calendly.com/clubgrub", "_blank");
              }} 
              className="btn-hero px-8 py-4"
            >
              Schedule a Call
            </button>
            <button 
              onClick={() => {
                analytics.ctaClicked('Email Our Team', 'contact');
                scrollToSection("contact");
              }} 
              className="btn-outline px-8 py-4"
            >
              Email Our Team
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};