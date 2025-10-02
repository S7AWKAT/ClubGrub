import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { scrollToSection } from "@/lib/utils";
import { Star, Quote } from "lucide-react";

export const SocialProof = () => {
  const testimonials = [
    {
      quote: "ClubGrub streamlines the whole ordering process. Members can order without having to get on their phones, call the clubhouse, and get connected to the bar. Club members of all ages are using it, with high satisfaction from everyone. We’re very happy with the software.",
      author: "Michael Pacella",
      title: "General Manager",
      club: "Rockland Country Club",
      rating: 5
    },
    {
      quote: "ClubGrub has solved an age-old problem in golf – satisfying one’s hunger or thirst while out in the middle of the course, far away from the halfway house and the drink cart nowhere in sight.",
      author: "Hank Gola",
      title: "Food & Beverage Director", 
      club: "MetGolfer Magazine",
      rating: 5
    },
    {
      quote: "On-course golf menus are ripe for expansion. Less time taking phone orders means more time creating memorable experiences.",
      club: "Forbes",
      rating: 5
    },
    {
      quote: "Golfers are increasingly opting for fresher, more upscale options.",
      club: "Golf Digest",
      rating: 5
    }
  ];

  const stats = [
    { number: "100%", label: "Member Satisfaction" },
    { number: "35%", label: "Avg Revenue Increase" },
    { number: "24hrs", label: "Implementation Time" }
  ];

  return (
    <section id="trusted" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-club-gold/10 text-club-gold border-club-gold/20 mb-6">
            Trusted by Elite Clubs
          </Badge>
          <h2 className="heading-section text-text-primary mb-6">
            Trusted by <span className="text-gradient">industry leaders</span>
          </h2>
          <p className="body-large text-text-secondary max-w-3xl mx-auto">
            Join hundreds of premier clubs that have transformed their hospitality operations with ClubGrub.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <Card
              key={stat.label}
              className="card-premium text-center p-6 animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl font-bold text-club-gold mb-2">{stat.number}</div>
              <div className="text-text-secondary">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.author}
              className="card-feature p-8 animate-fade-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Quote Icon */}
              <Quote className="w-12 h-12 text-club-gold/20 mb-6" />
              
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[hsl(var(--club-star))] fill-current" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="body-large text-text-primary mb-6 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="border-t border-border-muted pt-6">
                <div className="font-semibold text-text-primary">{testimonial.author}</div>
                <div className="text-text-secondary text-sm">{testimonial.title}</div>
                <div className="text-club-gold text-sm font-medium">{testimonial.club}</div>
              </div>
            </Card>
          ))}
        </div>


        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="body-large text-text-secondary mb-6">
            Join the clubs setting the standard for premium hospitality
          </p>
          <button onClick={() => scrollToSection("contact")} className="btn-hero px-8 py-4">
            Schedule Your Demo
          </button>
        </div>
      </div>
    </section>
  );
};