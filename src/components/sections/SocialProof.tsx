import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";

export const SocialProof = () => {
  const testimonials = [
    {
      quote: "ClubGrub transformed our F&B operations overnight. Revenue is up 40% and our members absolutely love the convenience.",
      author: "Sarah Mitchell",
      title: "General Manager",
      club: "Pinehurst Country Club",
      rating: 5
    },
    {
      quote: "The implementation was seamless. We were taking orders within hours, not weeks like other systems promised.",
      author: "Michael Chen",
      title: "Food & Beverage Director", 
      club: "Oakwood Golf & Tennis",
      rating: 5
    },
    {
      quote: "Our staff efficiency improved dramatically. Less time taking phone orders means more time creating memorable experiences.",
      author: "Jennifer Rodriguez",
      title: "Club Operations Manager",
      club: "Riverside Athletic Club",
      rating: 5
    },
    {
      quote: "The GPS delivery feature is a game-changer. Golfers can order from anywhere on the course and we find them instantly.",
      author: "David Thompson", 
      title: "Head Professional",
      club: "Championship Links Golf Club",
      rating: 5
    }
  ];

  const stats = [
    { number: "500+", label: "Active Clubs" },
    { number: "98%", label: "Member Satisfaction" },
    { number: "35%", label: "Avg Revenue Increase" },
    { number: "24hrs", label: "Implementation Time" }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-club-gold/10 text-club-gold border-club-gold/20 mb-6">
            Trusted by Elite Clubs
          </Badge>
          <h2 className="heading-section text-text-primary mb-6">
            Trusted by <span className="text-gradient">leading clubs nationwide</span>
          </h2>
          <p className="body-large text-text-secondary max-w-3xl mx-auto">
            Join hundreds of premier clubs that have transformed their hospitality operations with ClubGrub.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
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
                  <Star key={i} className="w-5 h-5 text-club-gold fill-current" />
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

        {/* Trust Badges */}
        <div className="bg-gradient-to-r from-club-cream to-surface rounded-3xl p-12 text-center">
          <h3 className="heading-card text-text-primary mb-6">
            Industry Recognition & Awards
          </h3>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-club-gold/10 rounded-2xl flex items-center justify-center mb-4">
                <Star className="w-8 h-8 text-club-gold" />
              </div>
              <div className="font-semibold text-text-primary text-sm">Product of the Year</div>
              <div className="text-text-secondary text-xs">Boardroom Magazine</div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-club-gold/10 rounded-2xl flex items-center justify-center mb-4">
                <Star className="w-8 h-8 text-club-gold" />
              </div>
              <div className="font-semibold text-text-primary text-sm">Innovation Award</div>
              <div className="text-text-secondary text-xs">Golf Inc Magazine</div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-club-gold/10 rounded-2xl flex items-center justify-center mb-4">
                <Star className="w-8 h-8 text-club-gold" />
              </div>
              <div className="font-semibold text-text-primary text-sm">Featured Article</div>
              <div className="text-text-secondary text-xs">Forbes</div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-club-gold/10 rounded-2xl flex items-center justify-center mb-4">
                <Star className="w-8 h-8 text-club-gold" />
              </div>
              <div className="font-semibold text-text-primary text-sm">Technology Leader</div>
              <div className="text-text-secondary text-xs">Golf Digest</div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="body-large text-text-secondary mb-6">
            Join the clubs setting the standard for premium hospitality
          </p>
          <button className="btn-hero px-8 py-4">
            Schedule Your Demo
          </button>
        </div>
      </div>
    </section>
  );
};