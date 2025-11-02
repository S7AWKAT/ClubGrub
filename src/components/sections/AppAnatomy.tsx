
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useInView, useMotionValueEvent, useMotionValue, animate } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

export const AppAnatomy = ({ id, isExternalScrolling = false }: { id?: string; isExternalScrolling?: boolean }) => {

    const navigate = useNavigate();
    const [showIntro, setShowIntro] = useState(true);
    const [isScrollActive, setIsScrollActive] = useState(false);
    const [hasBeenInView, setHasBeenInView] = useState(false);
    const [manualIndex, setManualIndex] = useState(0); // New state for manual control
    const [isManualControl, setIsManualControl] = useState(false); // New state to indicate manual control
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const [isProgrammaticScrolling, setIsProgrammaticScrolling] = useState(false);

    const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const isManualControlRef = useRef(isManualControl);
    useEffect(() => {
        isManualControlRef.current = isManualControl;
    }, [isManualControl]);
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
        if (!isManualControl && !isExternalScrolling) {
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
                if (isManualControlRef.current) {
                    setIsManualControl(false); // Re-enable scroll-driven updates
                }
            }, 100); // Further reduced debounce for even faster response
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            clearTimeout(scrollTimeout);
        };
    }, []); // Removed isManualControl from dependency array

    const x = useTransform(currentFeatureMotionIndex, (latest) => `-${latest * 100}%`);

    useEffect(() => {
        if (isInView) {
            setHasBeenInView(true);
            const timer = setTimeout(() => {
                setShowIntro(false);
                setIsScrollActive(true);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [isInView]);





    const handleFeatureClick = useCallback((index) => {
        setIsManualControl(true);
        currentFeatureMotionIndex.set(index);

        if (targetRef.current) {
            const sectionOffsetTop = targetRef.current.offsetTop;
            const sectionHeight = targetRef.current.offsetHeight;
            const viewportHeight = window.innerHeight;
            const scrollableHeight = sectionHeight - viewportHeight;
            const targetScrollYProgress = features.length > 1 ? index / (features.length - 1) : 0;
            const targetScrollPosition = sectionOffsetTop + (targetScrollYProgress * scrollableHeight);

            // Stop any existing scroll animation
            animate(window.scrollY, targetScrollPosition, {
                type: "tween", // Changed to tween for more direct control
                duration: 0.4, // Made animation even faster
                ease: "easeOut",
                onUpdate: (value) => {
                    window.scrollTo(0, value);
                },
                onComplete: () => {
                    // After the animation completes, we can allow scroll-based updates again.
                    // A small delay helps prevent immediate scroll events from interfering.
                    setIsManualControl(false);
                }
            });
        }
    }, [currentFeatureMotionIndex]);

    const handleSkip = () => {
        const launchPlaybookSection = document.getElementById("launch-playbook");
        if (launchPlaybookSection) {
            launchPlaybookSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section id={id} ref={targetRef} className="relative h-[500vh] bg-background text-text-primary">
            <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
                <AnimatePresence>
                    {hasBeenInView && showIntro ? (
                        <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute z-20 w-full h-full flex items-center justify-center bg-background pointer-events-none">
                            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1, delay: 0.5 }} className="relative h-[80vh] w-[40vh] mx-auto bg-black border-[10px] border-black rounded-[70px] overflow-hidden shadow-2xl">
                                {/* Dynamic Island - now with motion */}
                                <motion.div
                                    initial={{ width: "5.5rem", height: "1.65rem" }}
                                    className="absolute top-4 left-1/2 -translate-x-1/2 bg-black rounded-full z-20 flex items-center justify-end pr-3">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                                        <div className="relative w-2.5 h-2.5 bg-[#110f26] rounded-full overflow-hidden">
                                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-white/10 rounded-full blur-sm"></div>
                                            <div className="absolute top-[1px] right-[1px] w-0.5 h-0.5 bg-white/50 rounded-full"></div>
                                        </div>
                                    </div>
                                </motion.div>
                                <motion.img src="/ClubGrubIcon.webp" alt="ClubGrub Logo" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, delay: 1.5 }} className="absolute inset-0 m-auto w-24 h-24" />
                            </motion.div>
                        </motion.div>
                    ) : null}
                </AnimatePresence>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: showIntro ? 0 : 1 }} transition={{ duration: 0.5 }} className="pt-16 md:pt-0">
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

                        <motion.div initial={{ scale: 0.8, y: 100, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} className="relative h-[450px] w-[225px] md:h-[600px] md:w-[300px] mx-auto bg-black border-[10px] border-black rounded-[50px] overflow-hidden shadow-2xl">
                            {/* Dynamic Island */}
                            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-[5.5rem] h-[1.65rem] bg-black rounded-full z-20 flex items-center justify-end pr-3">
                                <div className="flex items-center gap-1.5">
                                    <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                                    <div className="relative w-2.5 h-2.5 bg-[#110f26] rounded-full overflow-hidden">
                                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-white/10 rounded-full blur-sm"></div>
                                        <div className="absolute top-[1px] right-[1px] w-0.5 h-0.5 bg-white/50 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                            {/* Screen Content */}
                            <motion.div className="w-full h-full flex" style={{ x }} transition={{ ease: "easeOut", duration: 0.5 }}>
                                {features.map((feature, index) => (
                                    <img key={index} src={feature.image} alt={feature.title} className="w-full h-full object-cover flex-shrink-0" />
                                ))}
                            </motion.div>
                            {/* Home Bar */}
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-gray-400 rounded-full z-20"></div>
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
                </motion.div>
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
