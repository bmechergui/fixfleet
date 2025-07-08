import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import type { Permission, UserRole } from '@/types/auth';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermissions?: Permission[];
  requiredRoles?: UserRole[];
  fallback?: React.ReactNode;
}

export function ProtectedRoute({ 
  children, 
  requiredPermissions = [], 
  requiredRoles = [],
  fallback 
}: ProtectedRouteProps) {
  const { user, isAuthenticated, hasPermission } = useAuth();

  if (!isAuthenticated || !user) {
    return fallback || (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Vous devez être connecté pour accéder à cette page.
        </AlertDescription>
      </Alert>
    );
  }

  // Vérifier les permissions requises
  if (requiredPermissions.length > 0) {
    const hasAllPermissions = requiredPermissions.every(permission => 
      hasPermission(permission)
    );
    
    if (!hasAllPermissions) {
      return fallback || (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Vous n'avez pas les permissions nécessaires pour accéder à cette page.
          </AlertDescription>
        </Alert>
      );
    }
  }

  // Vérifier les rôles requis
  if (requiredRoles.length > 0) {
    const hasRequiredRole = requiredRoles.includes(user.role);
    
    if (!hasRequiredRole) {
      return fallback || (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Votre rôle ne vous permet pas d'accéder à cette page.
          </AlertDescription>
        </Alert>
      );
    }
  }

  return <>{children}</>;
}