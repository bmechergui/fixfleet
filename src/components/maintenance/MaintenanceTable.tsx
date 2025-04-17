
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Edit, CheckCircle2 } from "lucide-react";
import { Maintenance } from "@/types/maintenance";

interface MaintenanceTableProps {
  maintenances: Maintenance[];
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

export function MaintenanceTable({ maintenances }: MaintenanceTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Véhicule</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Catégorie</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead>Mécanicien</TableHead>
          <TableHead>Coût</TableHead>
          <TableHead className="w-[100px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {maintenances.map((maintenance) => (
          <TableRow key={maintenance.id}>
            <TableCell className="font-medium">{maintenance.id}</TableCell>
            <TableCell>{maintenance.type}</TableCell>
            <TableCell>{maintenance.vehicle}</TableCell>
            <TableCell>{maintenance.date}</TableCell>
            <TableCell>{getCategoryBadge(maintenance.category)}</TableCell>
            <TableCell>{getStatusBadge(maintenance.status)}</TableCell>
            <TableCell>{maintenance.mechanic}</TableCell>
            <TableCell>{maintenance.cost || "-"}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" title="Voir les détails">
                  <FileText className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" title="Modifier">
                  <Edit className="h-4 w-4" />
                </Button>
                {maintenance.status !== "completed" && (
                  <Button variant="ghost" size="icon" title="Marquer comme terminé">
                    <CheckCircle2 className="h-4 w-4 text-fleet-green" />
                  </Button>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
