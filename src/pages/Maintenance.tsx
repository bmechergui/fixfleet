
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
import { Plus, Search, Filter, FileText, Edit, CheckCircle2, Calendar, Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface Maintenance {
  id: string;
  type: string;
  vehicle: string;
  date: string;
  dueDate?: string;
  status: "planned" | "in-progress" | "completed";
  mechanic: string;
  description: string;
  category: "preventive" | "corrective" | "periodic" | "predictive";
  basedOn?: "kilometers" | "time";
  kilometers?: string;
  periodicity?: string;
  nextDate?: string;
  cost?: string;
}

const maintenances: Maintenance[] = [
  { 
    id: "M-001", 
    type: "Vidange", 
    vehicle: "Renault Clio (AB-123-CD)", 
    date: "15/04/2025", 
    status: "completed", 
    mechanic: "Pierre Martin",
    description: "Vidange complète avec remplacement du filtre à huile.",
    category: "preventive",
    basedOn: "kilometers",
    kilometers: "10000",
    cost: "120 €"
  },
  { 
    id: "M-002", 
    type: "Remplacement plaquettes", 
    vehicle: "Peugeot 308 (EF-456-GH)", 
    date: "14/04/2025", 
    status: "completed", 
    mechanic: "Sophie Durand",
    description: "Remplacement des plaquettes de frein avant et arrière.",
    category: "corrective",
    cost: "230 €"
  },
  { 
    id: "M-003", 
    type: "Contrôle technique", 
    vehicle: "Citroën C3 (IJ-789-KL)", 
    date: "16/04/2025", 
    status: "in-progress", 
    mechanic: "Jean Dubois",
    description: "Contrôle technique réglementaire.",
    category: "periodic",
    periodicity: "2 ans",
    nextDate: "16/04/2027",
    cost: "85 €"
  },
  { 
    id: "M-004", 
    type: "Changement batterie", 
    vehicle: "Ford Transit (MN-012-OP)", 
    date: "18/04/2025", 
    status: "planned", 
    mechanic: "Marie Lambert",
    description: "Remplacement de la batterie défectueuse.",
    category: "corrective"
  },
  { 
    id: "M-005", 
    type: "Révision générale", 
    vehicle: "Volkswagen Passat (QR-345-ST)", 
    date: "20/04/2025", 
    status: "planned", 
    mechanic: "Non assigné",
    description: "Révision générale aux 30 000 km.",
    category: "preventive",
    basedOn: "kilometers",
    kilometers: "30000"
  },
  { 
    id: "M-006", 
    type: "Réparation climatisation", 
    vehicle: "Toyota Yaris (UV-678-WX)", 
    date: "12/04/2025", 
    status: "completed", 
    mechanic: "Pierre Martin",
    description: "Recharge de gaz et réparation du système de climatisation.",
    category: "corrective",
    cost: "180 €"
  },
  { 
    id: "M-007", 
    type: "Remplacement pneus", 
    vehicle: "Renault Clio (AB-123-CD)", 
    date: "25/04/2025", 
    status: "planned", 
    mechanic: "Sophie Durand",
    description: "Remplacement des pneus avant et arrière.",
    category: "preventive",
    basedOn: "kilometers",
    kilometers: "40000"
  },
  { 
    id: "M-008", 
    type: "Diagnostic système", 
    vehicle: "Peugeot 3008 (YZ-901-AB)", 
    date: "22/04/2025", 
    status: "planned", 
    mechanic: "Jean Dubois",
    description: "Diagnostic suite à alertes du système d'injection.",
    category: "predictive",
    nextDate: "22/04/2025"
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

const getCategoryBadge = (category: Maintenance['category']) => {
  switch (category) {
    case "preventive":
      return <Badge variant="outline" className="border-green-500 text-green-500">Préventive</Badge>;
    case "corrective":
      return <Badge variant="outline" className="border-red-500 text-red-500">Corrective</Badge>;
    case "periodic":
      return <Badge variant="outline" className="border-blue-500 text-blue-500">Périodique</Badge>;
    case "predictive":
      return <Badge variant="outline" className="border-purple-500 text-purple-500">Prédictive</Badge>;
    default:
      return null;
  }
};

export default function Maintenance() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Maintenance['category']>("preventive");
  const [basedOn, setBasedOn] = useState<"kilometers" | "time">("kilometers");
  const form = useForm();

  const filteredMaintenances = maintenances.filter(maintenance => {
    const matchesSearch = 
      maintenance.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      maintenance.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      maintenance.mechanic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      maintenance.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    else if (activeTab === "planned") return matchesSearch && maintenance.status === "planned";
    else if (activeTab === "in-progress") return matchesSearch && maintenance.status === "in-progress";
    else if (activeTab === "completed") return matchesSearch && maintenance.status === "completed";
    
    return matchesSearch;
  });

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value as Maintenance['category']);
  };

  const handleBasedOnChange = (value: string) => {
    setBasedOn(value as "kilometers" | "time");
  };

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
            <DialogContent className="sm:max-w-[650px]">
              <DialogHeader>
                <DialogTitle>Planifier une maintenance</DialogTitle>
                <DialogDescription>
                  Remplissez les détails pour planifier une nouvelle maintenance.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="id">ID</Label>
                    <Input id="id" placeholder="ID unique" disabled value="M-XXX" />
                    <p className="text-xs text-muted-foreground">Attribué automatiquement</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom</Label>
                    <Input id="name" placeholder="Nom de la maintenance" />
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
                  <Label>Catégorie</Label>
                  <ToggleGroup type="single" value={selectedCategory} onValueChange={handleCategoryChange} className="flex flex-wrap gap-2">
                    <ToggleGroupItem value="preventive" className="data-[state=on]:bg-green-100 data-[state=on]:text-green-700 data-[state=on]:border-green-300">
                      Préventive
                    </ToggleGroupItem>
                    <ToggleGroupItem value="corrective" className="data-[state=on]:bg-red-100 data-[state=on]:text-red-700 data-[state=on]:border-red-300">
                      Corrective
                    </ToggleGroupItem>
                    <ToggleGroupItem value="periodic" className="data-[state=on]:bg-blue-100 data-[state=on]:text-blue-700 data-[state=on]:border-blue-300">
                      Périodique
                    </ToggleGroupItem>
                    <ToggleGroupItem value="predictive" className="data-[state=on]:bg-purple-100 data-[state=on]:text-purple-700 data-[state=on]:border-purple-300">
                      Prédictive
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
                
                {selectedCategory === "preventive" && (
                  <div className="space-y-3 border p-3 rounded-md">
                    <Label>Basée sur</Label>
                    <RadioGroup defaultValue="kilometers" className="flex space-x-4" onValueChange={handleBasedOnChange}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="kilometers" id="r1" />
                        <Label htmlFor="r1">Kilométrage</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="time" id="r2" />
                        <Label htmlFor="r2">Temps (date)</Label>
                      </div>
                    </RadioGroup>
                    
                    {basedOn === "kilometers" ? (
                      <div className="space-y-2 mt-2">
                        <Label htmlFor="kilometers">Kilométrage</Label>
                        <Input id="kilometers" type="number" placeholder="Ex: 10000" />
                      </div>
                    ) : (
                      <div className="space-y-2 mt-2">
                        <Label htmlFor="time">Date</Label>
                        <Input id="time" type="date" />
                      </div>
                    )}
                  </div>
                )}
                
                {selectedCategory === "periodic" && (
                  <div className="space-y-3 border p-3 rounded-md">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="periodicity">Périodicité</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1m">1 mois</SelectItem>
                            <SelectItem value="3m">3 mois</SelectItem>
                            <SelectItem value="6m">6 mois</SelectItem>
                            <SelectItem value="1y">1 an</SelectItem>
                            <SelectItem value="2y">2 ans</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="nextDate">Prochaine date</Label>
                        <Input id="nextDate" type="date" />
                      </div>
                    </div>
                  </div>
                )}
                
                {selectedCategory === "predictive" && (
                  <div className="space-y-2 border p-3 rounded-md">
                    <Label htmlFor="sensorData">Basée sur des données capteurs</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un type d'alerte" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="engine">Anomalie moteur</SelectItem>
                        <SelectItem value="brakes">Usure des freins</SelectItem>
                        <SelectItem value="battery">État de la batterie</SelectItem>
                        <SelectItem value="fuel">Consommation carburant</SelectItem>
                        <SelectItem value="custom">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4">
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
                  <div className="space-y-2">
                    <Label htmlFor="date">Date planifiée</Label>
                    <Input id="date" type="date" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
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
                
                {/* Coût uniquement si completed */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="completed" />
                    <label
                      htmlFor="completed"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Intervention terminée
                    </label>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cost">Coût (si terminé)</Label>
                  <div className="relative">
                    <Input id="cost" placeholder="Ex: 120" />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <span className="text-gray-500">€</span>
                    </div>
                  </div>
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
                    <TableHead>ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Véhicule</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Catégorie</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Mécanicien</TableHead>
                    <TableHead>Coût</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMaintenances.map((maintenance) => (
                    <TableRow key={maintenance.id}>
                      <TableCell className="font-medium">{maintenance.id}</TableCell>
                      <TableCell>{maintenance.type}</TableCell>
                      <TableCell>{maintenance.vehicle}</TableCell>
                      <TableCell>{maintenance.date}</TableCell>
                      <TableCell>{getCategoryBadge(maintenance.category)}</TableCell>
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
