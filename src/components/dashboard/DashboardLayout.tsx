import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Bell, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { UserSwitcher } from "@/components/auth/UserSwitcher";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-slate-50">
        <AppSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white h-16 border-b flex items-center justify-between px-6">
            <div className="flex items-center">
              <SidebarTrigger>
                <Button size="icon" variant="ghost">
                  <Menu className="h-5 w-5" />
                </Button>
              </SidebarTrigger>
              <h1 className="ml-4 text-xl font-bold text-fleet-navy">Elite Fleet Management</h1>
            </div>
            <div className="flex items-center space-x-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="ghost" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1 right-1.5 w-2 h-2 bg-fleet-red rounded-full"></span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80 p-4">
                  <h3 className="font-semibold mb-2">Notifications</h3>
                  <div className="space-y-2">
                    <DropdownMenuItem className="flex flex-col items-start cursor-pointer">
                      <span className="font-medium">Maintenance requise</span>
                      <span className="text-sm text-muted-foreground">Renault Clio #V-1234 nécessite une vidange</span>
                      <span className="text-xs text-fleet-gray">Il y a 30 minutes</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex flex-col items-start cursor-pointer">
                      <span className="font-medium">Stock bas</span>
                      <span className="text-sm text-muted-foreground">Plaquettes de frein - Seuil d'alerte atteint</span>
                      <span className="text-xs text-fleet-gray">Il y a 2 heures</span>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              <UserSwitcher />
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}