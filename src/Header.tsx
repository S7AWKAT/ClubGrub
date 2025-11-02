import { useState, useEffect } from "react";
import {
	Menu,
	TrendingUp,
	Workflow,
	MapPin,
	Smartphone,
	Rocket,
	HelpCircle,
	Mail,
	Calendar,
} from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
	{ name: "Features", target: "outcomes", icon: TrendingUp },
	{ name: "How It Works", target: "how-it-works", icon: Workflow },
	{ name: "Locations", target: "hospitality", icon: MapPin },
	{ name: "Demo", target: "app-anatomy", icon: Smartphone },
	{ name: "Launch", target: "launch-playbook", icon: Rocket },
	{ name: "FAQ", target: "faq", icon: HelpCircle },
	{ name: "Contact", target: "contact", icon: Mail },
];

interface HeaderProps {
	onScrollToSection: (id: string) => void;
}

const Header = ({ onScrollToSection }: HeaderProps) => {
	const handleScrollWithOffset = (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			const headerHeight = 80; // Approximate height of the sticky header
			const additionalOffset = -80; // The extra space below the header
			const elementPosition = element.getBoundingClientRect().top;
			const offsetPosition = elementPosition + window.pageYOffset - headerHeight - additionalOffset;

			window.scrollTo({ top: offsetPosition, behavior: "smooth" });
		}
	};
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
		       <div className="flex items-center gap-2 cursor-pointer" onClick={() => onScrollToSection('hero')}>
			       <img src="/appicon.webp" alt="Logo" className="w-10 h-10 rounded-full border-2 border-white/20" />
			       <span className={`text-xl font-bold select-none transition-colors ${isAtTop ? 'text-white' : 'text-text-primary'}`}>ClubGrub</span>
		       </div>

		       {/* روابط الأقسام */}
		       <nav className="hidden md:flex gap-6">
					{navLinks.map((link) => (
						<button 
							key={link.name} onClick={() => handleScrollWithOffset(link.target)}
							className={`text-base font-medium transition-colors ${isAtTop ? 'text-white hover:text-club-gold' : 'text-text-secondary hover:text-club-gold'}`}
						>
							{link.name}
						</button>
					))}
		       </nav>

		       {/* CTA Button */}
		       <button
					onClick={() => handleScrollWithOffset("contact")}
					className={`hidden md:block ${isAtTop ? 'btn-secondary' : 'btn-primary'} px-5 py-2`}
		       >
			       Book a Demo
		       </button>

				{/* Mobile Dropdown Menu */}
				<div className="md:hidden">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<button
								className={`z-50 transition-colors ${!isAtTop ? 'text-text-primary' : 'text-white'}`}
								aria-label="Toggle menu"
							>
								<Menu size={28} />
							</button>
						</DropdownMenuTrigger>
						<DropdownMenuContent 
							align="end"
							sideOffset={20}
							alignOffset={-23}
							className="w-[50vw] border-border/20 bg-background/95 backdrop-blur-lg shadow-xl animate-in slide-in-from-top-4 fade-in-25"
						>
							{navLinks.map((link) => (
								<DropdownMenuItem key={link.name} onClick={() => handleScrollWithOffset(link.target)} className="text-base py-2.5 focus:bg-white/10">
									<link.icon className="w-4 h-4 mr-3 text-muted-foreground" />
									<span>{link.name}</span>
								</DropdownMenuItem>
							))}
							<DropdownMenuSeparator />
							<DropdownMenuItem
                                onClick={() => handleScrollWithOffset("contact")}
                                className="text-base font-semibold text-club-gold focus:text-club-gold focus:bg-club-gold/10 py-3 rounded-md transition-all
                                           hover:shadow-lg hover:shadow-club-gold/20 hover:-translate-y-0.5"
                            >
								<Calendar className="w-4 h-4 mr-3" />
								<span>Book a Demo</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
	       </header>
       );
};

export default Header;