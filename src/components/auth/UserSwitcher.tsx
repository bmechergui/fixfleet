import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { AuthService } from '@/services/authService';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, User, LogOut, Settings } from 'lucide-react';

export function UserSwitcher() {
  const { user, switchUser, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const allUsers = AuthService.getAllUsers();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const getRoleColor = (role: string) => {
    return AuthService.getRoleColor(role as any);
  };

  const getRoleName = (role: string) => {
    return AuthService.getRoleName(role as any);
  };

  if (!user) return null;

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 h-auto p-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium">{user.name}</span>
            <Badge 
              variant="outline" 
              className="text-xs"
              style={{ borderColor: getRoleColor(user.role), color: getRoleColor(user.role) }}
            >
              {getRoleName(user.role)}
            </Badge>
          </div>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-80" align="end">
        <DropdownMenuLabel>Utilisateur actuel</DropdownMenuLabel>
        <div className="px-2 py-1.5">
          <div className="flex items-center gap-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium">{user.name}</span>
              <span className="text-sm text-muted-foreground">{user.email}</span>
              <Badge 
                variant="outline" 
                className="text-xs w-fit mt-1"
                style={{ borderColor: getRoleColor(user.role), color: getRoleColor(user.role) }}
              >
                {getRoleName(user.role)}
              </Badge>
            </div>
          </div>
        </div>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuLabel>Changer d'utilisateur (Demo)</DropdownMenuLabel>
        {allUsers
          .filter(u => u.id !== user.id)
          .map((demoUser) => (
            <DropdownMenuItem
              key={demoUser.id}
              onClick={() => {
                switchUser(demoUser.id);
                setIsOpen(false);
              }}
              className="cursor-pointer"
            >
              <div className="flex items-center gap-2 w-full">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={demoUser.avatar} />
                  <AvatarFallback className="text-xs">
                    {getInitials(demoUser.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col flex-1">
                  <span className="text-sm">{demoUser.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {getRoleName(demoUser.role)}
                  </span>
                </div>
              </div>
            </DropdownMenuItem>
          ))}
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem className="cursor-pointer">
          <Settings className="h-4 w-4 mr-2" />
          Paramètres
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => logout()}
          className="cursor-pointer text-red-600"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Se déconnecter
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}