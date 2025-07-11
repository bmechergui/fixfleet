import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Wrench, Car, CheckCircle2 } from "lucide-react";

interface Workshop {
  id: string;
  name: string;
  location: string;
  description: string;
}

// Données fictives d'ateliers
const mockWorkshops: Workshop[] = [
  { id: "1", name: "Atelier principal", location: "Bâtiment A", description: "Mécanique générale et diagnostics avancés." },
  { id: "2", name: "Atelier rapide", location: "Bâtiment B", description: "Interventions rapides et entretiens courants." },
  { id: "3", name: "Atelier carrosserie", location: "Bâtiment C", description: "Réparations de carrosserie et peinture." },
];

const mockStats = {
  "1": { inWorkshop: 3, waiting: 2, completed: 5 },
  "2": { inWorkshop: 1, waiting: 0, completed: 2 },
  "3": { inWorkshop: 0, waiting: 1, completed: 1 },
};

const AtelierDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const workshop = mockWorkshops.find(w => w.id === id);
  const stats = mockStats[id || "1"] || { inWorkshop: 0, waiting: 0, completed: 0 };

  if (!workshop) {
    return (
      <div className="p-8">
        <h2 className="text-xl font-bold mb-4">Atelier introuvable</h2>
        <Button onClick={() => navigate("/ateliers")}>Retour à la liste</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-8">
      <Button variant="outline" onClick={() => navigate("/ateliers")} className="mb-4">&larr; Retour à la liste</Button>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl">{workshop.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-2"><b>Emplacement :</b> {workshop.location}</div>
          <div className="mb-2"><b>Description :</b> {workshop.description}</div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Véhicules en atelier</CardTitle>
            <Wrench className="h-4 w-4 text-fleet-orange" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-fleet-orange">{stats.inWorkshop}</div>
            <p className="text-xs text-muted-foreground mt-2">Actuellement en intervention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En attente</CardTitle>
            <Car className="h-4 w-4 text-fleet-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-fleet-blue">{stats.waiting}</div>
            <p className="text-xs text-muted-foreground mt-2">Véhicules en file d'attente</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sorties récentes</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-fleet-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-fleet-green">{stats.completed}</div>
            <p className="text-xs text-muted-foreground mt-2">Maintenances terminées</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AtelierDetail; 