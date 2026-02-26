import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddAchievement from "./pages/AddAchievement";
import Records from "./pages/Records";
import Portfolio from "./pages/Portfolio";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Leaderboard from "./pages/Leaderboard";
import Analytics from "./pages/Analytics";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import FacultyDashboard from "./pages/FacultyDashboard";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add" element={<AddAchievement />} />
            <Route path="/records" element={<Records />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/faculty" element={<FacultyDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
