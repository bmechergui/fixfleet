
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
import { Textarea } from "@/components/ui/textarea";
import { Plus, Search, Filter, MoreHorizontal, Edit, FileText, Clock, CheckCircle2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Maintenance {
  id: string;
  type: string;
  vehicle: string;
  date: string;
  dueDate?: string;
  status: "planned" | "in-progress" | "completed";
  mechanic: string;
  description: string;
  cost?: string;
}

const maintenances: Maintenance[] = [
  { 
    id: "1", 
    type: "Vidange", 
    vehicle: "Renault Clio (AB-123-CD)", 
    date: "15/04/2025", 
    status: "completed", 
    mechanic: "Pierre Martin",
    description: "Vidange complète avec remplacement du filtre à huile.",
    cost: "120 €"
  },
  { 
    id: "2", 
    type: "Remplacement plaquettes", 
    vehicle: "Peugeot 308 (EF-456-GH)", 
    date: "14/04/2025", 
    status: "completed", 
    mechanic: "Sophie Durand",
    description: "Remplacement des plaquettes de frein avant et arrière.",
    cost: "230 €"
  },
  { 
    id: "3", 
    type: "Contrôle technique", 
    vehicle: "Citroën C3 (IJ-789-KL)", 
    date: "16/04/2025", 
    status: "in-progress", 
    mechanic: "Jean Dubois",
    description: "Contrôle technique réglementaire.",
    cost: "85 €"
  },
  { 
    id: "4", 
    type: "Changement batterie", 
    vehicle: "Ford Transit (MN-012-OP)", 
    date: "18/04/2025", 
    status: "planned", 
    mechanic: "Marie Lambert",
    description: "Remplacement de la batterie défectueuse."
  },
  { 
    id: "5", 
    type: "Révision générale", 
    vehicle: "Volkswagen Passat (QR-345-ST)", 
    date: "20/04/2025", 
    status: "planned", 
    mechanic: "Non assigné",
    description: "Révision générale aux 30 000 km."
  },
  { 
    id: "6", 
    type: "Réparation climatisation", 
    vehicle: "Toyota Yaris (UV-678-WX)", 
    date: "12/04/2025", 
    status: "completed", 
    mechanic: "Pierre Martin",
    description: "Recharge de gaz et réparation du système de climatisation.",
    cost: "180 €"
  },
];

const getStatusBadge = (status: Maintenance['status']) => {
  switch (status) {
    case "planned":
      return <Badge variant="outline" className="border-fleet-blue text-fleet-blue">Planifié</Badge>;
    case "in-progress":
      return <Badge variant="outline" className="border-fleet-orange text-fleet-orange">En cours</Badge>;
    case "completed":
      return <Badge variant="outline" className="border-fleet-green text-fleet-green">Terminé</Badge>;
    default:
      return null;
  }
};

export default function Maintenance() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredMaintenances = maintenances.filter(maintenance => {
    const matchesSearch = 
      maintenance.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      maintenance.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      maintenance.mechanic.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    else if (activeTab === "planned") return matchesSearch && maintenance.status === "planned";
    else if (activeTab === "in-progress") return matchesSearch && maintenance.status === "in-progress";
    else if (activeTab === "completed") return matchesSearch && maintenance.status === "completed";
    
    return matchesSearch;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Gestion des maintenances</h1>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-fleet-blue hover:bg-fleet-lightBlue">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter une maintenance
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Planifier une maintenance</DialogTitle>
                <DialogDescription>
                  Remplissez les détails pour planifier une nouvelle maintenance.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Type d'entretien</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vidange">Vidange</SelectItem>
                        <SelectItem value="controle">Contrôle technique</SelectItem>
                        <SelectItem value="frein">Remplacement des freins</SelectItem>
                        <SelectItem value="pneu">Changement de pneus</SelectItem>
                        <SelectItem value="revision">Révision générale</SelectItem>
                        <SelectItem value="autre">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vehicle">Véhicule</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un véhicule" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="clio">Renault Clio (AB-123-CD)</SelectItem>
                        <SelectItem value="308">Peugeot 308 (EF-456-GH)</SelectItem>
                        <SelectItem value="c3">Citroën C3 (IJ-789-KL)</SelectItem>
                        <SelectItem value="transit">Ford Transit (MN-012-OP)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date planifiée</Label>
                    <Input type="date" id="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mechanic">Mécanicien assigné</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un mécanicien" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pierre">Pierre Martin</SelectItem>
                        <SelectItem value="sophie">Sophie Durand</SelectItem>
                        <SelectItem value="jean">Jean Dubois</SelectItem>
                        <SelectItem value="marie">Marie Lambert</SelectItem>
                        <SelectItem value="none">Non assigné</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Détails des travaux à effectuer..."
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Statut</Label>
                  <Select defaultValue="planned">
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="planned">Planifié</SelectItem>
                      <SelectItem value="in-progress">En cours</SelectItem>
                      <SelectItem value="completed">Terminé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Annuler</Button>
                <Button className="bg-fleet-blue hover:bg-fleet-lightBlue" onClick={() => setIsAddDialogOpen(false)}>Planifier</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher une maintenance..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-4 w-full md:w-auto">
                <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-4 w-full">
                    <TabsTrigger value="all">Tous</TabsTrigger>
                    <TabsTrigger value="planned">Planifiés</TabsTrigger>
                    <TabsTrigger value="in-progress">En cours</TabsTrigger>
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
                    <TableHead>Type</TableHead>
                    <TableHead>Véhicule</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Mécanicien</TableHead>
                    <TableHead>Coût</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMaintenances.map((maintenance) => (
                    <TableRow key={maintenance.id}>
                      <TableCell className="font-medium">{maintenance.type}</TableCell>
                      <TableCell>{maintenance.vehicle}</TableCell>
                      <TableCell>{maintenance.date}</TableCell>
                      <TableCell>{getStatusBadge(maintenance.status)}</TableCell>
                      <TableCell>{maintenance.mechanic}</TableCell>
                      <TableCell>{maintenance.cost || "-"}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" title="Voir les détails">
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="Modifier">
                            <Edit className="h-4 w-4" />
                          </Button>
                          {maintenance.status !== "completed" && (
                            <Button variant="ghost" size="icon" title="Marquer comme terminé">
                              <CheckCircle2 className="h-4 w-4 text-fleet-green" />
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
    </DashboardLayout>
  );
}
