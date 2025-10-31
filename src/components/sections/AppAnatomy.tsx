
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useInView, useMotionValueEvent, useMotionValue } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const features = [
    { title: "Your Mobile Order", description: "Stunning images that drive orders!", image: "/assets/DemoApp/Your mobile order app.PNG" },
    { title: "Your Menu", description: "Showcase your culinary offerings.", image: "/assets/DemoApp/your menu.PNG" },
    { title: "Use ClubGrub anywhere", description: "Members can order from anywhere.", image: "/assets/DemoApp/use clubgrub anywhere.PNG" },
    { title: "Schedule Pickup", description: "When available, you can allow members to schedule their pickup.", image: "/assets/DemoApp/schedule pickup.PNG" },
    { title: "Saves Favorites", description: "Your app saves favorites items with their modifications for fast re-ordering.", image: "/assets/DemoApp/saves favorites.PNG" },
    { title: "Order Tracking", description: "Real-time order tracking for members.", image: "/assets/DemoApp/order tracking.PNG" },
    { title: "Multiple Outlets", description: "When needed, create more than 1 restaurant in your app with different menus.", image: "/assets/DemoApp/multiple outlets.PNG" },
    { title: "Map-based Delivery", description: "Pinpoint delivery locations on a map.", image: "/assets/DemoApp/Map Delivery Screen.jpg" },
    { title: "Chat Messaging", description: "Communicate with members in real-time without picking up the phone.", image: "/assets/DemoApp/chat messaging.PNG" },
    { title: "Push notifications", description: "Push notifications notify members.", image: "/assets/DemoApp/Your mobile order app.PNG" },
];

export const AppAnatomy = () => {

    const navigate = useNavigate();
    const [showIntro, setShowIntro] = useState(true);
    const [isScrollActive, setIsScrollActive] = useState(false);
    const [hasBeenInView, setHasBeenInView] = useState(false);
    const [manualIndex, setManualIndex] = useState(0); // New state for manual control
    const [isManualControl, setIsManualControl] = useState(false); // New state to indicate manual control
    const targetRef = useRef(null);
    const isInView = useInView(targetRef, { once: true });

    const { scrollYProgress } = useScroll({ 
        target: targetRef
    });

    const featureIndex = useTransform(scrollYProgress, [0, 1], isScrollActive ? [0, features.length - 1] : [0, 0]);

    const [currentIndex, setCurrentIndex] = useState(0);
    const currentFeatureMotionIndex = useMotionValue(0); // New MotionValue for controlling the displayed feature

    const activeIndex = useTransform(featureIndex, (latest) => Math.round(latest));

    useMotionValueEvent(activeIndex, "change", (latest) => {
        if (!isManualControl) {
            currentFeatureMotionIndex.set(latest);
        }
    });

    useMotionValueEvent(currentFeatureMotionIndex, "change", (latest) => {
        setCurrentIndex(latest);
    });

    useEffect(() => {
        let scrollTimeout;
        const handleScroll = () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                if (isManualControl) {
                    setIsManualControl(false);
                }
            }, 100); // Debounce to avoid immediate re-enabling during programmatic scroll
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            clearTimeout(scrollTimeout);
        };
    }, [isManualControl]);

    const x = useTransform(currentFeatureMotionIndex, (latest) => `-${latest * 100}%`);

    useEffect(() => {
        if (isInView) {
            setHasBeenInView(true);
            const timer = setTimeout(() => {
                setShowIntro(false);
                setIsScrollActive(true);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [isInView]);





    const handleFeatureClick = (index) => {
        setIsManualControl(true);
        currentFeatureMotionIndex.set(index);
    };

    const handleSkip = () => {
        // Assuming the user wants to skip to the home page. 
        // If a different route is desired, please specify.
        navigate("/");
    };

    return (
        <section ref={targetRef} className="relative h-[500vh] bg-background text-text-primary">
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
                <AnimatePresence>
                    {hasBeenInView && showIntro ? (
                        <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute z-20 w-full h-full flex items-center justify-center bg-background">
                            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1, delay: 0.5 }} className="relative h-[80vh] w-[40vh] mx-auto bg-black border-8 border-gray-800 rounded-3xl overflow-hidden shadow-2xl">
                                <motion.img src="/ClubGrubIcon.webp" alt="ClubGrub Logo" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, delay: 1.5 }} className="absolute inset-0 m-auto w-24 h-24" />
                            </motion.div>
                        </motion.div>
                    ) : null}
                </AnimatePresence>

        <h2 className="heading-section text-text-primary mb-6 text-center">
            <span className="text-gradient">#1 Mobile Ordering</span> <br />
            Technology for Clubs
        </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center w-full max-w-6xl mx-auto">
                    <div className="hidden md:flex flex-col gap-4">
                        {features.slice(0, 5).map((feature, index) => (
                            <FeatureButton key={index} title={feature.title} description={feature.description} isActive={currentIndex === index} onClick={() => handleFeatureClick(index)} />
                        ))}
                    </div>

                    <motion.div initial={{ scale: 0.8, y: 100, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} className="relative h-[600px] w-[300px] mx-auto bg-black border-8 border-gray-800 rounded-3xl overflow-hidden shadow-2xl">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-4 bg-gray-800 rounded-b-lg z-10"></div>
                        <motion.div className="w-full h-full flex" style={{ x }} transition={{ ease: "easeOut", duration: 0.5 }}>
                            {features.map((feature, index) => (
                                <img key={index} src={feature.image} alt={feature.title} className="w-full h-full object-cover flex-shrink-0" />
                            ))}
                        </motion.div>
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-gray-400 rounded-full z-10"></div>
                    </motion.div>

                    <div className="hidden md:flex flex-col gap-4">
                        {features.slice(5).map((feature, index) => (
                            <FeatureButton key={index + 5} title={feature.title} description={feature.description} isActive={currentIndex === index + 5} onClick={() => handleFeatureClick(index + 5)} />
                        ))}
                    </div>
                </div>
                <div className="absolute bottom-8 group">
                    <button onClick={handleSkip} className="flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors">
                        <ChevronDown className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
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
