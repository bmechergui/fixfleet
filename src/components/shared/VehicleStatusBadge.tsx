import { Badge } from "@/components/ui/badge";
import type { Vehicle } from "@/types/shared";

interface VehicleStatusBadgeProps {
  status: Vehicle["status"];
}

export function VehicleStatusBadge({ status }: VehicleStatusBadgeProps) {
  switch (status) {
    case "active":
      return <Badge className="bg-fleet-green text-white">Actif</Badge>;
    case "maintenance":
      return <Badge variant="outline" className="border-fleet-orange text-fleet-orange">Maintenance</Badge>;
    case "inactive":
      return <Badge variant="outline" className="border-fleet-gray text-fleet-gray">Inactif</Badge>;
    case "in-workshop":
      return <Badge variant="outline" className="border-fleet-blue text-fleet-blue">En atelier</Badge>;
    case "waiting":
      return <Badge variant="outline" className="border-fleet-yellow text-fleet-yellow">En attente</Badge>;
    default:
      return <Badge variant="outline">Inconnu</Badge>;
  }
}