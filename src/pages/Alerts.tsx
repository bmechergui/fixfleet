
import React, { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, AlertTriangle, Filter, Calendar, Car, Clock, CheckCircle2, Info, Zap, AlertCircle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertSeverityBadge } from "@/components/shared/AlertSeverityBadge";
import { AlertStatusBadge } from "@/components/shared/AlertStatusBadge";

interface Alert {
  id: string;
  vehicle: string;
  type: "maintenance" | "diagnostic" | "security";
  severity: "high" | "medium" | "low" | "info";
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
  // Exemple d'alerte info
  {
    id: "A-006",
    vehicle: "Toyota Yaris (UV-678-WX)",
    type: "diagnostic",
    severity: "info",
    message: "Information système : mise à jour logicielle disponible",
    date: "18/04/2025",
    status: "new"
  },
];

const Alerts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [localAlerts, setLocalAlerts] = useState(alerts);
  const [selectedSeverity, setSelectedSeverity] = useState<"all" | "high" | "medium" | "low" | "info">("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [activeState, setActiveState] = useState<string>("all"); // "all", "new", "acknowledged", "resolved"

  const handleAcknowledge = (id: string) => {
    setLocalAlerts(alerts =>
      alerts.map(alert =>
        alert.id === id ? { ...alert, status: "acknowledged" } : alert
      )
    );
  };

  const handleResolve = (id: string) => {
    setLocalAlerts(alerts =>
      alerts.map(alert =>
        alert.id === id ? { ...alert, status: "resolved" } : alert
      )
    );
  };

  // Compteurs par niveau d'urgence
  const severityCounts = {
    high: localAlerts.filter(a => a.severity === "high").length,
    medium: localAlerts.filter(a => a.severity === "medium").length,
    low: localAlerts.filter(a => a.severity === "low").length,
    info: localAlerts.filter(a => a.severity === "info").length,
  };

  const filteredAlerts = localAlerts.filter(alert => {
    const matchesSearch = 
      alert.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = selectedSeverity === "all" || alert.severity === selectedSeverity;
    const inDateRange =
      (!dateFrom || alert.date >= dateFrom) &&
      (!dateTo || alert.date <= dateTo);
    if (showHistory) {
      // Historique : on filtre par état choisi (par défaut "resolved")
      return (activeState === "all" ? alert.status === "resolved" : alert.status === activeState) && matchesSearch && matchesSeverity && inDateRange;
    } else {
      // Actives : on filtre par état choisi (par défaut "all" = new + acknowledged)
      if (activeState === "all") return (alert.status === "new" || alert.status === "acknowledged") && matchesSearch && matchesSeverity && inDateRange;
      return alert.status === activeState && matchesSearch && matchesSeverity && inDateRange;
    }
  });

  // Ajoute une fonction utilitaire pour le badge d'urgence
  const getSeverityBadge = (severity: "high" | "medium" | "low" | "info") => {
    switch (severity) {
      case "high":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-semibold">
            <AlertCircle className="h-4 w-4 text-red-500" /> Critique
          </span>
        );
      case "medium":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold">
            <Zap className="h-4 w-4 text-orange-500" /> Majeur
          </span>
        );
      case "low":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 text-xs font-semibold">
            <AlertTriangle className="h-4 w-4 text-yellow-500" /> Mineur
          </span>
        );
      case "info":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
            <Info className="h-4 w-4 text-blue-400" /> Avertissement
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Gestion des alarmes</h1>
          <Button className="bg-fleet-blue hover:bg-fleet-lightBlue">
            Configurer les alarmes
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        </div>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
              <div className="relative w-full max-w-md">
                <Bell className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher une alarme..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              {/* Tabs supprimés, seuls les nouveaux filtres restent */}
            </div>
            {/* Filtres d'urgence, état et date sur une seule ligne */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex gap-2 items-center">
                <Button onClick={() => { setShowHistory(false); setActiveState("all"); }} variant={!showHistory ? "default" : "outline"}>Actives</Button>
                <Button onClick={() => { setShowHistory(true); setActiveState("all"); }} variant={showHistory ? "default" : "outline"}>Historique</Button>
              </div>
              <div className="flex items-center gap-2 ml-4">
                {showHistory ? (
                  <select
                    value={activeState}
                    onChange={e => setActiveState(e.target.value)}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    <option value="all">Résolues</option>
                    <option value="resolved">Résolues</option>
                  </select>
                ) : (
                  <select
                    value={activeState}
                    onChange={e => setActiveState(e.target.value)}
                    className="border rounded px-2 py-1 text-sm"
                  >
                    <option value="all">Toutes</option>
                    <option value="new">Nouvelles</option>
                    <option value="acknowledged">En traitement</option>
                  </select>
                )}
              </div>
              {showHistory && (
                <div className="flex items-center gap-2 ml-4">
                  <label htmlFor="alert-date-from" className="text-sm text-gray-700">Date de :</label>
                  <input
                    id="alert-date-from"
                    type="date"
                    value={dateFrom}
                    onChange={e => setDateFrom(e.target.value)}
                    className="border rounded px-2 py-1 text-sm"
                  />
                  <label htmlFor="alert-date-to" className="text-sm text-gray-700">à</label>
                  <input
                    id="alert-date-to"
                    type="date"
                    value={dateTo}
                    onChange={e => setDateTo(e.target.value)}
                    className="border rounded px-2 py-1 text-sm"
                  />
                  {(dateFrom || dateTo) && (
                    <button onClick={() => { setDateFrom(""); setDateTo(""); }} className="text-xs text-gray-500 ml-1">✕</button>
                  )}
                </div>
              )}
            </div>
            {/* Ligne séparée pour les filtres d'urgence en mode Actives */}
            {!showHistory && (
              <div className="flex items-center gap-6 mb-4">
                <button
                  className={`flex items-center gap-1 px-3 py-1 rounded-full bg-white border ${selectedSeverity === "high" ? "border-red-500" : "border-transparent"}`}
                  onClick={() => setSelectedSeverity(selectedSeverity === "high" ? "all" : "high")}
                >
                  <AlertCircle className="h-5 w-5 text-red-600" fill="#ef4444" />
                  <span className="font-bold text-red-600">{severityCounts.high}</span>
                  <span className="text-xs text-gray-700 ml-1">Critique</span>
                </button>
                <button
                  className={`flex items-center gap-1 px-3 py-1 rounded-full bg-white border ${selectedSeverity === "medium" ? "border-orange-500" : "border-transparent"}`}
                  onClick={() => setSelectedSeverity(selectedSeverity === "medium" ? "all" : "medium")}
                >
                  <Zap className="h-5 w-5 text-orange-500" fill="#f59e42" />
                  <span className="font-bold text-orange-500">{severityCounts.medium}</span>
                  <span className="text-xs text-gray-700 ml-1">Majeur</span>
                </button>
                <button
                  className={`flex items-center gap-1 px-3 py-1 rounded-full bg-white border ${selectedSeverity === "low" ? "border-yellow-400" : "border-transparent"}`}
                  onClick={() => setSelectedSeverity(selectedSeverity === "low" ? "all" : "low")}
                >
                  <AlertTriangle className="h-5 w-5 text-yellow-400" fill="#fde047" />
                  <span className="font-bold text-yellow-400">{severityCounts.low}</span>
                  <span className="text-xs text-gray-700 ml-1">Mineur</span>
                </button>
                <button
                  className={`flex items-center gap-1 px-3 py-1 rounded-full bg-white border ${selectedSeverity === "info" ? "border-blue-400" : "border-transparent"}`}
                  onClick={() => setSelectedSeverity(selectedSeverity === "info" ? "all" : "info")}
                >
                  <Info className="h-5 w-5 text-blue-400" fill="#60a5fa" />
                  <span className="font-bold text-blue-400">{severityCounts.info}</span>
                  <span className="text-xs text-gray-700 ml-1">Avertissement</span>
                </button>
              </div>
            )}
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Véhicule</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Niveau</TableHead>
                    <TableHead>Statut</TableHead>
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
                      <TableCell><AlertStatusBadge status={alert.status} /></TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {alert.status === "new" && (
                            <Button
                              variant="ghost"
                              size="icon"
                              title="Prendre en charge"
                              onClick={() => handleAcknowledge(alert.id)}
                            >
                              <Clock className="h-4 w-4 text-yellow-500" />
                            </Button>
                          )}
                          {alert.status === "acknowledged" && (
                            <Button
                              variant="ghost"
                              size="icon"
                              title="Marquer comme résolue"
                              onClick={() => handleResolve(alert.id)}
                            >
                              <CheckCircle2 className="h-4 w-4 text-fleet-green" />
                            </Button>
                          )}
                          {/* Si resolved, aucune action */}
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
