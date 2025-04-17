
import React, { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, AlertTriangle, Filter, Calendar, Car, Clock, CheckCircle2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Alert {
  id: string;
  vehicle: string;
  type: "maintenance" | "diagnostic" | "security";
  severity: "high" | "medium" | "low";
  message: string;
  date: string;
  status: "new" | "acknowledged" | "resolved";
  dueDate?: string;
}

const alerts: Alert[] = [
  {
    id: "A-001",
    vehicle: "Renault Clio (AB-123-CD)",
    type: "maintenance",
    severity: "high",
    message: "Vidange d'huile à effectuer - Dépassement du kilométrage recommandé",
    date: "14/04/2025",
    status: "new",
    dueDate: "17/04/2025"
  },
  {
    id: "A-002",
    vehicle: "Peugeot 308 (EF-456-GH)",
    type: "diagnostic",
    severity: "medium",
    message: "Batterie faible détectée - Remplacement recommandé",
    date: "15/04/2025",
    status: "acknowledged",
    dueDate: "20/04/2025"
  },
  {
    id: "A-003",
    vehicle: "Citroën C3 (IJ-789-KL)",
    type: "security",
    severity: "high",
    message: "Plaquettes de frein usées - Remplacement urgent",
    date: "13/04/2025",
    status: "acknowledged",
    dueDate: "16/04/2025"
  },
  {
    id: "A-004",
    vehicle: "Ford Transit (MN-012-OP)",
    type: "maintenance",
    severity: "low",
    message: "Contrôle technique à prévoir dans 30 jours",
    date: "10/04/2025",
    status: "new",
    dueDate: "10/05/2025"
  },
  {
    id: "A-005",
    vehicle: "Volkswagen Passat (QR-345-ST)",
    type: "diagnostic",
    severity: "medium",
    message: "Anomalie capteur température moteur détectée",
    date: "12/04/2025",
    status: "resolved"
  },
];

const getSeverityBadge = (severity: Alert['severity']) => {
  switch (severity) {
    case "high":
      return <Badge variant="destructive">Urgente</Badge>;
    case "medium":
      return <Badge variant="destructive" className="bg-orange-500">Moyenne</Badge>;
    case "low":
      return <Badge variant="outline" className="border-blue-500 text-blue-500">Faible</Badge>;
    default:
      return null;
  }
};

const getStatusBadge = (status: Alert['status']) => {
  switch (status) {
    case "new":
      return <Badge variant="outline" className="border-red-500 text-red-500">Nouvelle</Badge>;
    case "acknowledged":
      return <Badge variant="outline" className="border-yellow-500 text-yellow-500">En traitement</Badge>;
    case "resolved":
      return <Badge variant="outline" className="border-green-500 text-green-500">Résolue</Badge>;
    default:
      return null;
  }
};

const Alerts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = 
      alert.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    else if (activeTab === "new") return matchesSearch && alert.status === "new";
    else if (activeTab === "acknowledged") return matchesSearch && alert.status === "acknowledged";
    else if (activeTab === "resolved") return matchesSearch && alert.status === "resolved";
    
    return matchesSearch;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Centre d'alertes</h1>
          <Button className="bg-fleet-blue hover:bg-fleet-lightBlue">
            Configurer les alertes
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Alertes urgentes
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">2</div>
              <p className="text-xs text-muted-foreground mt-2">
                Interventions prioritaires requises
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Maintenance planifiée
              </CardTitle>
              <Calendar className="h-4 w-4 text-fleet-blue" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-fleet-blue">5</div>
              <p className="text-xs text-muted-foreground mt-2">
                Entretiens à effectuer cette semaine
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Diagnostics avancés
              </CardTitle>
              <Car className="h-4 w-4 text-fleet-orange" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-fleet-orange">3</div>
              <p className="text-xs text-muted-foreground mt-2">
                Véhicules nécessitant un diagnostic
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
              <div className="relative w-full max-w-md">
                <Bell className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher une alerte..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-4 w-full md:w-auto">
                <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-4 w-full">
                    <TabsTrigger value="all">Toutes</TabsTrigger>
                    <TabsTrigger value="new">Nouvelles</TabsTrigger>
                    <TabsTrigger value="acknowledged">En traitement</TabsTrigger>
                    <TabsTrigger value="resolved">Résolues</TabsTrigger>
                  </TabsList>
                </Tabs>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtrer
                </Button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Véhicule</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Urgence</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Échéance</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAlerts.map((alert) => (
                    <TableRow key={alert.id}>
                      <TableCell className="font-medium">{alert.id}</TableCell>
                      <TableCell>{alert.vehicle}</TableCell>
                      <TableCell>{alert.message}</TableCell>
                      <TableCell>{alert.date}</TableCell>
                      <TableCell>{getSeverityBadge(alert.severity)}</TableCell>
                      <TableCell>{getStatusBadge(alert.status)}</TableCell>
                      <TableCell>{alert.dueDate || "-"}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {alert.status === "new" && (
                            <Button variant="ghost" size="icon" title="Prendre en charge">
                              <Clock className="h-4 w-4 text-yellow-500" />
                            </Button>
                          )}
                          {alert.status !== "resolved" && (
                            <Button variant="ghost" size="icon" title="Marquer comme résolu">
                              <CheckCircle2 className="h-4 w-4 text-fleet-green" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Alerts;
