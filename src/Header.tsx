import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react"; // Import icons

const navLinks: { name: string; target: string }[] = [
	{ name: "Features", target: "outcomes" }, // Assuming 'Features' links to 'OperatorOutcomes' section
	{ name: "How It Works", target: "how-it-works" },
	{ name: "Locations", target: "hospitality" }, // Assuming 'Locations' links to 'UseCases' section
	{ name: "Launch", target: "launch-playbook" }, // Assuming 'Launch' links to 'LaunchPlaybook' section
	{ name: "FAQ", target: "faq" },
	{ name: "Contact", target: "contact" },
];

const scrollToSection = (id: string) => {
	const el = document.getElementById(id);
	if (el) {
		el.scrollIntoView({ behavior: "smooth" });
	}
};

const Header = () => {
	const [menuOpen, setMenuOpen] = useState(false); // State to control mobile menu visibility

	// Mobile: lock scroll when menu open
	useEffect(() => {
		document.body.style.overflow = menuOpen ? "hidden" : "";
	}, [menuOpen]);

       // Transparency logic based on page position
       const [isAtTop, setIsAtTop] = useState(true);
       useEffect(() => {
	       const handleScroll = () => {
		       setIsAtTop(window.scrollY < 60);
	       };
	       window.addEventListener("scroll", handleScroll);
	       return () => window.removeEventListener("scroll", handleScroll);
       }, []);

       return (
	       <header
		       className={`fixed top-0 left-0 w-full z-50 py-3 px-6 flex items-center justify-between transition-all duration-300
			       ${isAtTop ? "bg-transparent" : "bg-white/90 backdrop-blur-lg border-b border-gray-200/80 shadow-sm"}`}
	       >
		       {/* شعار واسم الموقع */}
		       <div className="flex items-center gap-2">
			       <img src="/appicon.jpg" alt="Logo" className="w-10 h-10 rounded-full border-2 border-white/20" />
			       <span className={`text-xl font-bold select-none transition-colors ${isAtTop ? 'text-white' : 'text-text-primary'}`}>ClubGrub</span>
		       </div>

		       {/* روابط الأقسام */}
		       <nav className="hidden md:flex gap-6">
					{navLinks.map((link) => (
						<button 
							key={link.name}
							onClick={() => scrollToSection(link.target)} 
							className={`text-base font-medium transition-colors ${isAtTop ? 'text-white hover:text-club-gold' : 'text-text-secondary hover:text-club-gold'}`}
						>
							{link.name}
						</button>
					))}
		       </nav>

		       {/* CTA Button */}
		       <button
			       onClick={() => scrollToSection("contact")}
			       className={`${isAtTop ? 'btn-secondary' : 'btn-primary'} px-5 py-2`}
		       >
			       Book a Demo
		       </button>
	       </header>
       );
};

export default Header;