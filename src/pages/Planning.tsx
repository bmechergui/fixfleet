
import React, { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, FileText, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar as ShadcnCalendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useFleetLogic } from "@/hooks/useFleetLogic";
import { toast } from "@/hooks/use-toast";

const Planning = () => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState("");
  const [selectedMechanicId, setSelectedMechanicId] = useState("");
  const [selectedWorkshopBayId, setSelectedWorkshopBayId] = useState("");
  const [selectedMaintenanceId, setSelectedMaintenanceId] = useState("");
  const [planningDate, setPlanningDate] = useState("");
  const [planningTime, setPlanningTime] = useState("09:00");
  const [estimatedDuration, setEstimatedDuration] = useState("2");
  const [cost, setCost] = useState("");
  const [agendaDate, setAgendaDate] = useState<Date | undefined>(new Date());
  
  const { state, dispatch, stats } = useFleetLogic();

  const documents = [
    { type: "Assurance", expiration: "15/06/2025", status: "Valide" },
    { type: "Vignette", expiration: "31/12/2025", status: "À renouveler" },
    { type: "Contrôle technique", expiration: "20/05/2025", status: "Valide" }
  ];

  const getStatusBadge = (status: string) => {
    if (status === "Valide") {
      return <Badge className="bg-green-500">Valide</Badge>;
    }
    return <Badge variant="destructive">À renouveler</Badge>;
  };

  const handleScheduleMaintenance = () => {
    if (!selectedMaintenanceId || !selectedVehicleId || !selectedMechanicId || !selectedWorkshopBayId || !planningDate) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      return;
    }

    if (isCompleted) {
      // Terminer la maintenance directement
      dispatch({
        type: "COMPLETE_MAINTENANCE",
        payload: {
          maintenanceId: selectedMaintenanceId,
          cost: cost || "0 €",
          actualDuration: parseFloat(estimatedDuration)
        }
      });
      dispatch({
        type: "UPDATE_VEHICLE_STATUS",
        payload: { vehicleId: selectedVehicleId, status: "active" }
      });
    } else {
      // Planifier la maintenance
      dispatch({
        type: "SCHEDULE_MAINTENANCE",
        payload: {
          maintenanceId: selectedMaintenanceId,
          vehicleId: selectedVehicleId,
          mechanicId: selectedMechanicId,
          workshopBayId: selectedWorkshopBayId,
          scheduledDate: planningDate,
          scheduledTime: planningTime,
          estimatedDuration: parseFloat(estimatedDuration),
          status: "scheduled"
        }
      });
      
      dispatch({
        type: "ASSIGN_MECHANIC",
        payload: { maintenanceId: selectedMaintenanceId, mechanicId: selectedMechanicId }
      });
      
      dispatch({
        type: "ASSIGN_WORKSHOP_BAY",
        payload: { maintenanceId: selectedMaintenanceId, bayId: selectedWorkshopBayId }
      });
    }

    toast({
      title: "Succès",
      description: isCompleted ? "Maintenance terminée avec succès" : "Maintenance planifiée avec succès"
    });

    // Reset form
    setSelectedMaintenanceId("");
    setSelectedVehicleId("");
    setSelectedMechanicId("");
    setSelectedWorkshopBayId("");
    setPlanningDate("");
    setCost("");
    setIsCompleted(false);
  };

  // Obtenir les maintenances non planifiées
  const unscheduledMaintenances = state.maintenanceRecords.filter(m => 
    m.status === "planned" && !state.planningEntries.find(p => p.maintenanceId === m.id)
  );

  return (
    <DashboardLayout>
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Planification</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Planifier une intervention
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="maintenanceId">Maintenance à planifier</Label>
                <Select value={selectedMaintenanceId} onValueChange={setSelectedMaintenanceId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une maintenance" />
                  </SelectTrigger>
                  <SelectContent>
                    {unscheduledMaintenances.map((maintenance) => (
                      <SelectItem key={maintenance.id} value={maintenance.id}>
                        {maintenance.id} - {maintenance.type} ({maintenance.vehicleName})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="vehicle">Véhicule</Label>
                <Select value={selectedVehicleId} onValueChange={setSelectedVehicleId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un véhicule" />
                  </SelectTrigger>
                  <SelectContent>
                    {state.vehicles.map((vehicle) => (
                      <SelectItem key={vehicle.id} value={vehicle.id}>
                        {vehicle.brand} {vehicle.model} ({vehicle.registrationNumber})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label htmlFor="date">Date planifiée</Label>
                  <Input 
                    id="date" 
                    type="date" 
                    value={planningDate}
                    onChange={(e) => setPlanningDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Heure</Label>
                  <Input 
                    id="time" 
                    type="time" 
                    value={planningTime}
                    onChange={(e) => setPlanningTime(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Durée estimée (heures)</Label>
                <Input 
                  id="duration" 
                  type="number" 
                  step="0.5"
                  value={estimatedDuration}
                  onChange={(e) => setEstimatedDuration(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="workshop">Emplacement atelier</Label>
                <Select value={selectedWorkshopBayId} onValueChange={setSelectedWorkshopBayId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un emplacement" />
                  </SelectTrigger>
                  <SelectContent>
                    {state.workshopBays.filter(bay => bay.status === "free").map((bay) => (
                      <SelectItem key={bay.id} value={bay.id}>
                        {bay.name} - {bay.type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mechanic">Mécanicien assigné</Label>
                <Select value={selectedMechanicId} onValueChange={setSelectedMechanicId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un mécanicien" />
                  </SelectTrigger>
                  <SelectContent>
                    {state.mechanics.filter(mechanic => mechanic.status === "available" || mechanic.currentAssignments < 3).map((mechanic) => (
                      <SelectItem key={mechanic.id} value={mechanic.id}>
                        {mechanic.name} - {mechanic.speciality} ({mechanic.currentAssignments} tâches)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="completed" 
                    checked={isCompleted}
                    onCheckedChange={(checked) => setIsCompleted(checked as boolean)}
                  />
                  <Label htmlFor="completed">Intervention terminée</Label>
                </div>
              </div>

              {isCompleted && (
                <div className="space-y-2">
                  <Label htmlFor="cost">Coût</Label>
                  <div className="relative">
                    <Input
                      id="cost"
                      type="number"
                      placeholder="Montant"
                      value={cost}
                      onChange={(e) => setCost(e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <span className="text-gray-500">€</span>
                    </div>
                  </div>
                </div>
              )}

              <Button className="w-full" onClick={handleScheduleMaintenance}>
                {isCompleted ? "Terminer la maintenance" : "Planifier l'intervention"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Statistiques de planification
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-fleet-blue">{stats.plannedMaintenances}</div>
                  <p className="text-xs text-muted-foreground">Maintenances planifiées</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-fleet-orange">{stats.inProgressMaintenances}</div>
                  <p className="text-xs text-muted-foreground">En cours</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-fleet-green">{stats.availableMechanics}</div>
                  <p className="text-xs text-muted-foreground">Mécaniciens libres</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-fleet-purple">{stats.freeWorkshopBays}</div>
                  <p className="text-xs text-muted-foreground">Postes libres</p>
                </div>
              </div>
              
              <div className="mt-4">
                <h4 className="font-medium mb-2">Prochaines planifications</h4>
                {state.planningEntries.filter(p => p.status === "scheduled").slice(0, 3).map((planning) => {
                  const maintenance = state.maintenanceRecords.find(m => m.id === planning.maintenanceId);
                  const vehicle = state.vehicles.find(v => v.id === planning.vehicleId);
                  return (
                    <div key={planning.id} className="text-xs p-2 bg-muted rounded mb-1">
                      <div className="font-medium">{maintenance?.type}</div>
                      <div className="text-muted-foreground">
                        {vehicle?.brand} {vehicle?.model} - {planning.scheduledDate} à {planning.scheduledTime}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AJOUT : Agenda de la planification */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Agenda de la planification</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <ShadcnCalendar
                mode="single"
                selected={agendaDate}
                onSelect={setAgendaDate}
                className={cn("p-3 pointer-events-auto")}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-medium">
              Alertes prédictives
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-fleet-orange" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                <div>
                  <h3 className="font-medium">Renault Clio (AB-123-CD)</h3>
                  <p className="text-sm text-muted-foreground">Kilométrage : 95,000 km</p>
                  <p className="text-sm text-fleet-orange mt-1">Maintenance recommandée à 100,000 km</p>
                </div>
                <Badge variant="outline" className="border-fleet-orange text-fleet-orange">
                  5,000 km restants
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Planning;
