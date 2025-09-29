import { useState } from "react";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Logo component - you can replace this with your actual logo
const Logo = () => (
  <div className="flex items-center space-x-2">
    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
      <span className="text-white font-bold text-sm">F&B</span>
    </div>
    <span className="text-xl font-bold text-gray-900">OrderFlow</span>
  </div>
);

const navigationItems = [
  {
    title: "Solutions",
    href: "#solutions",
    children: [
      { title: "Mobile Ordering", href: "#mobile-ordering", description: "Streamline food & beverage ordering" },
      { title: "POS Integration", href: "#pos-integration", description: "Seamless point-of-sale connectivity" },
      { title: "Analytics Dashboard", href: "#analytics", description: "Real-time insights and reporting" },
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
      { title: "Case Studies", href: "#case-studies", description: "Success stories from our clients" },
      { title: "Documentation", href: "#docs", description: "Technical guides and API docs" },
      { title: "Support", href: "#support", description: "Get help when you need it" },
    ]
  },
  {
    title: "Pricing",
    href: "#pricing"
  },
  {
    title: "About",
    href: "#about"
  }
];

const ListItem = ({ title, href, description }: { title: string; href: string; description: string }) => (
  <li>
    <NavigationMenuLink asChild>
      <a
        href={href}
        className={cn(
          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        )}
      >
        <div className="text-sm font-medium leading-none">{title}</div>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {description}
        </p>
      </a>
    </NavigationMenuLink>
  </li>
);

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <Logo />
            </a>
          </div>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {item.children ? (
                    <>
                      <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
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
                        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
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
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button size="sm" className="group">
              Book a Demo
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-8">
                <div className="flex items-center justify-between">
                  <Logo />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>
                
                <nav className="flex flex-col space-y-4">
                  {navigationItems.map((item) => (
                    <div key={item.title}>
                      <a
                        href={item.href}
                        className="text-lg font-medium text-gray-900 hover:text-blue-600 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.title}
                      </a>
                      {item.children && (
                        <div className="ml-4 mt-2 space-y-2">
                          {item.children.map((child) => (
                            <a
                              key={child.title}
                              href={child.href}
                              className="block text-sm text-gray-600 hover:text-blue-600 transition-colors"
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
                
                <div className="flex flex-col space-y-2 pt-4 border-t">
                  <Button variant="ghost" className="justify-start">
                    Sign In
                  </Button>
                  <Button className="group">
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