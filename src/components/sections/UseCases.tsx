import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { scrollToSection } from "@/lib/utils";
import { MapPin, Home, Waves, Utensils, ArrowRight } from "lucide-react";
import golfImage from "@/assets/golf-course-ordering.jpg";
import halfwayHouseImage from "@/assets/halfway-houses.jpg";
import poolImage from "@/assets/pool-dining.jpg";
import togoImage from "@/assets/togo.jpg";

export const UseCases = () => {
  const useCases = [
    {
      icon: MapPin,
      title: "On-Course Delivery",
      description: "GPS-enabled ordering ensures food and beverages reach golfers exactly where they are on the course.",
      image: golfImage,
      benefits: ["GPS precision targeting", "Cart-side delivery", "No interruption to play", "Weather-resistant service"]
    },
    {
      icon: Home,
      title: "Halfway Houses",
      description: "Transform turn stations into revenue centers with pre-ordering and quick pickup options.",
      image: halfwayHouseImage,
      benefits: ["Order-ahead convenience", "Reduced wait times", "Increased throughput", "Premium grab-and-go"]
    },
    {
      icon: Waves,
      title: "Pool & Racquets",
      description: "Poolside and courtside service that doesn't interrupt relaxation or competitive play.",
      image: poolImage,
      benefits: ["Cabana delivery", "Courtside service", "Chairside service", "Resort-style amenities"]
    },
    {
      icon: Utensils,
      title: "To-Go / Community",
      description: "Extend dining beyond the clubhouse with community events and member takeout services.",
      image: togoImage,
      benefits: ["Reduce call-in orders", "Family takeout", "Schedule pickup times", "Home delivery available"]
    }
  ];

  return (
    <section id="hospitality" className="py-24 bg-background">
      

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-club-gold/10 text-club-gold border-club-gold/20 mb-6">
            Hospitality Beyond the Clubhouse
          </Badge>
          <h2 className="heading-section text-text-primary mb-6">
            Deliver hospitality <span className="text-gradient">everywhere members gather</span>
          </h2>
          <p className="body-large text-text-secondary max-w-3xl mx-auto">
            From the first tee to the final putt, from poolside relaxation to community events - ClubGrub extends your service footprint across your entire facility.
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {useCases.map((useCase, index) => (
            <Card
              key={useCase.title}
              className="card-feature overflow-hidden group animate-fade-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Image or Icon Header */}
              <div className="relative h-48 bg-gradient-to-br from-club-gold/10 to-club-gold/5">
                {useCase.image ? (
                  <img
                    src={useCase.image}
                    alt={useCase.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <useCase.icon className="w-16 h-16 text-club-gold" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-club-dark/20 to-transparent" />
                
                {/* Icon Overlay */}
                <div className="absolute top-4 left-4 w-12 h-12 bg-white/90 rounded-xl flex items-center justify-center">
                  <useCase.icon className="w-6 h-6 text-club-gold" />
                </div>
              </div>

              <div className="p-8">
                <h3 className="heading-card text-text-primary mb-4 group-hover:text-club-gold transition-colors">
                  {useCase.title}
                </h3>
                
                <p className="body-medium text-text-secondary mb-6">
                  {useCase.description}
                </p>

                {/* Benefits */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {useCase.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-club-gold rounded-full flex-shrink-0" />
                      <span className="text-sm text-text-secondary">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Learn More Link */}
                <button className="inline-flex items-center text-club-gold font-medium hover:gap-3 transition-all group-hover:translate-x-1">
                  Learn more
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <button onClick={() => scrollToSection("contact")} className="btn-hero px-8 py-4">
            Calculate Your Revenue Potential
          </button>
        </div>
      </div>
    </section>
  );
};