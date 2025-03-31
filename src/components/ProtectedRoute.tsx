
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireVerified?: boolean;
  requireTicket?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
  requireVerified = false,
  requireTicket = false,
}) => {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();

  if (loading) {
    // You could render a loading spinner here
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  // Not authenticated but authentication required
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // User authenticated but email not verified when verification is required
  if (requireVerified && user && !user.isEmailVerified) {
    return <Navigate to="/verify-email" state={{ email: user.email }} replace />;
  }

  // User authenticated and email verified but doesn't have ticket when ticket is required
  if (requireTicket && user && user.isEmailVerified && !user.hasTicket) {
    return <Navigate to="/tickets" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
