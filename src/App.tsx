
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FleetProvider } from "@/hooks/useFleet";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Vehicles from "./pages/Vehicles";
import Drivers from "./pages/Drivers";
import Maintenance from "./pages/Maintenance";
import Groups from "./pages/Groups";
import Alerts from "./pages/Alerts";
import Atelier from "./pages/Atelier";
import Mecaniciens from "./pages/Mecaniciens";
import Inventory from "./pages/Inventory";
import Finances from "./pages/Finances";
import Analytics from "./pages/Analytics";
import Users from "./pages/Users";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <FleetProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/drivers" element={<Drivers />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/atelier" element={<Atelier />} />
          <Route path="/mecaniciens" element={<Mecaniciens />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/finances" element={<Finances />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/users" element={<Users />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    </FleetProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
