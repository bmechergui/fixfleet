import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { type Vehicle, VehicleDocument } from "@/types/vehicle";
import { VehicleDocuments } from "@/components/vehicles/VehicleDocuments";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash, FileText } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Vehicle {
  id: string;
  registrationNumber: string;
  brand: string;
  model: string;
  year: number;
  driver: string;
  group: string;
  status: "active" | "maintenance" | "inactive";
  kilometers: string;
  documents: VehicleDocument[];
}

const vehicles: Vehicle[] = [
  {
    id: "1",
    registrationNumber: "AB-123-CD",
    brand: "Renault",
    model: "Clio",
    year: 2021,
    driver: "Jean Dupont",
    group: "Commercial",
    status: "active",
    kilometers: "45000",
    documents: [
      {
        id: "1",
        name: "Assurance",
        expirationDate: "15/06/2025",
        status: "valid"
      },
      {
        id: "2",
        name: "Vignette",
        expirationDate: "31/12/2025",
        status: "to-renew"
      },
      {
        id: "3",
        name: "Contrôle technique",
        expirationDate: "20/05/2025",
        status: "valid"
      }
    ]
  },
  {
    id: "2",
    registrationNumber: "EF-456-GH",
    brand: "Peugeot",
    model: "308",
    year: 2020,
    driver: "Marie Martin",
    group: "Commercial",
    status: "active",
    kilometers: "32000",
    documents: []
  },
  {
    id: "3",
    registrationNumber: "IJ-789-KL",
    brand: "Citroën",
    model: "C3",
    year: 2022,
    driver: "Paul Bernard",
    group: "Service",
    status: "maintenance",
    kilometers: "28000",
    documents: []
  },
  {
    id: "4",
    registrationNumber: "MN-012-OP",
    brand: "Ford",
    model: "Transit",
    year: 2019,
    driver: "Sophie Petit",
    group: "Livraison",
    status: "active",
    kilometers: "65000",
    documents: []
  },
  {
    id: "5",
    registrationNumber: "QR-345-ST",
    brand: "Volkswagen",
    model: "Passat",
    year: 2021,
    driver: "Thomas Robert",
    group: "Direction",
    status: "active",
    kilometers: "38000",
    documents: []
  },
  {
    id: "6",
    registrationNumber: "UV-678-WX",
    brand: "Toyota",
    model: "Yaris",
    year: 2020,
    driver: "Émilie Durand",
    group: "Commercial",
    status: "inactive",
    kilometers: "42000",
    documents: []
  },
  {
    id: "7",
    registrationNumber: "YZ-901-AB",
    brand: "Renault",
    model: "Kangoo",
    year: 2018,
    driver: "Nicolas Moreau",
    group: "Service",
    status: "active",
    kilometers: "78000",
    documents: []
  },
  {
    id: "8",
    registrationNumber: "CD-234-EF",
    brand: "Mercedes",
    model: "Sprinter",
    year: 2022,
    driver: "Laure Simon",
    group: "Livraison",
    status: "maintenance",
    kilometers: "25000",
    documents: []
  }
];

const getStatusBadge = (status: Vehicle['status']) => {
  switch (status) {
    case "active":
      return <Badge variant="outline" className="border-fleet-green text-fleet-green">En service</Badge>;
    case "maintenance":
      return <Badge variant="outline" className="border-fleet-yellow text-fleet-yellow">En maintenance</Badge>;
    case "inactive":
      return <Badge variant="outline" className="border-fleet-red text-fleet-red">Hors service</Badge>;
    default:
      return null;
  }
};

export default function Vehicles() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);
  
  const filteredVehicles = vehicles.filter(vehicle => {
    const searchLower = searchTerm.toLowerCase();
    return (
      vehicle.registrationNumber.toLowerCase().includes(searchLower) ||
      vehicle.brand.toLowerCase().includes(searchLower) ||
      vehicle.model.toLowerCase().includes(searchLower) ||
      vehicle.driver.toLowerCase().includes(searchLower) ||
      vehicle.group.toLowerCase().includes(searchLower)
    );
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Gestion des véhicules</h1>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-fleet-blue hover:bg-fleet-lightBlue">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un véhicule
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Ajouter un nouveau véhicule</DialogTitle>
                <DialogDescription>
                  Saisissez les informations du véhicule à ajouter au parc.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="registration">Immatriculation</Label>
                    <Input id="registration" placeholder="AB-123-CD" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year">Année</Label>
                    <Input id="year" type="number" placeholder="2023" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="brand">Marque</Label>
                    <Input id="brand" placeholder="Renault" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="model">Modèle</Label>
                    <Input id="model" placeholder="Clio" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="driver">Chauffeur assigné</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un chauffeur" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="jean">Jean Dupont</SelectItem>
                        <SelectItem value="marie">Marie Martin</SelectItem>
                        <SelectItem value="paul">Paul Bernard</SelectItem>
                        <SelectItem value="none">Non assigné</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
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
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Statut</Label>
                  <Select defaultValue="active">
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">En service</SelectItem>
                      <SelectItem value="maintenance">En maintenance</SelectItem>
                      <SelectItem value="inactive">Hors service</SelectItem>
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
                  placeholder="Rechercher un véhicule..."
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
                    <TableHead>Immatriculation</TableHead>
                    <TableHead>Marque/Modèle</TableHead>
                    <TableHead>Année</TableHead>
                    <TableHead>Kilométrage</TableHead>
                    <TableHead>Documents</TableHead>
                    <TableHead>Chauffeur</TableHead>
                    <TableHead>Groupe</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVehicles.map((vehicle) => (
                    <TableRow key={vehicle.id}>
                      <TableCell className="font-medium">{vehicle.registrationNumber}</TableCell>
                      <TableCell>{vehicle.brand} {vehicle.model}</TableCell>
                      <TableCell>{vehicle.year}</TableCell>
                      <TableCell>{vehicle.kilometers} km</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedVehicleId(vehicle.id)}
                        >
                          <FileText className="h-4 w-4" />
                          <span className="ml-2">{vehicle.documents?.length || 0}</span>
                        </Button>
                      </TableCell>
                      <TableCell>{vehicle.driver}</TableCell>
                      <TableCell>{vehicle.group}</TableCell>
                      <TableCell>{getStatusBadge(vehicle.status)}</TableCell>
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

            {selectedVehicleId && (
              <div className="mt-8">
                <VehicleDocuments 
                  documents={vehicles.find(v => v.id === selectedVehicleId)?.documents || []} 
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
