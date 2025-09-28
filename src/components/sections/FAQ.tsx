import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export const FAQ = () => {
  const faqs = [
    {
      question: "How quickly can we implement ClubGrub?",
      answer: "Most clubs are accepting orders within 24 hours. Our typical implementation includes menu setup, staff training, and technology configuration all completed in 1-2 days. We handle everything so you can focus on serving members."
    },
    {
      question: "What are the costs and pricing structure?",
      answer: "ClubGrub pricing is based on transaction volume with no setup fees or long-term contracts. We include complimentary iPad hardware, POS integration, staff training, and ongoing support. Contact us for a customized quote based on your club's size and needs."
    },
    {
      question: "Does ClubGrub work with our existing POS system?",
      answer: "Yes, ClubGrub integrates with virtually any POS system including Micros, Toast, Square, Clover, and many others. Our universal integration approach means no expensive system replacements or operational disruptions."
    },
    {
      question: "How do members pay for orders?",
      answer: "Members can pay using their existing club billing account, credit cards, or any payment method already configured in your POS system. ClubGrub seamlessly processes payments through your current setup."
    },
    {
      question: "What kind of training and support do you provide?",
      answer: "We provide comprehensive training for all staff levels, from kitchen teams to management. This includes on-site training, digital resources, and ongoing support. Our success team is available 24/7 with average response times under 2 minutes."
    },
    {
      question: "How does GPS delivery work on the golf course?",
      answer: "Members select their location on an interactive course map when ordering. Our GPS system provides precise coordinates to your delivery team, eliminating guesswork and ensuring accurate, timely delivery anywhere on your property."
    },
    {
      question: "Can we customize the menu and pricing?",
      answer: "Absolutely. ClubGrub adapts to your existing menu, pricing, and service style. We build custom digital menus with your branding, photos, and descriptions. You maintain full control over pricing, availability, and menu modifications."
    },
    {
      question: "What happens if we need technical support?",
      answer: "Our support team is available 24/7 via phone, chat, or email. Most issues are resolved remotely within minutes. We also provide proactive monitoring and regular system updates to prevent problems before they occur."
    }
  ];

  return (
    <section className="py-24 bg-surface">
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
          <Accordion type="single" collapsible className="space-y-4">
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
            <button className="btn-hero px-8 py-4">
              Schedule a Call
            </button>
            <button className="btn-outline px-8 py-4">
              Email Our Team
            </button>
          </div>

          {/* Contact Info */}
          <div className="grid md:grid-cols-2 gap-8 mt-12 pt-8 border-t border-border-muted">
            <div className="text-center">
              <h4 className="font-semibold text-text-primary mb-2">Sales Team</h4>
              <p className="text-text-secondary">sales@clubgrub.com</p>
              <p className="text-text-secondary">(555) 123-4567</p>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-text-primary mb-2">Support Team</h4>
              <p className="text-text-secondary">support@clubgrub.com</p>
              <p className="text-text-secondary">24/7 Available</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};