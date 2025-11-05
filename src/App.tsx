import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import Header from "@/Header";
import Index from "./pages/Index";
import AdminAuth from "./pages/AdminAuth";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import useSmartlookPageViews from "@/hooks/useSmartlookPageViews";
import { Routes, Route } from "react-router-dom";

const queryClient = new QueryClient();

function RouterWithTracking() {
  // This hook will no-op if Smartlook isn't loaded; it requires Router context
  useSmartlookPageViews();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const headerHeight = 80;
    const additionalOffset = -80;
    const elementPosition = el.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerHeight - additionalOffset;
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  };

  return (
    <>
      <Header onScrollToSection={scrollToSection} />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/admin" element={<AdminAuth />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <div className="flex min-h-screen w-full flex-col">
        <BrowserRouter>
          <RouterWithTracking />
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
