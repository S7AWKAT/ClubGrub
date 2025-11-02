import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChevronLeft, ChevronRight } from "lucide-react";

const features = [
    { title: "Your Mobile Order", description: "Stunning images that drive orders!", image: "/assets/DemoApp/Your mobile order app.png" },
    { title: "Your Menu", description: "Showcase your culinary offerings.", image: "/assets/DemoApp/your menu.png" },
    { title: "Use ClubGrub anywhere", description: "Members can order from anywhere.", image: "/assets/DemoApp/use clubgrub anywhere.png" },
    { title: "Schedule Pickup", description: "When available, you can allow members to schedule their pickup.", image: "/assets/DemoApp/schedule pickup.png" },
    { title: "Saves Favorites", description: "Your app saves favorites items with their modifications for fast re-ordering.", image: "/assets/DemoApp/saves favorites.png" },
    { title: "Order Tracking", description: "Real-time order tracking for members.", image: "/assets/DemoApp/order tracking.png" },
    { title: "Multiple Outlets", description: "When needed, create more than 1 restaurant in your app with different menus.", image: "/assets/DemoApp/multiple outlets.png" },
    { title: "Map-based Delivery", description: "Pinpoint delivery locations on a map.", image: "/assets/DemoApp/Map Delivery Screen.jpg" },
    { title: "Chat Messaging", description: "Communicate with members in real-time without picking up the phone.", image: "/assets/DemoApp/chat messaging.png" },
    { title: "Push notifications", description: "Push notifications notify members.", image: "/assets/DemoApp/Your mobile order app.png" },
];

export const AppAnatomy = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const isMobile = useIsMobile();


    return (
        <section className="relative h-screen bg-background text-text-primary flex flex-col items-center justify-center">
            <div className="pt-8 md:pt-0">
                <h2 className="heading-section text-text-primary mb-6 text-center">
                    <span className="text-gradient">#1 Mobile Ordering</span> <br />
                    Technology for Clubs
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center w-full max-w-6xl mx-auto">
                    {!isMobile && (
                        <div className="hidden md:flex flex-col gap-4">
                            {features.slice(0, 5).map((feature, index) => (
                                <FeatureButton key={index} title={feature.title} description={feature.description} isActive={currentIndex === index} onClick={() => setCurrentIndex(index)} />
                            ))}
                        </div>
                    )}

                    <div className="flex items-center justify-center gap-2">

                        <div className="relative h-[450px] w-[225px] md:h-[600px] md:w-[300px] mx-auto bg-black border-[10px] border-black rounded-[50px] overflow-hidden shadow-2xl">
                            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-[5.5rem] h-[1.65rem] bg-black rounded-full z-20 flex items-center justify-end pr-3">
                                <div className="flex items-center gap-1.5">
                                    <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                                    <div className="relative w-2.5 h-2.5 bg-[#110f26] rounded-full overflow-hidden">
                                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-white/10 rounded-full blur-sm"></div>
                                        <div className="absolute top-[1px] right-[1px] w-0.5 h-0.5 bg-white/50 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full h-full flex">
                                <img src={features[isMobile ? 0 : currentIndex].image} alt={features[isMobile ? 0 : currentIndex].title} className="w-full h-full object-cover flex-shrink-0" />
                            </div>
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-gray-400 rounded-full z-20"></div>
                        </div>

                    </div>

                    {!isMobile && (
                        <div className="hidden md:flex flex-col gap-4">
                            {features.slice(5).map((feature, index) => (
                                <FeatureButton key={index + 5} title={feature.title} description={feature.description} isActive={currentIndex === index + 5} onClick={() => setCurrentIndex(index + 5)} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

const FeatureButton = ({ title, description, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`text-left p-4 rounded-lg transition-all duration-300 w-full ${isActive ? "bg-primary text-primary-foreground shadow-lg" : "bg-muted hover:bg-muted/80"}`}>
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
    </button>
);