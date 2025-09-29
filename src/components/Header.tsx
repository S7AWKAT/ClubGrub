import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";

// Simple section navigation items
const navigationItems = [
  { title: "Solutions", href: "#solutions" },
  { title: "Use Cases", href: "#use-cases" },
  { title: "Industries", href: "#industries" },
  { title: "Resources", href: "#resources" },
  { title: "Pricing", href: "#pricing" }
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      <div className="container mx-auto px-6">
        <div className="flex h-16 items-center justify-center">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="text-sm font-medium text-white/90 hover:text-club-gold transition-colors duration-300 hover:scale-105"
              >
                {item.title}
              </a>
            ))}
          </nav>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="md:hidden text-white/90 hover:text-club-gold hover:bg-white/10"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-club-dark/95 backdrop-blur border-l border-club-gold/20">
              <div className="flex flex-col space-y-6 mt-8">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-club-gold">Menu</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="text-white/90 hover:text-club-gold hover:bg-white/10"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                
                <nav className="flex flex-col space-y-4">
                  {navigationItems.map((item) => (
                    <a
                      key={item.title}
                      href={item.href}
                      className="text-lg font-medium text-white/90 hover:text-club-gold transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.title}
                    </a>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};