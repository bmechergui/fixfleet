import { Badge } from "@/components/ui/badge";
import type { MaintenanceRecord } from "@/types/shared";

interface UrgencyBadgeProps {
  urgency?: MaintenanceRecord["urgency"];
}

export function UrgencyBadge({ urgency }: UrgencyBadgeProps) {
  if (!urgency) return <span className="text-muted-foreground">-</span>;
  
  switch (urgency) {
    case "haute":
      return <Badge variant="destructive">Haute</Badge>;
    case "moyenne":
      return <Badge variant="outline" className="border-fleet-orange text-fleet-orange">Moyenne</Badge>;
    case "faible":
      return <Badge variant="outline" className="border-fleet-blue text-fleet-blue">Faible</Badge>;
    default:
      return <span className="text-muted-foreground">-</span>;
  }
}