
import React, { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Hammer, Wrench, Search, Filter, Car, CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFleetLogic } from "@/hooks/useFleetLogic";
import { VehicleStatusBadge } from "@/components/shared/VehicleStatusBadge";

interface Vehicle {
  id: string;
  name: string;
  licensePlate: string;
  status: "in-workshop" | "waiting" | "completed";
  entryDate: string;
  exitDate?: string;
  issue: string;
  assignedTo?: string;
  bay?: string;
}

const vehicles: Vehicle[] = [
  {
    id: "V-001",
    name: "Renault Clio",
    licensePlate: "AB-123-CD",
    status: "in-workshop",
    entryDate: "15/04/2025",
    issue: "Remplacement des plaquettes de frein",
    assignedTo: "Pierre Martin",
    bay: "A1"
  },
  {
    id: "V-002",
    name: "Peugeot 308",
    licensePlate: "EF-456-GH",
    status: "in-workshop",
    entryDate: "14/04/2025",
    issue: "Diagnostic système injection",
    assignedTo: "Sophie Durand",
    bay: "B2"
  },
  {
    id: "V-003",
    name: "Citroën C3",
    licensePlate: "IJ-789-KL",
    status: "waiting",
    entryDate: "16/04/2025",
    issue: "Vidange complète",
  },
  {
    id: "V-004",
    name: "Ford Transit",
    licensePlate: "MN-012-OP",
    status: "waiting",
    entryDate: "13/04/2025",
    issue: "Changement batterie",
  },
  {
    id: "V-005",
    name: "Toyota Yaris",
    licensePlate: "UV-678-WX",
    status: "completed",
    entryDate: "10/04/2025",
    exitDate: "12/04/2025",
    issue: "Réparation climatisation",
    assignedTo: "Jean Dubois"
  },
];

const getStatusBadge = (status: Vehicle['status']) => {
  switch (status) {
    case "in-workshop":
      return <Badge variant="outline" className="border-fleet-orange text-fleet-orange">En atelier</Badge>;
    case "waiting":
      return <Badge variant="outline" className="border-fleet-blue text-fleet-blue">En attente</Badge>;
    case "completed":
      return <Badge variant="outline" className="border-fleet-green text-fleet-green">Terminé</Badge>;
    default:
      return null;
  }
};

