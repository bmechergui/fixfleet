
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Edit, CheckCircle2 } from "lucide-react";
import { Maintenance } from "@/types/maintenance";
import type { MaintenanceRecord } from "@/types/shared";
import { useState } from "react";
import { WorkOrderDialog } from "./WorkOrderDialog";
import { MaintenanceDetailsDialog } from "./MaintenanceDetailsDialog";
import { MaintenanceStatusBadge } from "@/components/shared/MaintenanceStatusBadge";
import { UrgencyBadge } from "@/components/shared/UrgencyBadge";

// Ajout badge urgence
const getUrgencyBadge = (urgency?: Maintenance['urgency']) => {
  switch (urgency) {
    case "haute":
      return <Badge variant="destructive">Haute</Badge>;
    case "moyenne":
      return <Badge variant="destructive" className="bg-orange-500">Moyenne</Badge>;
    case "faible":
      return <Badge variant="outline" className="border-blue-500 text-blue-500">Faible</Badge>;
    default:
      return <Badge variant="outline" className="border-muted text-muted">-</Badge>;
  }
};

interface MaintenanceTableProps {
  maintenances: (Maintenance | MaintenanceRecord)[];
  onSelectMaintenance?: (id: string) => void;
}

export const getCategoryBadge = (category: Maintenance['category']) => {
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

export const getStatusBadge = (status: Maintenance['status']) => {
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

export function MaintenanceTable({ maintenances, onSelectMaintenance }: MaintenanceTableProps) {
  const [workOrderOpen, setWorkOrderOpen] = useState(false);
  const [selectedMaintenance, setSelectedMaintenance] = useState<string | null>(null);

  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState<Maintenance | null>(null);

  const handleOpenWorkOrder = (maintenanceId: string) => {
    setSelectedMaintenance(maintenanceId);
    setWorkOrderOpen(true);
  };

  const handleOpenDetails = (maintenance: Maintenance) => {
    setSelectedDetails(maintenance);
    setDetailsDialogOpen(true);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Véhicule</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Catégorie</TableHead>
            <TableHead>Urgence</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Mécanicien</TableHead>
            <TableHead>Coût</TableHead>
            <TableHead>OT</TableHead>
            <TableHead className="w-[140px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {maintenances.map((maintenance) => {
            const vehicleName = 'vehicleName' in maintenance ? maintenance.vehicleName : maintenance.vehicle;
            const mechanicName = 'mechanicName' in maintenance ? maintenance.mechanicName : ('mechanic' in maintenance ? maintenance.mechanic : undefined);
            
            return (
              <TableRow 
                key={maintenance.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => onSelectMaintenance?.(maintenance.id)}
              >
                <TableCell className="font-medium">{maintenance.id}</TableCell>
                <TableCell>{maintenance.type}</TableCell>
                <TableCell>{vehicleName}</TableCell>
                <TableCell>{maintenance.date}</TableCell>
                <TableCell>{getCategoryBadge(maintenance.category)}</TableCell>
                <TableCell><UrgencyBadge urgency={maintenance.urgency} /></TableCell>
                <TableCell><MaintenanceStatusBadge status={maintenance.status} /></TableCell>
                <TableCell>{mechanicName || "Non assigné"}</TableCell>
                <TableCell>{maintenance.cost || "-"}</TableCell>
                <TableCell>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="ml-1"
                    title="Créer un ordre de travail"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenWorkOrder(maintenance.id);
                    }}
                  >
                    OT
                  </Button>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" title="Voir les détails" onClick={(e) => {
                      e.stopPropagation();
                      const maintenanceForDialog: Maintenance = {
                        ...maintenance,
                        vehicle: vehicleName || '',
                        mechanic: mechanicName || '',
                      } as Maintenance;
                      handleOpenDetails(maintenanceForDialog);
                    }}>
                      <FileText className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Modifier" onClick={(e) => {
                      e.stopPropagation();
                      const maintenanceForEdit: Maintenance = {
                        ...maintenance,
                        vehicle: vehicleName || '',
                        mechanic: mechanicName || '',
                      } as Maintenance;
                      // handleOpenEdit(maintenanceForEdit); // This line is removed
                    }}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <WorkOrderDialog
        open={workOrderOpen}
        onOpenChange={setWorkOrderOpen}
        maintenanceId={selectedMaintenance}
      />
      <MaintenanceDetailsDialog
        open={detailsDialogOpen}
        onOpenChange={setDetailsDialogOpen}
        maintenance={selectedDetails}
      />
      {/* Modal d'édition pour WorkOrderCreation */}
      {/* This block is removed as WorkOrderCreation component is removed */}
    </>
  );
}
