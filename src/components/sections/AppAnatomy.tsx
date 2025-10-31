
import { useState } from "react";
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
        title: "Your Mobile Order App",
        description: "A description for Your Mobile Order App.",
        image: YourMobileOrderApp,
    },
    {
        title: "Your Menu",
        description: "A description for Your Menu.",
        image: YourMenu,
    },
    {
        title: "Use ClubGrub Anywhere",
        description: "A description for Use ClubGrub Anywhere.",
        image: UseClubGrubAnywhere,
    },
    {
        title: "Schedule Pickup",
        description: "A description for Schedule Pickup.",
        image: SchedulePickup,
    },
    {
        title: "Saves Favorites",
        description: "A description for Saves Favorites.",
        image: SavesFavorites,
    },
    {
        title: "Order Tracking",
        description: "A description for Order Tracking.",
        image: OrderTracking,
    },
    {
        title: "Multiple Outlets",
        description: "A description for Multiple Outlets.",
        image: MultipleOutlets,
    },
    {
        title: "Map Delivery",
        description: "A description for Map Delivery.",
        image: MapDelivery,
    },
    {
        title: "Chat Messaging",
        description: "A description for Chat Messaging.",
        image: ChatMessaging,
    },
];

export default function AppAnatomy() {
    const [selectedFeature, setSelectedFeature] = useState(features[0]);

    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Anatomy of Our App</h2>
                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/3">
                        <ul>
                            {features.map((feature, index) => (
                                <li
                                    key={index}
                                    className={`cursor-pointer p-4 border-b-2 ${selectedFeature.title === feature.title ? "border-blue-500" : "border-transparent"}`}
                                    onClick={() => setSelectedFeature(feature)}
                                >
                                    <h3 className="font-bold">{feature.title}</h3>
                                    <p>{feature.description}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="w-full md:w-2/3 mt-8 md:mt-0 md:pl-8 relative">
                        {/* TODO: Replace the placeholder with the actual base64 string for the phone frame */}
                        <div className="absolute inset-0 bg-black rounded-3xl"></div>
                        <img src={selectedFeature.image} alt={selectedFeature.title} className="w-full rounded-lg shadow-lg relative" />
                    </div>
                </div>
            </div>
        </section>
    );
}