const Atelier = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);
  
  const { state, dispatch, stats } = useFleetLogic();

  // Fusionner les données des véhicules avec les maintenances en cours
  const vehiclesWithMaintenanceInfo = state.vehicles.map(vehicle => {
    const activeMaintenance = state.maintenanceRecords.find(
      m => m.vehicleId === vehicle.id && (m.status === "in-progress" || m.status === "planned")
    );
    const assignedMechanic = activeMaintenance?.mechanicId 
      ? state.mechanics.find(m => m.id === activeMaintenance.mechanicId)
      : null;
    
    return {
      ...vehicle,
      activeMaintenance,
      assignedMechanic: assignedMechanic?.name,
      issue: activeMaintenance?.description || "Aucune maintenance active",
      bay: activeMaintenance?.workshopBay
    };
  });

  const filteredVehicles = vehiclesWithMaintenanceInfo.filter(vehicle => {
    const matchesSearch = 
      `${vehicle.brand} ${vehicle.model}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.issue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (vehicle.assignedMechanic && vehicle.assignedMechanic.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (activeTab === "all") return matchesSearch;
    else if (activeTab === "in-workshop") return matchesSearch && vehicle.status === "in-workshop";
    else if (activeTab === "waiting") return matchesSearch && vehicle.status === "waiting";
    else if (activeTab === "completed") return matchesSearch && vehicle.status === "active";
    
    return matchesSearch;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Gestion de l'Atelier</h1>
          <Button className="bg-fleet-blue hover:bg-fleet-lightBlue">
            Plan de l'atelier
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Véhicules en atelier
              </CardTitle>
              <Wrench className="h-4 w-4 text-fleet-orange" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-fleet-orange">{stats.vehiclesInWorkshop}</div>
              <p className="text-xs text-muted-foreground mt-2">
                Emplacements occupés: {state.workshopBays.filter(b => b.status === "occupied").length}/{state.workshopBays.length}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                En attente
              </CardTitle>
              <Car className="h-4 w-4 text-fleet-blue" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-fleet-blue">{stats.vehiclesWaiting}</div>
              <p className="text-xs text-muted-foreground mt-2">
                Véhicules en file d'attente
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Sorties récentes
              </CardTitle>
              <CheckCircle2 className="h-4 w-4 text-fleet-green" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-fleet-green">{state.maintenanceRecords.filter(m => m.status === "completed").length}</div>
              <p className="text-xs text-muted-foreground mt-2">
                Maintenances terminées
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un véhicule..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-4 w-full md:w-auto">
                <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-4 w-full">
                    <TabsTrigger value="all">Tous</TabsTrigger>
                    <TabsTrigger value="in-workshop">En atelier</TabsTrigger>
                    <TabsTrigger value="waiting">En attente</TabsTrigger>
                    <TabsTrigger value="completed">Terminés</TabsTrigger>
                  </TabsList>
                </Tabs>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtrer
                </Button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Véhicule</TableHead>
                    <TableHead>Problème</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Date d'entrée</TableHead>
                    <TableHead>Date de sortie</TableHead>
                    <TableHead>Mécanicien</TableHead>
                    <TableHead>Emplacement</TableHead>
                    <TableHead className="w-[150px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVehicles.map((vehicle) => (
                    <TableRow key={vehicle.id}>
                      <TableCell className="font-medium">{vehicle.id}</TableCell>
                      <TableCell>{vehicle.brand} {vehicle.model} ({vehicle.registrationNumber})</TableCell>
                      <TableCell>{vehicle.issue}</TableCell>
                      <TableCell><VehicleStatusBadge status={vehicle.status} /></TableCell>
                      <TableCell>{vehicle.activeMaintenance?.date || "-"}</TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>{vehicle.assignedMechanic || "-"}</TableCell>
                      <TableCell>{vehicle.bay || "-"}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {vehicle.status === "waiting" && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-xs"
                              onClick={() => {
                                setSelectedVehicleId(vehicle.id);
                                setIsAssignDialogOpen(true);
                              }}
                            >
                              <ArrowRight className="h-3 w-3 mr-1" />
                              Assigner
                            </Button>
                          )}
                          {vehicle.status === "in-workshop" && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-xs text-fleet-green border-fleet-green"
                              onClick={() => {
                                if (vehicle.activeMaintenance) {
                                  dispatch({
                                    type: "COMPLETE_MAINTENANCE",
                                    payload: {
                                      maintenanceId: vehicle.activeMaintenance.id,
                                      cost: "0 €",
                                      actualDuration: 2
                                    }
                                  });
                                  dispatch({
                                    type: "UPDATE_VEHICLE_STATUS",
                                    payload: { vehicleId: vehicle.id, status: "active" }
                                  });
                                }
                              }}
                            >
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Terminer
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Assigner un véhicule à l'atelier</DialogTitle>
            <DialogDescription>
              {selectedVehicleId && (() => {
                const vehicle = state.vehicles.find(v => v.id === selectedVehicleId);
                return vehicle ? `Véhicule: ${vehicle.brand} ${vehicle.model} (${vehicle.registrationNumber})` : '';
              })()}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="bay">Emplacement dans l'atelier</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un emplacement" />
                </SelectTrigger>
                <SelectContent>
                  {state.workshopBays.filter(bay => bay.status === "free").map(bay => (
                    <SelectItem key={bay.id} value={bay.id}>{bay.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="mechanic">Mécanicien assigné</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un mécanicien" />
                </SelectTrigger>
                <SelectContent>
                  {state.mechanics.filter(mechanic => mechanic.status === "available").map(mechanic => (
                    <SelectItem key={mechanic.id} value={mechanic.id}>{mechanic.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes supplémentaires</Label>
              <Input id="notes" placeholder="Notes pour le mécanicien..." />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAssignDialogOpen(false)}>Annuler</Button>
            <Button className="bg-fleet-blue" onClick={() => setIsAssignDialogOpen(false)}>Assigner</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Atelier;
