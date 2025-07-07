import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, TrendingUp, Calendar, Zap, Brain } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const predictiveData = [
  { date: "Jan", engineHealth: 95, brakeWear: 85, batteryLife: 90, fuelEfficiency: 88 },
  { date: "Fév", engineHealth: 94, brakeWear: 82, batteryLife: 87, fuelEfficiency: 86 },
  { date: "Mar", engineHealth: 92, brakeWear: 78, batteryLife: 85, fuelEfficiency: 85 },
  { date: "Avr", engineHealth: 90, brakeWear: 75, batteryLife: 82, fuelEfficiency: 83 },
  { date: "Mai", engineHealth: 89, brakeWear: 70, batteryLife: 80, fuelEfficiency: 82 },
  { date: "Jun", engineHealth: 87, brakeWear: 65, batteryLife: 78, fuelEfficiency: 80 },
];

interface PredictiveAlert {
  id: string;
  vehicle: string;
  component: string;
  riskLevel: "high" | "medium" | "low";
  predictedFailure: string;
  confidence: number;
  recommendation: string;
  estimatedCost: number;
}

const predictiveAlerts: PredictiveAlert[] = [
  {
    id: "PA-001",
    vehicle: "Renault Clio (AB-123-CD)",
    component: "Plaquettes de frein",
    riskLevel: "high",
    predictedFailure: "Dans 2-3 semaines",
    confidence: 92,
    recommendation: "Planifier remplacement immédiat",
    estimatedCost: 180
  },
  {
    id: "PA-002",
    vehicle: "Peugeot 308 (EF-456-GH)",
    component: "Batterie",
    riskLevel: "medium",
    predictedFailure: "Dans 1-2 mois",
    confidence: 78,
    recommendation: "Surveiller et planifier remplacement",
    estimatedCost: 120
  },
  {
    id: "PA-003",
    vehicle: "Ford Transit (MN-012-OP)",
    component: "Courroie de distribution",
    riskLevel: "medium",
    predictedFailure: "Dans 3-4 mois",
    confidence: 85,
    recommendation: "Inspection approfondie recommandée",
    estimatedCost: 350
  }
];

const getRiskBadge = (risk: string) => {
  switch (risk) {
    case "high":
      return <Badge variant="destructive">Risque élevé</Badge>;
    case "medium":
      return <Badge variant="outline" className="border-orange-500 text-orange-500">Risque moyen</Badge>;
    case "low":
      return <Badge variant="outline" className="border-green-500 text-green-500">Risque faible</Badge>;
    default:
      return null;
  }
};

export function PredictiveAnalysis() {
  const [selectedVehicle, setSelectedVehicle] = useState("all");

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertes prédictives</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">3</div>
            <p className="text-xs text-muted-foreground">Interventions recommandées</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Économies potentielles</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">2,450 €</div>
            <p className="text-xs text-muted-foreground">Évitement de pannes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fiabilité moyenne</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87.5%</div>
            <p className="text-xs text-muted-foreground">Santé globale de la flotte</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Précision IA</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <p className="text-xs text-muted-foreground">Taux de prédiction correct</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Évolution de la santé des composants</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={predictiveData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="engineHealth" stroke="#1a56db" name="Santé moteur" strokeWidth={2} />
              <Line type="monotone" dataKey="brakeWear" stroke="#dc2626" name="Usure freins" strokeWidth={2} />
              <Line type="monotone" dataKey="batteryLife" stroke="#059669" name="Vie batterie" strokeWidth={2} />
              <Line type="monotone" dataKey="fuelEfficiency" stroke="#ea580c" name="Efficacité carburant" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Alertes prédictives actives
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {predictiveAlerts.map((alert) => (
              <div key={alert.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="font-medium">{alert.vehicle}</h3>
                    <p className="text-sm text-muted-foreground">Composant: {alert.component}</p>
                  </div>
                  {getRiskBadge(alert.riskLevel)}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Défaillance prédite:</span>
                    <p className="text-muted-foreground">{alert.predictedFailure}</p>
                  </div>
                  <div>
                    <span className="font-medium">Confiance:</span>
                    <div className="flex items-center gap-2 mt-1">
                      <Progress value={alert.confidence} className="flex-1" />
                      <span className="text-xs">{alert.confidence}%</span>
                    </div>
                  </div>
                  <div>
                    <span className="font-medium">Coût estimé:</span>
                    <p className="text-muted-foreground">{alert.estimatedCost} €</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t">
                  <p className="text-sm text-muted-foreground">{alert.recommendation}</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Calendar className="h-4 w-4 mr-1" />
                      Planifier
                    </Button>
                    <Button size="sm" className="bg-fleet-blue">
                      Voir détails
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}