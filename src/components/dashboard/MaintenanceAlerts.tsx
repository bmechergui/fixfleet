
import { Bell, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Alert {
  id: string;
  vehicle: string;
  type: "urgent" | "upcoming" | "overdue";
  message: string;
  date: string;
}

const alerts: Alert[] = [
  {
    id: "1",
    vehicle: "Renault Clio #V-1234",
    type: "urgent",
    message: "Vidange d'huile requise",
    date: "Aujourd'hui"
  },
  {
    id: "2",
    vehicle: "Peugeot 308 #V-2345",
    type: "upcoming",
    message: "Contrôle technique prévu",
    date: "Dans 3 jours"
  },
  {
    id: "3",
    vehicle: "Citroën C3 #V-3456",
    type: "overdue",
    message: "Remplacement des freins",
    date: "Retard de 5 jours"
  },
  {
    id: "4",
    vehicle: "Ford Transit #V-4567",
    type: "upcoming",
    message: "Remplacement des pneus",
    date: "Dans 7 jours"
  },
];

const getAlertBadge = (type: Alert['type']) => {
  switch (type) {
    case "urgent":
      return <Badge variant="destructive" className="ml-2">Urgent</Badge>;
    case "upcoming":
      return <Badge variant="outline" className="ml-2 border-fleet-blue text-fleet-blue">À venir</Badge>;
    case "overdue":
      return <Badge variant="destructive" className="ml-2 bg-fleet-orange">Retard</Badge>;
    default:
      return null;
  }
};

export function MaintenanceAlerts() {
  return (
    <Card className="h-full border-none shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">Alertes de maintenance</CardTitle>
        <Bell className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {alerts.map(alert => (
            <div key={alert.id} className="flex items-start justify-between">
              <div>
                <div className="flex items-center">
                  <h3 className="font-medium">{alert.vehicle}</h3>
                  {getAlertBadge(alert.type)}
                </div>
                <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                <p className="text-xs text-fleet-gray mt-0.5">{alert.date}</p>
              </div>
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full mt-4 text-fleet-blue hover:text-white hover:bg-fleet-blue">
          <span>Voir toutes les alertes</span>
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
}
