
import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash, Phone, Mail } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  license: string;
  group: string;
  status: "available" | "driving" | "off";
  vehicleAssigned?: string;
}

const drivers: Driver[] = [
  { id: "1", name: "Jean Dupont", email: "jean.dupont@example.com", phone: "01 23 45 67 89", license: "B", group: "Commercial", status: "driving", vehicleAssigned: "Renault Clio (AB-123-CD)" },
  { id: "2", name: "Marie Martin", email: "marie.martin@example.com", phone: "01 23 45 67 90", license: "B", group: "Commercial", status: "driving", vehicleAssigned: "Peugeot 308 (EF-456-GH)" },
  { id: "3", name: "Paul Bernard", email: "paul.bernard@example.com", phone: "01 23 45 67 91", license: "B, C", group: "Service", status: "available" },
  { id: "4", name: "Sophie Petit", email: "sophie.petit@example.com", phone: "01 23 45 67 92", license: "B", group: "Livraison", status: "driving", vehicleAssigned: "Ford Transit (MN-012-OP)" },
  { id: "5", name: "Thomas Robert", email: "thomas.robert@example.com", phone: "01 23 45 67 93", license: "B", group: "Direction", status: "driving", vehicleAssigned: "Volkswagen Passat (QR-345-ST)" },
  { id: "6", name: "Émilie Durand", email: "emilie.durand@example.com", phone: "01 23 45 67 94", license: "B", group: "Commercial", status: "off" },
  { id: "7", name: "Nicolas Moreau", email: "nicolas.moreau@example.com", phone: "01 23 45 67 95", license: "B, C, D", group: "Service", status: "driving", vehicleAssigned: "Renault Kangoo (YZ-901-AB)" },
];

const getStatusBadge = (status: Driver['status']) => {
  switch (status) {
    case "available":
      return <Badge variant="outline" className="border-fleet-green text-fleet-green">Disponible</Badge>;
    case "driving":
      return <Badge variant="outline" className="border-fleet-blue text-fleet-blue">En service</Badge>;
    case "off":
      return <Badge variant="outline" className="border-fleet-gray text-fleet-gray">Absent</Badge>;
    default:
      return null;
  }
};

export default function Drivers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredDrivers = drivers.filter(driver => {
    const searchLower = searchTerm.toLowerCase();
    return (
      driver.name.toLowerCase().includes(searchLower) ||
      driver.email.toLowerCase().includes(searchLower) ||
      driver.phone.includes(searchLower) ||
      driver.group.toLowerCase().includes(searchLower) ||
      (driver.vehicleAssigned && driver.vehicleAssigned.toLowerCase().includes(searchLower))
    );
  });

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Gestion des chauffeurs</h1>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-fleet-blue hover:bg-fleet-lightBlue">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un chauffeur
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Ajouter un nouveau chauffeur</DialogTitle>
                <DialogDescription>
                  Saisissez les informations du chauffeur à ajouter.
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
                    <Input id="email" type="email" placeholder="jean.dupont@example.com" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input id="phone" placeholder="01 23 45 67 89" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="license">Permis</Label>
                    <Input id="license" placeholder="B, C..." />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="group">Groupe</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un groupe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="commercial">Commercial</SelectItem>
                        <SelectItem value="service">Service</SelectItem>
                        <SelectItem value="livraison">Livraison</SelectItem>
                        <SelectItem value="direction">Direction</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Statut</Label>
                    <Select defaultValue="available">
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un statut" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Disponible</SelectItem>
                        <SelectItem value="driving">En service</SelectItem>
                        <SelectItem value="off">Absent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicle">Véhicule assigné (optionnel)</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un véhicule" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clio">Renault Clio (AB-123-CD)</SelectItem>
                      <SelectItem value="308">Peugeot 308 (EF-456-GH)</SelectItem>
                      <SelectItem value="transit">Ford Transit (MN-012-OP)</SelectItem>
                      <SelectItem value="none">Non assigné</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Annuler</Button>
                <Button className="bg-fleet-blue hover:bg-fleet-lightBlue" onClick={() => setIsAddDialogOpen(false)}>Ajouter</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un chauffeur..."
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
                    <TableHead>Chauffeur</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Permis</TableHead>
                    <TableHead>Groupe</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Véhicule assigné</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDrivers.map((driver) => (
                    <TableRow key={driver.id}>
                      <TableCell>
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src={`/placeholder.svg`} />
                            <AvatarFallback>{getInitials(driver.name)}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{driver.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="flex items-center text-xs text-fleet-gray">
                            <Mail className="h-3 w-3 mr-1" />
                            {driver.email}
                          </div>
                          <div className="flex items-center text-xs text-fleet-gray mt-1">
                            <Phone className="h-3 w-3 mr-1" />
                            {driver.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{driver.license}</TableCell>
                      <TableCell>{driver.group}</TableCell>
                      <TableCell>{getStatusBadge(driver.status)}</TableCell>
                      <TableCell>{driver.vehicleAssigned || "-"}</TableCell>
                      <TableCell>
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
                            <DropdownMenuItem className="cursor-pointer text-destructive">
                              <Trash className="h-4 w-4 mr-2" />
                              Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
