
import React from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Wrench } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Mechanic {
  id: string;
  name: string;
  speciality: string;
  currentAssignments: number;
  status: "available" | "busy" | "off";
}

const mechanics: Mechanic[] = [
  {
    id: "M001",
    name: "Pierre Martin",
    speciality: "Moteur/Transmission",
    currentAssignments: 2,
    status: "busy"
  },
  {
    id: "M002",
    name: "Sophie Durand",
    speciality: "Électronique",
    currentAssignments: 0,
    status: "available"
  },
  {
    id: "M003",
    name: "Jean Dubois",
    speciality: "Carrosserie",
    currentAssignments: 1,
    status: "busy"
  }
];

const getStatusBadge = (status: Mechanic['status']) => {
  switch (status) {
    case "available":
      return <Badge className="bg-green-500">Disponible</Badge>;
    case "busy":
      return <Badge variant="outline" className="border-fleet-orange text-fleet-orange">Occupé</Badge>;
    case "off":
      return <Badge variant="destructive">Absent</Badge>;
    default:
      return null;
  }
};

const Mecaniciens = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Mécaniciens</h1>
          <Button className="bg-fleet-blue hover:bg-fleet-lightBlue">
            <Plus className="h-4 w-4 mr-2" />
            Ajouter un mécanicien
          </Button>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-medium">
              Liste des mécaniciens
            </CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nom</TableHead>
                  <TableHead>Spécialité</TableHead>
                  <TableHead>Interventions en cours</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mechanics.map((mechanic) => (
                  <TableRow key={mechanic.id}>
                    <TableCell className="font-medium">{mechanic.id}</TableCell>
                    <TableCell>{mechanic.name}</TableCell>
                    <TableCell>{mechanic.speciality}</TableCell>
                    <TableCell>{mechanic.currentAssignments}</TableCell>
                    <TableCell>{getStatusBadge(mechanic.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Mecaniciens;
