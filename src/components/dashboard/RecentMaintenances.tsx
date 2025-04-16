
import { Wrench, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface Maintenance {
  id: string;
  vehicle: string;
  type: string;
  date: string;
  status: "completed" | "in-progress" | "planned";
  mechanic: string;
}

const maintenances: Maintenance[] = [
  {
    id: "1",
    vehicle: "Renault Clio #V-1234",
    type: "Vidange d'huile",
    date: "15/04/2025",
    status: "completed",
    mechanic: "Pierre Martin"
  },
  {
    id: "2",
    vehicle: "Peugeot 308 #V-2345",
    type: "Remplacement des plaquettes",
    date: "14/04/2025",
    status: "completed",
    mechanic: "Sophie Durand"
  },
  {
    id: "3",
    vehicle: "Citroën C3 #V-3456",
    type: "Contrôle technique",
    date: "16/04/2025",
    status: "in-progress",
    mechanic: "Jean Dubois"
  },
  {
    id: "4",
    vehicle: "Ford Transit #V-4567",
    type: "Changement de batterie",
    date: "18/04/2025",
    status: "planned",
    mechanic: "Marie Lambert"
  },
];

const getStatusBadge = (status: Maintenance['status']) => {
  switch (status) {
    case "completed":
      return <Badge variant="outline" className="border-fleet-green text-fleet-green">Terminé</Badge>;
    case "in-progress":
      return <Badge variant="outline" className="border-fleet-blue text-fleet-blue">En cours</Badge>;
    case "planned":
      return <Badge variant="outline" className="border-fleet-orange text-fleet-orange">Planifié</Badge>;
    default:
      return null;
  }
};

export function RecentMaintenances() {
  return (
    <Card className="h-full border-none shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">Entretiens récents</CardTitle>
        <Wrench className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {maintenances.map(maintenance => (
            <div key={maintenance.id} className="flex items-start justify-between">
              <div>
                <h3 className="font-medium">{maintenance.vehicle}</h3>
                <p className="text-sm text-muted-foreground mt-1">{maintenance.type}</p>
                <div className="flex items-center gap-3 mt-1">
                  <p className="text-xs text-fleet-gray">{maintenance.date}</p>
                  <p className="text-xs text-fleet-gray">•</p>
                  <p className="text-xs text-fleet-gray">{maintenance.mechanic}</p>
                </div>
              </div>
              {getStatusBadge(maintenance.status)}
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full mt-4 text-fleet-blue hover:text-white hover:bg-fleet-blue">
          <span>Voir tous les entretiens</span>
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
}
