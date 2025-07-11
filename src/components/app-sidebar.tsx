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
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Workshop {
  id: string;
  name: string;
  location: string;
  description: string;
}

const Ateliers = () => {
  const navigate = useNavigate();
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [form, setForm] = useState({ name: "", location: "", description: "" });

  const handleAdd = () => {
    if (!form.name || !form.location) return;
    setWorkshops(ws => [
      ...ws,
      {
        id: Date.now().toString(),
        name: form.name,
        location: form.location,
        description: form.description,
      },
    ]);
    setForm({ name: "", location: "", description: "" });
    setIsAddOpen(false);
  };

  return (
    <div className="space-y-8 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Liste des ateliers</h1>
        <Button className="bg-fleet-blue hover:bg-fleet-lightBlue" onClick={() => setIsAddOpen(true)}>
          Ajouter atelier
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Ateliers</CardTitle>
        </CardHeader>
        <CardContent>
          {workshops.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">Aucun atelier pour le moment.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Emplacement</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {workshops.map((w) => (
                  <TableRow
                    key={w.id}
                    className="cursor-pointer hover:bg-blue-50"
                    onClick={() => navigate(`/ateliers/${w.id}`)}
                  >
                    <TableCell>{w.name}</TableCell>
                    <TableCell>{w.location}</TableCell>
                    <TableCell>{w.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Ajouter un atelier</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="workshop-name">Nom de l'atelier</Label>
              <Input
                id="workshop-name"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="Ex: Atelier principal"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="workshop-location">Emplacement</Label>
              <Input
                id="workshop-location"
                value={form.location}
                onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                placeholder="Ex: Bâtiment A, Zone 1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="workshop-description">Description</Label>
              <Input
                id="workshop-description"
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                placeholder="Ex: Atelier dédié à la mécanique générale."
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddOpen(false)}>Annuler</Button>
            <Button
              className="bg-fleet-blue"
              onClick={handleAdd}
              disabled={!form.name || !form.location}
            >
              Ajouter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Ateliers;

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
    { title: "Atelier", icon: Hammer, path: "/atelier" },
    { title: "Mécaniciens", icon: HardHat, path: "/mecaniciens" },
    { title: "Gestion des alarmes", icon: Bell, path: "/alerts" },
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
        <div className="font-bold text-xl text-fleet-navy">fixfleet</div>
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
              {maintenanceMenuItems.map((item, idx) => {
                const isActive = getCurrentPath() === item.path;
                // Ajoute un label 'Alarmes' juste avant 'Gestion des alarmes'
                if (item.title === "Gestion des alarmes") {
                  return (
                    <React.Fragment key={item.title}>
                      <div className="text-fleet-gray px-2 py-1">Alarmes</div>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild className={`${isActive ? 'bg-fleet-blue text-white' : ''} hover:bg-fleet-lightBlue hover:text-white transition-colors`}>
                          <Link to={item.path} className="flex items-center">
                            <item.icon size={20} className="mr-2" />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </React.Fragment>
                  );
                }
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
