import { Badge } from "@/components/ui/badge";

interface AlertSeverityBadgeProps {
  severity: "high" | "medium" | "low";
}

export function AlertSeverityBadge({ severity }: AlertSeverityBadgeProps) {
  switch (severity) {
    case "high":
      return <Badge variant="destructive">Urgente</Badge>;
    case "medium":
      return <Badge variant="destructive" className="bg-orange-500">Moyenne</Badge>;
    case "low":
      return <Badge variant="outline" className="border-blue-500 text-blue-500">Faible</Badge>;
    default:
      return null;
  }
}