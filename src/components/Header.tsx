import { useState } from "react";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, ArrowRight, Utensils, Crown } from "lucide-react";
import { cn } from "@/lib/utils";

// Premium Logo component matching the luxury hospitality brand
const Logo = () => (
  <div className="flex items-center space-x-3">
    <div className="w-10 h-10 bg-gradient-to-br from-club-gold to-club-gold-light rounded-xl flex items-center justify-center shadow-premium">
      <Crown className="w-6 h-6 text-club-dark" />
    </div>
    <div className="flex flex-col">
      <span className="text-xl font-bold text-club-dark tracking-tight">ClubGrub</span>
      <span className="text-xs text-club-silver font-medium -mt-1">Premium F&B</span>
    </div>
  </div>
);

const navigationItems = [
  {
    title: "Solutions",
    href: "#solutions",
    children: [
      { title: "Mobile Ordering", href: "#mobile-ordering", description: "Streamline F&B ordering across all venues" },
      { title: "POS Integration", href: "#pos-integration", description: "Seamless point-of-sale connectivity" },
      { title: "Analytics Dashboard", href: "#analytics", description: "Real-time insights and member behavior" },
    ]
  },
  {
    title: "Use Cases",
    href: "#use-cases",
    children: [
      { title: "On-Course Dining", href: "#on-course", description: "Halfway houses and turn stands" },
      { title: "Poolside Service", href: "#poolside", description: "Premium pool and cabana experiences" },
      { title: "Clubhouse Dining", href: "#clubhouse", description: "Fine dining and casual restaurant" },
    ]
  },
  {
    title: "Industries",
    href: "#industries",
    children: [
      { title: "Private Clubs", href: "#private-clubs", description: "Exclusive member experiences" },
      { title: "Golf Courses", href: "#golf-courses", description: "On-course dining solutions" },
      { title: "Resorts", href: "#resorts", description: "Comprehensive hospitality management" },
    ]
  },
  {
    title: "Resources",
    href: "#resources",
    children: [
      { title: "Case Studies", href: "#case-studies", description: "Success stories from luxury clubs" },
      { title: "Launch Playbook", href: "#playbook", description: "Implementation guide for operators" },
      { title: "Support", href: "#support", description: "Premium support for your success" },
    ]
  },
  {
    title: "Pricing",
    href: "#pricing"
  }
];

const ListItem = ({ title, href, description }: { title: string; href: string; description: string }) => (
  <li>
    <NavigationMenuLink asChild>
      <a
        href={href}
        className={cn(
          "block select-none space-y-2 rounded-xl p-4 leading-none no-underline outline-none transition-all duration-300 hover:bg-club-cream/50 hover:shadow-md focus:bg-club-cream/50 focus:shadow-md group"
        )}
      >
        <div className="text-sm font-semibold leading-none text-text-primary group-hover:text-club-gold transition-colors">
          {title}
        </div>
        <p className="line-clamp-2 text-sm leading-snug text-text-secondary">
          {description}
        </p>
      </a>
    </NavigationMenuLink>
  </li>
);

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-muted bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/60 shadow-lg">
      <div className="container mx-auto px-6">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <Logo />
            </a>
          </div>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {item.children ? (
                    <>
                      <NavigationMenuTrigger className="text-text-primary hover:text-club-gold transition-colors font-medium">
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[500px] gap-3 p-6 md:w-[600px] md:grid-cols-2 lg:w-[700px]">
                          {item.children.map((child) => (
                            <ListItem
                              key={child.title}
                              title={child.title}
                              href={child.href}
                              description={child.description}
                            />
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink asChild>
                      <a
                        href={item.href}
                        className="group inline-flex h-10 w-max items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-text-primary transition-all duration-300 hover:text-club-gold hover:bg-club-cream/50 focus:outline-none focus:ring-2 focus:ring-club-gold/20"
                      >
                        {item.title}
                      </a>
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-text-primary hover:text-club-gold hover:bg-club-cream/50 transition-all duration-300"
            >
              Sign In
            </Button>
            <Button 
              size="sm" 
              className="btn-hero group text-sm px-6 py-2"
            >
              Book a Demo
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="lg:hidden text-text-primary hover:text-club-gold hover:bg-club-cream/50"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px] sm:w-[400px] bg-surface border-l border-border-muted">
              <div className="flex flex-col space-y-6 mt-8">
                <div className="flex items-center justify-between">
                  <Logo />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="text-text-primary hover:text-club-gold hover:bg-club-cream/50"
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>
                
                <nav className="flex flex-col space-y-6">
                  {navigationItems.map((item) => (
                    <div key={item.title}>
                      <a
                        href={item.href}
                        className="text-lg font-semibold text-text-primary hover:text-club-gold transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.title}
                      </a>
                      {item.children && (
                        <div className="ml-4 mt-3 space-y-3">
                          {item.children.map((child) => (
                            <a
                              key={child.title}
                              href={child.href}
                              className="block text-sm text-text-secondary hover:text-club-gold transition-colors"
                              onClick={() => setIsOpen(false)}
                            >
                              {child.title}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>
                
                <div className="flex flex-col space-y-3 pt-6 border-t border-border-muted">
                  <Button 
                    variant="ghost" 
                    className="justify-start text-text-primary hover:text-club-gold hover:bg-club-cream/50"
                  >
                    Sign In
                  </Button>
                  <Button className="btn-hero group">
                    Book a Demo
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};