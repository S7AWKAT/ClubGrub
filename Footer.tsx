import { scrollToSection } from "@/lib/utils";

const footerLinks = [
  { name: "Operators", target: "outcomes" },
  { name: "About", target: "trusted" },
  { name: "Trends", target: "how-it-works" },
  { name: "Golfers", target: "hospitality" },
  { name: "Blog", target: "contact" }, // Placeholder, assuming blog is part of contact or a future section
];

export const Footer = () => {
  return (
    <footer className="bg-surface border-t border-border-muted">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo and Copyright */}
          <div className="text-center md:text-left">
            <span className="text-xl font-bold text-text-primary">ClubGrub</span>
            <p className="text-sm text-text-secondary mt-1">
              © {new Date().getFullYear()} ClubGrub. All rights reserved.
            </p>
          </div>

          {/* Footer Menu */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.target)}
                className="text-base font-medium text-text-secondary hover:text-club-gold transition-colors"
              >
                {link.name}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};