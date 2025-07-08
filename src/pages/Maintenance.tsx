import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, BarChart3, FileText, CheckCircle2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MaintenanceForm } from "@/components/maintenance/MaintenanceForm";
import { MaintenanceTable } from "@/components/maintenance/MaintenanceTable";
import { MaintenanceFilters } from "@/components/maintenance/MaintenanceFilters";
import { QuickActions } from "@/components/maintenance/QuickActions";
import { MaintenanceRequestForm } from "@/components/maintenance/MaintenanceRequestForm";
import { EisenhowerMatrix } from "@/components/maintenance/EisenhowerMatrix";
import { WorkOrderCreation } from "@/components/maintenance/WorkOrderCreation";
import { TaskTracker } from "@/components/maintenance/TaskTracker";
import { useFleet } from "@/hooks/useFleet";
import { toast } from "@/hooks/use-toast";
import type { Maintenance as MaintenanceType } from "@/types/maintenance";
import type { MaintenanceRecord, WorkOrder } from "@/types/shared";

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
  const [selectedMaintenanceId, setSelectedMaintenanceId] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<"list" | "request" | "analysis" | "planning" | "work-order" | "tracking">("list");
  const [selectedMaintenanceForWorkflow, setSelectedMaintenanceForWorkflow] = useState<MaintenanceRecord | null>(null);
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);
  
  const { state, dispatch, stats } = useFleet();

  const filteredMaintenances = state.maintenanceRecords.filter(maintenance => {
    const matchesSearch = 
      maintenance.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      maintenance.vehicleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (maintenance.mechanicName && maintenance.mechanicName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      maintenance.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    else if (activeTab === "planned") return matchesSearch && maintenance.status === "planned";
    else if (activeTab === "in-progress") return matchesSearch && maintenance.status === "in-progress";
    else if (activeTab === "completed") return matchesSearch && maintenance.status === "completed";
    
    return matchesSearch;
  });

  const handleNewRequest = (request: any) => {
    const eisenhowerCategory = 
      request.isUrgent && request.isImportant ? "urgent-important" :
      !request.isUrgent && request.isImportant ? "important-not-urgent" :
      request.isUrgent && !request.isImportant ? "urgent-not-important" :
      "not-urgent-not-important";

    const newMaintenance: Omit<MaintenanceRecord, "id"> = {
      type: request.type,
      vehicleId: request.vehicleId,
      vehicleName: state.vehicles.find(v => v.id === request.vehicleId)?.brand + " " + 
                   state.vehicles.find(v => v.id === request.vehicleId)?.model + " (" +
                   state.vehicles.find(v => v.id === request.vehicleId)?.registrationNumber + ")" || "",
      date: new Date().toLocaleDateString('fr-FR'),
      status: "planned",
      description: request.description,
      category: "corrective",
      isUrgent: request.isUrgent,
      isImportant: request.isImportant,
      eisenhowerCategory,
      requestedBy: request.requestedBy,
      requestDate: new Date().toLocaleDateString('fr-FR'),
      workflowStage: "analysis"
    };

    dispatch({ type: "CREATE_MAINTENANCE", payload: newMaintenance });
    
    toast({
      title: "Demande créée",
      description: "La demande de maintenance a été enregistrée et analysée selon la matrice d'Eisenhower"
    });
    
    setCurrentView("analysis");
  };

  const handleSelectMaintenanceFromMatrix = (maintenance: MaintenanceRecord) => {
    setSelectedMaintenanceForWorkflow(maintenance);
    setCurrentView("planning");
  };

  const handlePlanFromMatrix = (maintenanceId: string) => {
    const maintenance = state.maintenanceRecords.find(m => m.id === maintenanceId);
    if (maintenance) {
      setSelectedMaintenanceForWorkflow(maintenance);
      setCurrentView("work-order");
    }
  };

  const handleCreateWorkOrder = (workOrderData: Omit<WorkOrder, "id" | "createdAt">) => {
    const newWorkOrder: WorkOrder = {
      ...workOrderData,
      id: `WO-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    
    setWorkOrders([...workOrders, newWorkOrder]);
    
    // Mettre à jour la maintenance avec l'OT
    if (selectedMaintenanceForWorkflow) {
      dispatch({
        type: "UPDATE_MAINTENANCE",
        payload: {
          id: selectedMaintenanceForWorkflow.id,
          updates: {
            workOrder: newWorkOrder,
            workflowStage: "execution"
          }
        }
      });
    }
    
    toast({
      title: "Ordre de travail créé",
      description: "L'OT a été généré avec succès"
    });
    
    setCurrentView("tracking");
  };

  const handleUpdateTask = (taskId: string, updates: any) => {
    if (selectedMaintenanceForWorkflow?.workOrder) {
      const updatedTasks = selectedMaintenanceForWorkflow.workOrder.tasks.map(task =>
        task.id === taskId ? { ...task, ...updates } : task
      );
      
      const updatedWorkOrder = {
        ...selectedMaintenanceForWorkflow.workOrder,
        tasks: updatedTasks
      };
      
      dispatch({
        type: "UPDATE_MAINTENANCE",
        payload: {
          id: selectedMaintenanceForWorkflow.id,
          updates: { workOrder: updatedWorkOrder }
        }
      });
    }
  };

  const handleCompleteWorkOrder = () => {
    if (selectedMaintenanceForWorkflow) {
      dispatch({
        type: "UPDATE_MAINTENANCE",
        payload: {
          id: selectedMaintenanceForWorkflow.id,
          updates: {
            status: "completed",
            workflowStage: "closure"
          }
        }
      });
      
      toast({
        title: "OT terminé",
        description: "L'ordre de travail a été clôturé avec succès"
      });
      
      setCurrentView("list");
      setSelectedMaintenanceForWorkflow(null);
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "request":
        return (
          <MaintenanceRequestForm
            onSubmit={handleNewRequest}
            vehicles={state.vehicles}
          />
        );
      
      case "analysis":
        return (
          <EisenhowerMatrix
            maintenances={state.maintenanceRecords.filter(m => m.workflowStage === "analysis")}
            onSelectMaintenance={handleSelectMaintenanceFromMatrix}
            onPlanMaintenance={handlePlanFromMatrix}
          />
        );
      
      case "work-order":
        return selectedMaintenanceForWorkflow ? (
          <WorkOrderCreation
            maintenance={selectedMaintenanceForWorkflow}
            onCreateWorkOrder={handleCreateWorkOrder}
            mechanics={state.mechanics}
          />
        ) : null;
      
      case "tracking":
        return selectedMaintenanceForWorkflow?.workOrder ? (
          <TaskTracker
            workOrder={selectedMaintenanceForWorkflow.workOrder}
            onUpdateTask={handleUpdateTask}
            onCompleteWorkOrder={handleCompleteWorkOrder}
          />
        ) : null;
      
      default:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <MaintenanceFilters 
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                  />
                  <div className="overflow-x-auto">
                    <MaintenanceTable 
                      maintenances={filteredMaintenances} 
                      onSelectMaintenance={setSelectedMaintenanceId}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-4">
              {selectedMaintenanceId && (
                <QuickActions 
                  maintenanceId={selectedMaintenanceId}
                  vehicleId={state.maintenanceRecords.find(m => m.id === selectedMaintenanceId)?.vehicleId}
                />
              )}
              
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Maintenances planifiées</span>
                      <span className="font-semibold">{stats.plannedMaintenances}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">En cours</span>
                      <span className="font-semibold text-fleet-orange">{stats.inProgressMaintenances}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Mécaniciens disponibles</span>
                      <span className="font-semibold text-fleet-green">{stats.availableMechanics}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Postes libres</span>
                      <span className="font-semibold text-fleet-blue">{stats.freeWorkshopBays}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Gestion des maintenances</h1>
          <div className="flex gap-2">
            <Button 
              variant={currentView === "request" ? "default" : "outline"}
              onClick={() => setCurrentView("request")}
              className={currentView === "request" ? "bg-fleet-blue hover:bg-fleet-lightBlue" : ""}
            >
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle demande
            </Button>
            <Button 
              variant={currentView === "analysis" ? "default" : "outline"}
              onClick={() => setCurrentView("analysis")}
              className={currentView === "analysis" ? "bg-fleet-blue hover:bg-fleet-lightBlue" : ""}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Analyse
            </Button>
            <Button 
              variant={currentView === "list" ? "default" : "outline"}
              onClick={() => setCurrentView("list")}
              className={currentView === "list" ? "bg-fleet-blue hover:bg-fleet-lightBlue" : ""}
            >
              <FileText className="h-4 w-4 mr-2" />
              Liste
            </Button>
          </div>
        </div>
        
        {renderCurrentView()}
      </div>
    </DashboardLayout>
  );
}