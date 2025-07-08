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
  LogOut,
  Hammer,
  HardHat,
  BarChart3 as AnalyticsIcon,
  Users as UsersIcon
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
import { useAuth } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export function AppSidebar() {
  const { hasPermission } = useAuth();
  
  // Réorganisation des liens du menu principal
  const mainMenuItems = [
    { title: "Tableau de bord", icon: BarChart3, path: "/" },
  ];
  
  // Groupe de gestion de flotte - Ordre modifié: groupes, chauffeurs, véhicules
  const fleetMenuItems = [
    { title: "Groupes", icon: Users, path: "/groups" },
    { title: "Chauffeurs", icon: User, path: "/drivers" },
    { title: "Véhicules", icon: Car, path: "/vehicles" },
  ];
  
  // Groupe de maintenance - ordre : Maintenance, Planification, Atelier, Mécaniciens, Alertes
  const maintenanceMenuItems = [
    { title: "Maintenance", icon: Wrench, path: "/maintenance" },
    { title: "Planification", icon: Calendar, path: "/planning" },
    { title: "Atelier", icon: Hammer, path: "/atelier" },
    { title: "Mécaniciens", icon: HardHat, path: "/mecaniciens" },
    { title: "Alertes", icon: Bell, path: "/alerts" },
  ];
  
  // Autres liens
  const otherMenuItems = [
    { title: "Stock", icon: Package, path: "/inventory" },
    { title: "Finances", icon: CircleDollarSign, path: "/finances" },
    { title: "Analytics", icon: AnalyticsIcon, path: "/analytics" },
    { title: "Utilisateurs", icon: UsersIcon, path: "/users", permission: "users.read" },
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
                // Vérifier les permissions si nécessaire
                if (item.permission && !hasPermission(item.permission)) {
                  return null;
                }
                
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
