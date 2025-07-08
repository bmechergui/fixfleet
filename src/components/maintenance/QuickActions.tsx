import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Wrench, ArrowRight, User } from "lucide-react";
import { useFleet } from "@/hooks/useFleet";
import { Link } from "react-router-dom";

interface QuickActionsProps {
  maintenanceId?: string;
  vehicleId?: string;
}

export function QuickActions({ maintenanceId, vehicleId }: QuickActionsProps) {
  const { state, dispatch } = useFleet();

  const handleAssignToWorkshop = () => {
    if (maintenanceId && vehicleId) {
      // Trouver un emplacement libre
      const freeBay = state.workshopBays.find(bay => bay.status === "free");
      if (freeBay) {
        dispatch({
          type: "ASSIGN_WORKSHOP_BAY",
          payload: { maintenanceId, bayId: freeBay.id }
        });
        dispatch({
          type: "UPDATE_VEHICLE_STATUS",
          payload: { vehicleId, status: "in-workshop" }
        });
      }
    }
  };

  const handlePlanMaintenance = () => {
    if (maintenanceId && vehicleId) {
      // Trouver un mécanicien disponible
      const availableMechanic = state.mechanics.find(m => m.status === "available");
      const freeBay = state.workshopBays.find(bay => bay.status === "free");
      
      if (availableMechanic && freeBay) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        dispatch({
          type: "SCHEDULE_MAINTENANCE",
          payload: {
            maintenanceId,
            vehicleId,
            mechanicId: availableMechanic.id,
            workshopBayId: freeBay.id,
            scheduledDate: tomorrow.toLocaleDateString('fr-FR'),
            scheduledTime: "09:00",
            estimatedDuration: 2,
            status: "scheduled"
          }
        });
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Wrench className="h-5 w-5" />
          Actions rapides
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button 
          variant="outline" 
          className="w-full justify-start"
          onClick={handlePlanMaintenance}
        >
          <Calendar className="h-4 w-4 mr-2" />
          Planifier cette maintenance
        </Button>
        
        <Button 
          variant="outline" 
          className="w-full justify-start"
          onClick={handleAssignToWorkshop}
        >
          <ArrowRight className="h-4 w-4 mr-2" />
          Envoyer à l'atelier
        </Button>
        
        <Link to="/mecaniciens">
          <Button variant="outline" className="w-full justify-start">
            <User className="h-4 w-4 mr-2" />
            Voir les mécaniciens
          </Button>
        </Link>
        
        <Link to="/atelier">
          <Button variant="outline" className="w-full justify-start">
            <Wrench className="h-4 w-4 mr-2" />
            Voir l'atelier
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}