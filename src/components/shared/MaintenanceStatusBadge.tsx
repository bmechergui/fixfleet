import { Badge } from "@/components/ui/badge";
import type { MaintenanceRecord } from "@/types/shared";

interface MaintenanceStatusBadgeProps {
  status: MaintenanceRecord["status"];
}

export function MaintenanceStatusBadge({ status }: MaintenanceStatusBadgeProps) {
  switch (status) {
    case "planned":
      return <Badge variant="outline" className="border-fleet-blue text-fleet-blue">Planifiée</Badge>;
    case "in-progress":
      return <Badge variant="outline" className="border-fleet-orange text-fleet-orange">En cours</Badge>;
    case "completed":
      return <Badge className="bg-fleet-green text-white">Terminée</Badge>;
    case "cancelled":
      return <Badge variant="destructive">Annulée</Badge>;
    default:
      return <Badge variant="outline">Inconnu</Badge>;
  }
}