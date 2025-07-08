import React, { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { RoleBadge } from "@/components/auth/RoleBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash, Users as UsersIcon, Shield, UserCheck } from "lucide-react";
import { AuthService, ROLE_DEFINITIONS } from "@/services/authService";
import type { User, UserRole } from "@/types/auth";

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [users, setUsers] = useState<User[]>(AuthService.getAllUsers());

  const filteredUsers = users.filter(user => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.role.toLowerCase().includes(searchLower) ||
      (user.department && user.department.toLowerCase().includes(searchLower))
    );
  });

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase();
  };

  const getStatusBadge = (isActive: boolean) => {
    return isActive ? (
      <Badge className="bg-green-500">Actif</Badge>
    ) : (
      <Badge variant="destructive">Inactif</Badge>
    );
  };

  const roleStats = ROLE_DEFINITIONS.map(role => ({
    ...role,
    count: users.filter(u => u.role === role.role).length
  }));

  return (
    <DashboardLayout>
      <ProtectedRoute requiredPermissions={["users.read"]}>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">Gestion des utilisateurs</h1>
            <ProtectedRoute requiredPermissions={["users.write"]}>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-fleet-blue hover:bg-fleet-lightBlue">
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter un utilisateur
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px]">
                  <DialogHeader>
                    <DialogTitle>Ajouter un nouvel utilisateur</DialogTitle>
                    <DialogDescription>
                      Créer un nouveau compte utilisateur avec les permissions appropriées.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nom complet</Label>
                        <Input id="name" placeholder="Jean Dupont" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="jean.dupont@elitefleet.com" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="role">Rôle</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un rôle" />
                          </SelectTrigger>
                          <SelectContent>
                            {ROLE_DEFINITIONS.map((role) => (
                              <SelectItem key={role.role} value={role.role}>
                                {role.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="department">Département</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un département" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="it">IT</SelectItem>
                            <SelectItem value="gestion-parc">Gestion de Parc</SelectItem>
                            <SelectItem value="atelier">Atelier</SelectItem>
                            <SelectItem value="commercial">Commercial</SelectItem>
                            <SelectItem value="comptabilite">Comptabilité</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Annuler</Button>
                    <Button className="bg-fleet-blue hover:bg-fleet-lightBlue" onClick={() => setIsAddDialogOpen(false)}>Créer</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </ProtectedRoute>
          </div>

          {/* Statistiques des rôles */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {roleStats.map((role) => (
              <Card key={role.role}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{role.name}</CardTitle>
                  <Shield className="h-4 w-4" style={{ color: role.color }} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold" style={{ color: role.color }}>
                    {role.count}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    utilisateur{role.count > 1 ? 's' : ''}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="relative w-full max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher un utilisateur..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" className="ml-4">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtrer
                </Button>
              </div>
              
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Utilisateur</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Rôle</TableHead>
                      <TableHead>Département</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Dernière connexion</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{user.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <RoleBadge role={user.role} />
                        </TableCell>
                        <TableCell>{user.department || "-"}</TableCell>
                        <TableCell>{getStatusBadge(user.isActive)}</TableCell>
                        <TableCell>
                          {user.lastLogin 
                            ? new Date(user.lastLogin).toLocaleDateString('fr-FR')
                            : "Jamais"
                          }
                        </TableCell>
                        <TableCell>
                          <ProtectedRoute requiredPermissions={["users.write"]}>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem className="cursor-pointer">
                                  <Edit className="h-4 w-4 mr-2" />
                                  Modifier
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer">
                                  <UserCheck className="h-4 w-4 mr-2" />
                                  Permissions
                                </DropdownMenuItem>
                                <ProtectedRoute requiredPermissions={["users.delete"]}>
                                  <DropdownMenuItem className="cursor-pointer text-destructive">
                                    <Trash className="h-4 w-4 mr-2" />
                                    Supprimer
                                  </DropdownMenuItem>
                                </ProtectedRoute>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </ProtectedRoute>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </ProtectedRoute>
    </DashboardLayout>
  );
};

export default Users;