import { Badge } from "@/components/ui/badge";

interface AlertStatusBadgeProps {
  status: "new" | "acknowledged" | "resolved";
}

export function AlertStatusBadge({ status }: AlertStatusBadgeProps) {
  switch (status) {
    case "new":
      return <Badge variant="outline" className="border-red-500 text-red-500">Nouvelle</Badge>;
    case "acknowledged":
      return <Badge variant="outline" className="border-yellow-500 text-yellow-500">En traitement</Badge>;
    case "resolved":
      return <Badge variant="outline" className="border-green-500 text-green-500">Résolue</Badge>;
    default:
      return null;
  }
}