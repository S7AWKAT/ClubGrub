import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const navLinks = [
	{ name: "Home", target: "hero" },
	{ name: "How It Works", target: "how-it-works" },
	{ name: "Deliver", target: "hospitality" },
	{ name: "Trusted", target: "trusted" },
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
	const [visible, setVisible] = useState(true);
	const [lastScroll, setLastScroll] = useState(0);
	const [menuOpen, setMenuOpen] = useState(false);
	const location = useLocation();

	// Hide header on scroll down, show on scroll up
	useEffect(() => {
		const handleScroll = () => {
			const currentScroll = window.scrollY;
			setVisible(currentScroll < lastScroll || currentScroll < 10);
			setLastScroll(currentScroll);
			setMenuOpen(false); // close menu on scroll
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [lastScroll]);

	// Reset scroll on route change
	useEffect(() => {
		setVisible(true);
		setLastScroll(0);
	}, [location.pathname]);

	// Mobile: lock scroll when menu open
	useEffect(() => {
		document.body.style.overflow = menuOpen ? "hidden" : "";
	}, [menuOpen]);

       // منطق الشفافية حسب موضع الصفحة
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
		       className={`fixed top-0 left-0 w-full z-50 py-2 px-4 flex items-center justify-between transition-all duration-300
			       ${isAtTop ? "bg-white/10 backdrop-blur-lg border-b border-transparent shadow-none" : "bg-white/90 backdrop-blur border-b border-yellow-100 shadow-sm"}`}
	       >
		       {/* شعار واسم الموقع */}
		       <div className="flex items-center gap-2">
			       <img src="/appicon.jpg" alt="Logo" className="w-8 h-8 rounded-full border border-yellow-200" />
			       <span className="text-xl font-bold text-gray-900 select-none">ClubGrub</span>
		       </div>

		       {/* روابط الأقسام */}
		       <nav className="hidden md:flex gap-6">
			       <button onClick={() => scrollToSection("hero")} className="text-base font-medium text-gray-700 hover:text-yellow-500 transition">Home</button>
			       <button onClick={() => scrollToSection("how-it-works")} className="text-base font-medium text-gray-700 hover:text-yellow-500 transition">How It Works</button>
			       <button onClick={() => scrollToSection("hospitality")} className="text-base font-medium text-gray-700 hover:text-yellow-500 transition">Deliver</button>
			       <button onClick={() => scrollToSection("trusted")} className="text-base font-medium text-gray-700 hover:text-yellow-500 transition">Trusted</button>
			       <button onClick={() => scrollToSection("faq")} className="text-base font-medium text-gray-700 hover:text-yellow-500 transition">FAQ</button>
			       <button onClick={() => scrollToSection("contact")} className="text-base font-medium text-gray-700 hover:text-yellow-500 transition">Contact</button>
		       </nav>

		       {/* زر رئيسي هادئ */}
		       <button
			       onClick={() => scrollToSection("get-started")}
			       className="px-5 py-2 rounded-xl bg-yellow-100 text-gray-900 font-semibold text-base shadow hover:bg-yellow-200 transition"
		       >
			       Get Started
		       </button>
	       </header>
       );
};

export default Header;