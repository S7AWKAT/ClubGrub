import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChatMessaging,
    MapDelivery,
    MultipleOutlets,
    OrderTracking,
    SavesFavorites,
    SchedulePickup,
    UseClubGrubAnywhere,
    YourMenu,
    YourMobileOrderApp,
} from "@/assets/DemoApp/images";

const features = [
    {
        title: "Your Mobile Order",
        description: "Stunning images that drive orders! (or add your",
        image: YourMobileOrderApp,
    },
    {
        title: "Your Menu",
        description: "Showcase your culinary offerings.",
        image: YourMenu,
    },
    {
        title: "Use Anywhere",
        description: "Members can order from anywhere.",
        image: UseClubGrubAnywhere,
    },
    {
        title: "Schedule Pickup",
        description: "Conveniently schedule order pickups.",
        image: SchedulePickup,
    },
    {
        title: "Saves Favorites",
        description: "Your app saves favorites items with their modifications for fast re-ord",
        image: SavesFavorites,
    },
    {
        title: "Order Tracking",
        description: "Real-time order tracking for members.",
        image: OrderTracking,
    },
    {
        title: "Multiple Outlets",
        description: "Manage orders from multiple outlets.",
        image: MultipleOutlets,
    },
    {
        title: "Map-based Delivery",
        description: "Pinpoint delivery locations on a map.",
        image: MapDelivery,
    },
    {
        title: "Chat Messaging",
        description: "Communicate with members via chat.",
        image: ChatMessaging,
    },
];

export default function AppAnatomy() {
    const [selectedFeature, setSelectedFeature] = useState(features[0]);
    const middleIndex = Math.ceil(features.length / 2);
    const leftFeatures = features.slice(0, middleIndex);
    const rightFeatures = features.slice(middleIndex);

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">#1 Mobile Ordering</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                    <div className="flex flex-col gap-4">
                        {leftFeatures.map((feature, index) => (
                            <FeatureButton
                                key={index}
                                title={feature.title}
                                description={feature.description}
                                isActive={selectedFeature.title === feature.title}
                                onClick={() => setSelectedFeature(feature)}
                            />
                        ))}
                    </div>
                    <div className="relative h-[600px] w-[300px] mx-auto bg-black border-8 border-gray-800 rounded-3xl overflow-hidden shadow-lg">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-4 bg-gray-800 rounded-b-lg"></div>
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={selectedFeature.title}
                                src={selectedFeature.image}
                                alt={selectedFeature.title}
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.3 }}
                                className="w-full h-full object-cover"
                            />
                        </AnimatePresence>
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-gray-400 rounded-full"></div>
                    </div>
                    <div className="flex flex-col gap-4">
                        {rightFeatures.map((feature, index) => (
                            <FeatureButton
                                key={index}
                                title={feature.title}
                                description={feature.description}
                                isActive={selectedFeature.title === feature.title}
                                onClick={() => setSelectedFeature(feature)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

const FeatureButton = ({ title, description, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`text-left p-4 rounded-lg transition-all duration-300 ${isActive ? "bg-blue-500 text-white shadow-lg" : "bg-white hover:bg-gray-100"}`}>
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-sm">{description}</p>
    </button>
);