
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import About from "./pages/About";
import Merchandise from "./pages/Merchandise";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import VerifyEmail from "./pages/VerifyEmail";
import NotFound from "./pages/NotFound";
import AuthCallback from "./pages/AuthCallback";
import PassCard from "./pages/PassCard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/merchandise" element={<Merchandise />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            
            {/* Email verification route */}
            <Route 
              path="/verify-email" 
              element={
                <ProtectedRoute requireAuth={true} requireVerified={false}>
                  <VerifyEmail />
                </ProtectedRoute>
              } 
            />
            
            {/* Requires authentication and email verification */}
            <Route 
              path="/tickets" 
              element={
                <ProtectedRoute requireAuth={true} requireVerified={true}>
                  <SignIn />
                </ProtectedRoute>
              } 
            />
            
            {/* Requires authentication, email verification, and ticket */}
            <Route 
              path="/pass" 
              element={
                <ProtectedRoute requireAuth={true} requireVerified={true} requireTicket={true}>
                  <PassCard />
                </ProtectedRoute>
              } 
            />
            
            {/* Aliases for backward compatibility */}
            <Route path="/signin" element={<Navigate to="/tickets" replace />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
