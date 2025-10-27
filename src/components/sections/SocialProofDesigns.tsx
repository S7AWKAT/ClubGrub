import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";

const brandPartners = [
  { name: "CMAA", logo: "cmaa-logo.webp" },
  { name: "Concert Golf Partners", logo: "Concert_Golf_Partners_Logo.webp" },
  { name: "Forbes", logo: "Forbes-small.webp" },
  { name: "Golf Digest", logo: "Golf-Digest-small.webp" },
  { name: "Golf Inc.", logo: "golfIncLogo-small.webp" },
  { name: "LSU Athletics", logo: "LSU_Athletics_logo.webp" },
  { name: "TPC", logo: "TPC-JasnaPolana-V-RGB-pos-222x300.webp" },
];

export const Design4 = () => {
  const [duration, setDuration] = useState(15); // Default duration

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) { // Example breakpoint for mobile
        setDuration(35); // Faster duration for mobile
      } else {
        setDuration(370); // Slower duration for desktop
      }
    };

    handleResize(); // Set initial duration
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
      <div className="py-20 bg-muted">
                <div className="container mx-auto px-6">
                                    <div className="relative overflow-hidden">
            <motion.div
              className="flex w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: duration, // Use dynamic duration
                  ease: "linear",
                },
              }}
            >
              {brandPartners.concat(brandPartners).map((partner, index) => (
                <motion.div key={index} className="flex-shrink-0 mx-8 flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img
                    src={new URL(`/src/assets/BrandLogos/${partner.logo}`, import.meta.url).href}
                    alt={partner.name}
                    className={`object-contain ${partner.name === 'Golf Digest' ? 'mt-5' : ''} ${partner.name === 'TPC' ? 'h-20' : 'h-12'}`}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    );
};