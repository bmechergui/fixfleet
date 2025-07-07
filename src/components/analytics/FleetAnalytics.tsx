import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, TrendingDown, DollarSign, Clock, Wrench } from "lucide-react";

const maintenanceCostData = [
  { month: "Jan", preventive: 2400, corrective: 1800, total: 4200 },
  { month: "Fév", preventive: 2200, corrective: 2100, total: 4300 },
  { month: "Mar", preventive: 2800, corrective: 1600, total: 4400 },
  { month: "Avr", preventive: 2600, corrective: 1900, total: 4500 },
  { month: "Mai", preventive: 3000, corrective: 1400, total: 4400 },
  { month: "Jun", preventive: 2900, corrective: 1700, total: 4600 },
];

const vehicleUtilizationData = [
  { vehicle: "Clio", utilization: 85, efficiency: 92 },
  { vehicle: "308", utilization: 78, efficiency: 88 },
  { vehicle: "C3", utilization: 92, efficiency: 95 },
  { vehicle: "Transit", utilization: 88, efficiency: 90 },
  { vehicle: "Passat", utilization: 75, efficiency: 85 },
];

const maintenanceTypeDistribution = [
  { name: "Préventive", value: 45, color: "#059669" },
  { name: "Corrective", value: 30, color: "#dc2626" },
  { name: "Périodique", value: 20, color: "#1a56db" },
  { name: "Prédictive", value: 5, color: "#ea580c" },
];

export function FleetAnalytics() {
  const totalCost = maintenanceCostData.reduce((sum, item) => sum + item.total, 0);
  const avgUtilization = vehicleUtilizationData.reduce((sum, item) => sum + item.utilization, 0) / vehicleUtilizationData.length;
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Coût total maintenance</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCost.toLocaleString()} €</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingDown className="h-3 w-3 mr-1" />
              -5.2% vs mois dernier
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taux d'utilisation moyen</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgUtilization.toFixed(1)}%</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +2.1% vs mois dernier
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Temps d'immobilisation</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5h</div>
            <div className="flex items-center text-xs text-red-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8.3% vs mois dernier
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Efficacité maintenance</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +1.8% vs mois dernier
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Évolution des coûts de maintenance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={maintenanceCostData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="preventive" stackId="a" fill="#059669" name="Préventive" />
                <Bar dataKey="corrective" stackId="a" fill="#dc2626" name="Corrective" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Répartition des types de maintenance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={maintenanceTypeDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {maintenanceTypeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Taux d'utilisation et efficacité par véhicule</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={vehicleUtilizationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="vehicle" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="utilization" fill="#1a56db" name="Utilisation %" />
              <Bar dataKey="efficiency" fill="#059669" name="Efficacité %" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}