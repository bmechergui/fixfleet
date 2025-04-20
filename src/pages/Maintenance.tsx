import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { MaintenanceForm } from "@/components/maintenance/MaintenanceForm";
import { MaintenanceTable } from "@/components/maintenance/MaintenanceTable";
import { MaintenanceFilters } from "@/components/maintenance/MaintenanceFilters";
import type { Maintenance as MaintenanceType } from "@/types/maintenance";

const maintenances: MaintenanceType[] = [
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

export default function Maintenance() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

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
              <MaintenanceForm />
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Annuler
                </Button>
                <Button 
                  className="bg-fleet-blue hover:bg-fleet-lightBlue" 
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Planifier
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <Card>
          <CardContent className="p-6">
            <MaintenanceFilters 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
            <div className="overflow-x-auto">
              <MaintenanceTable maintenances={filteredMaintenances} />
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
