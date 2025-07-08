import React from 'react';
import { Badge } from '@/components/ui/badge';
import { AuthService } from '@/services/authService';
import type { UserRole } from '@/types/auth';

interface RoleBadgeProps {
  role: UserRole;
  variant?: "default" | "secondary" | "destructive" | "outline";
}

export function RoleBadge({ role, variant = "outline" }: RoleBadgeProps) {
  const roleDefinition = AuthService.getRoleDefinition(role);
  
  if (!roleDefinition) {
    return <Badge variant={variant}>{role}</Badge>;
  }

  return (
    <Badge 
      variant={variant}
      className={variant === "outline" ? "" : ""}
      style={
        variant === "outline" 
          ? { 
              borderColor: roleDefinition.color, 
              color: roleDefinition.color 
            }
          : { 
              backgroundColor: roleDefinition.color,
              color: "white"
            }
      }
    >
      {roleDefinition.name}
    </Badge>
  );
}