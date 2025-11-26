import { Card } from "@/components/ui/card";
import { TrendingUp, Users, Zap, Clock } from "lucide-react";
import { scrollToSection } from "@/lib/utils";
import { usePageContent } from "@/hooks/usePageContent";
import useSectionVisible from "@/hooks/useSectionVisible";
import { analytics } from "@/lib/analytics";

const iconMap: Record<string, any> = {
  TrendingUp,
  Users,
  Zap,
  Clock
};

export const OperatorOutcomes = () => {
  useSectionVisible('outcomes');
  const { content, loading } = usePageContent("outcomes");

  const defaultOutcomes = [
    {
      icon: TrendingUp,
      title: "Increase Revenue",
      description: "On-course, poolside, halfway houses, community dining. Capture F&B opportunities everywhere members gather.",
      highlight: "35% avg revenue increase"
    },
    {
      icon: Users,
      title: "Optimize Labor",
      description: "Reduce call-in and order-taking workload. Free up staff for premium hospitality experiences.",
      highlight: "40% less phone orders"
    },
    {
      icon: Zap,
      title: "Elevate Experiences",
      description: "Frictionless ordering meets premium hospitality. Exceed member expectations with seamless service.",
      highlight: "100% member satisfaction"
    },
    {
      icon: Clock,
      title: "Accelerate Pace of Play",
      description: "Eliminate bottlenecks, enable order-ahead. Keep the game moving while enhancing the experience.",
      highlight: "15min faster rounds"
    }
  ];

  const data = content || {
    title: "Measurable results that impact your",
    titleHighlight: "bottom line and member satisfaction",
    description: "ClubGrub delivers quantifiable outcomes that matter to club operators and members.",
    outcomes: defaultOutcomes
  };

  if (loading) return null;

  return (
    <section id="outcomes" className="py-24 bg-surface">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-section text-text-primary mb-6">
            {data.title}<br />
            <span className="text-gradient">{data.titleHighlight}</span>
          </h2>
          <p className="body-large text-text-secondary max-w-3xl mx-auto">
            {data.description}
          </p>
        </div>

        {/* Outcomes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.outcomes.map((outcome: any, index: number) => {
            const IconComponent = iconMap[outcome.icon] || TrendingUp;
            return (
            <Card
              key={outcome.title}
              className="card-feature group relative overflow-hidden animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-cta rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-8 h-8 text-club-gold-light" />
                </div>

                {/* Content */}
                <h3 className="heading-card text-text-primary mb-4">
                  {outcome.title}
                </h3>
                
                <p className="body-medium text-text-secondary mb-6">
                  {outcome.description}
                </p>

                {/* Highlight Metric */}
                <div className="inline-flex items-center px-4 py-2 bg-club-gold/10 rounded-lg">
                  <span className="text-sm font-semibold text-club-gold">
                    {outcome.highlight}
                  </span>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-club-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Card>
          );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="body-medium text-text-secondary mb-6">
            Ready to see these results at your club?
          </p>
          <button onClick={() => { try { analytics.ctaClicked('Schedule Your Demo','contact','outcomes'); } catch(e){}; scrollToSection("contact"); }} className="btn-hero inline-flex items-center px-8 py-4">
            Schedule Your Demo
          </button>
        </div>
      </div>
    </section>
  );
};