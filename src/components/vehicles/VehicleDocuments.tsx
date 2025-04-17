
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { VehicleDocument } from "@/types/vehicle";

interface VehicleDocumentsProps {
  documents: VehicleDocument[];
}

const getStatusBadge = (status: VehicleDocument['status']) => {
  switch (status) {
    case "valid":
      return <Badge variant="outline" className="border-fleet-green text-fleet-green">Valide</Badge>;
    case "to-renew":
      return <Badge variant="outline" className="border-fleet-orange text-fleet-orange">À renouveler</Badge>;
    case "expired":
      return <Badge variant="outline" className="border-fleet-red text-fleet-red">Expiré</Badge>;
    default:
      return null;
  }
};

export function VehicleDocuments({ documents }: VehicleDocumentsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Documents du véhicule</h3>
        <Button variant="outline" size="sm">
          <Upload className="h-4 w-4 mr-2" />
          Ajouter un document
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Document</TableHead>
            <TableHead>Expiration</TableHead>
            <TableHead>Statut</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((doc) => (
            <TableRow key={doc.id}>
              <TableCell>{doc.name}</TableCell>
              <TableCell>{doc.expirationDate}</TableCell>
              <TableCell>{getStatusBadge(doc.status)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
