import { Badge } from "@/components/ui/badge";
import type { MaintenanceRecord } from "@/types/shared";

interface MaintenanceStatusBadgeProps {
  status: MaintenanceRecord["status"];
}

export function MaintenanceStatusBadge({ status }: { status: string }) {
  switch (status) {
    case "planned":
      return <span className="inline-block rounded bg-blue-100 text-blue-700 px-2 py-1 text-xs font-semibold">Planifiée</span>;
    case "in-progress":
      return <span className="inline-block rounded bg-orange-100 text-orange-700 px-2 py-1 text-xs font-semibold">En cours</span>;
    case "completed":
      return <span className="inline-block rounded bg-green-100 text-green-700 px-2 py-1 text-xs font-semibold">Terminée</span>;
    default:
      return <span className="inline-block rounded bg-gray-100 text-gray-700 px-2 py-1 text-xs font-semibold">{status}</span>;
  }
}