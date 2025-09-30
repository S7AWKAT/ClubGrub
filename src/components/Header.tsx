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

	return (
		<header
			className={`fixed left-1/2 top-4 z-50 w-[95vw] max-w-4xl -translate-x-1/2 rounded-3xl px-4 py-3 flex items-center justify-between shadow-2xl transition-all duration-500
      ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
      bg-gradient-to-br from-white/60 to-yellow-100/40 text-gray-900
      backdrop-blur-xl border border-yellow-300/30 animate-floatingIsland
    `}
			style={{
				boxShadow: "0 8px 32px 0 rgba(0,0,0,0.18)",
			}}
		>
			{/* Logo to the left of ClubGrub, always visible */}
			<span className="flex items-center gap-2">
				<img
					src="/appicon.jpg" // <-- Update with your logo path if needed
					alt="Logo"
					className="w-10 h-10 rounded-full animate-floatIsland"
					style={{ background: "rgba(255,255,255,0.6)" }}
				/>
				<span className="text-2xl md:text-3xl font-extrabold tracking-tight animate-floatIsland group-hover:text-yellow-400 transition drop-shadow-glow select-none">
					ClubGrub
				</span>
			</span>

			{/* Desktop Nav */}
			<nav className="hidden md:flex gap-4">
				{navLinks.map((link) => (
					<button
						key={link.name}
						onClick={() => scrollToSection(link.target)}
						className="relative px-3 py-1 font-semibold rounded-xl transition
            hover:text-yellow-400 hover:drop-shadow-glow
            before:absolute before:left-0 before:bottom-0 before:w-full before:h-0.5 before:bg-yellow-400 before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:origin-left"
						style={{
							textShadow: "0 0 8px #ffe066, 0 0 2px #fff",
						}}
					>
						{link.name}
					</button>
				))}
			</nav>
		</header>
	);
};

export default Header;