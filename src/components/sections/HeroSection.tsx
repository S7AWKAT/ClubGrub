import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Award, Star, TrendingUp, Users } from "lucide-react";
import heroImage from "@/assets/hero-clubhouse.jpg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Elegant private club dining room with modern mobile technology"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center text-white">
        {/* Awards Row */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-up">
          <Badge variant="outline" className="bg-white/10 border-white/20 text-white px-4 py-2">
            <Award className="w-4 h-4 mr-2" />
            Product of the Year – Boardroom
          </Badge>
          <Badge variant="outline" className="bg-white/10 border-white/20 text-white px-4 py-2">
            <Star className="w-4 h-4 mr-2" />
            Featured in Forbes
          </Badge>
          <Badge variant="outline" className="bg-white/10 border-white/20 text-white px-4 py-2">
            <TrendingUp className="w-4 h-4 mr-2" />
            Golf Digest Featured
          </Badge>
          <Badge variant="outline" className="bg-white/10 border-white/20 text-white px-4 py-2">
            <Users className="w-4 h-4 mr-2" />
            Golf Inc Strategies Summit
          </Badge>
        </div>

        {/* Main Headline */}
        <h1 className="heading-hero text-white mb-6 animate-fade-up [animation-delay:200ms]">
          Sell more F&amp;B<br />
          <span className="text-gradient">Without extra labor</span>
        </h1>

        {/* Subheadline */}
        <p className="body-large text-white/90 max-w-3xl mx-auto mb-12 animate-fade-up [animation-delay:400ms]">
          Elevate hospitality experiences with convenient mobile ordering of food and beverages. Drive revenue while optimizing your team's efficiency.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up [animation-delay:600ms]">
          <Button className="btn-hero group text-lg px-8 py-4">
            Book a Demo
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="outline" className="btn-outline text-lg px-8 py-4">
            See it in action
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-8 mt-16 text-white/80 animate-fade-up [animation-delay:800ms]">
          <div className="text-center">
            <div className="text-3xl font-bold text-club-gold">500+</div>
            <div className="text-sm">Active Clubs</div>
          </div>
          <div className="hidden sm:block w-px h-12 bg-white/20" />
          <div className="text-center">
            <div className="text-3xl font-bold text-club-gold">98%</div>
            <div className="text-sm">Member Satisfaction</div>
          </div>
          <div className="hidden sm:block w-px h-12 bg-white/20" />
          <div className="text-center">
            <div className="text-3xl font-bold text-club-gold">24hrs</div>
            <div className="text-sm">Avg. Implementation</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
};