
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Edit, Trash, FileText, Clock, CheckCircle2 } from "lucide-react";
import type { VehicleType } from "@/types/vehicle";
import { useState } from "react";

interface VehicleTableProps {
  vehicles: VehicleType[];
  onDocumentsClick: (vehicleId: string) => void;
}

const getStatusBadge = (status: VehicleType['status']) => {
  switch (status) {
    case "active":
      return <Badge variant="outline" className="border-fleet-green text-fleet-green">En service</Badge>;
    case "maintenance":
      return <Badge variant="outline" className="border-fleet-yellow text-fleet-yellow">En maintenance</Badge>;
    case "inactive":
      return <Badge variant="outline" className="border-fleet-red text-fleet-red">Hors service</Badge>;
    default:
      return null;
  }
};

export function VehicleTable({ vehicles, onDocumentsClick }: VehicleTableProps) {
  // Suppression de la gestion d'état local et des actions, car la colonne d'actions a été retirée

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Immatriculation</TableHead>
          <TableHead>Marque/Modèle</TableHead>
          <TableHead>Année</TableHead>
          <TableHead>Kilométrage</TableHead>
          <TableHead>Documents</TableHead>
          <TableHead>Chauffeur</TableHead>
          <TableHead>Groupe</TableHead>
          <TableHead>Statut</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vehicles.map((vehicle) => (
          <TableRow key={vehicle.id}>
            <TableCell className="font-medium">{vehicle.registrationNumber}</TableCell>
            <TableCell>{vehicle.brand} {vehicle.model}</TableCell>
            <TableCell>{vehicle.year}</TableCell>
            <TableCell>{vehicle.kilometers} km</TableCell>
            <TableCell>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDocumentsClick(vehicle.id)}
              >
                <FileText className="h-4 w-4" />
                <span className="ml-2">{vehicle.documents?.length || 0}</span>
              </Button>
            </TableCell>
            <TableCell>{vehicle.driver}</TableCell>
            <TableCell>{vehicle.group}</TableCell>
            <TableCell>{getStatusBadge(vehicle.status)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
