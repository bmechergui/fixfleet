
import {
  Car,
  BarChart3,
  User,
  Users,
  Wrench,
  Calendar,
  Bell,
  CircleDollarSign,
  Package,
  Settings,
  LogOut
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

export function AppSidebar() {
  // Réorganisation des liens du menu principal
  const mainMenuItems = [
    { title: "Tableau de bord", icon: BarChart3, path: "/" },
  ];
  
  // Groupe de gestion de flotte
  const fleetMenuItems = [
    { title: "Véhicules", icon: Car, path: "/vehicles" },
    { title: "Chauffeurs", icon: User, path: "/drivers" },
    { title: "Groupes", icon: Users, path: "/groups" },
  ];
  
  // Groupe de maintenance
  const maintenanceMenuItems = [
    { title: "Maintenance", icon: Wrench, path: "/maintenance" },
    { title: "Planification", icon: Calendar, path: "/planning" },
    { title: "Alertes", icon: Bell, path: "/alerts" },
  ];
  
  // Autres liens
  const otherMenuItems = [
    { title: "Stock", icon: Package, path: "/inventory" },
    { title: "Finances", icon: CircleDollarSign, path: "/finances" },
  ];

  const getCurrentPath = () => {
    return window.location.pathname;
  };
  
  return (
    <Sidebar>
      <SidebarHeader className="flex flex-col items-center justify-center p-4 border-b">
        <div className="font-bold text-xl text-fleet-navy">ELITE FLEET</div>
        <div className="text-xs text-fleet-gray mt-1">Gestion de parc automobile</div>
      </SidebarHeader>
      
      <SidebarContent className="px-3 py-4">
        {/* Menu principal */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => {
                const isActive = getCurrentPath() === item.path;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className={`${isActive ? 'bg-fleet-blue text-white' : ''} hover:bg-fleet-lightBlue hover:text-white transition-colors`}>
                      <Link to={item.path} className="flex items-center">
                        <item.icon size={20} className="mr-2" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        {/* Groupe Gestion de flotte */}
        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="text-fleet-gray px-2 py-1">
            Gestion de flotte
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {fleetMenuItems.map((item) => {
                const isActive = getCurrentPath() === item.path;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className={`${isActive ? 'bg-fleet-blue text-white' : ''} hover:bg-fleet-lightBlue hover:text-white transition-colors`}>
                      <Link to={item.path} className="flex items-center">
                        <item.icon size={20} className="mr-2" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        {/* Groupe Maintenance */}
        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="text-fleet-gray px-2 py-1">
            Maintenance
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {maintenanceMenuItems.map((item) => {
                const isActive = getCurrentPath() === item.path;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className={`${isActive ? 'bg-fleet-blue text-white' : ''} hover:bg-fleet-lightBlue hover:text-white transition-colors`}>
                      <Link to={item.path} className="flex items-center">
                        <item.icon size={20} className="mr-2" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        {/* Groupe Autres */}
        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="text-fleet-gray px-2 py-1">
            Autres
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {otherMenuItems.map((item) => {
                const isActive = getCurrentPath() === item.path;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className={`${isActive ? 'bg-fleet-blue text-white' : ''} hover:bg-fleet-lightBlue hover:text-white transition-colors`}>
                      <Link to={item.path} className="flex items-center">
                        <item.icon size={20} className="mr-2" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Admin</p>
              <p className="text-xs text-fleet-gray">admin@elitefleet.com</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Settings size={18} className="text-fleet-gray cursor-pointer hover:text-fleet-blue" />
            <LogOut size={18} className="text-fleet-gray cursor-pointer hover:text-fleet-red" />
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
