
import React, { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, FileText, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Planning = () => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [selectedMechanic, setSelectedMechanic] = useState("");
  const [selectedWorkshop, setSelectedWorkshop] = useState("");
  const [maintenanceId, setMaintenanceId] = useState("");
  const [planningDate, setPlanningDate] = useState("");
  const [cost, setCost] = useState("");

  const documents = [
    { type: "Assurance", expiration: "15/06/2025", status: "Valide" },
    { type: "Vignette", expiration: "31/12/2025", status: "À renouveler" },
    { type: "Contrôle technique", expiration: "20/05/2025", status: "Valide" }
  ];

  const getStatusBadge = (status: string) => {
    if (status === "Valide") {
      return <Badge className="bg-green-500">Valide</Badge>;
    }
    return <Badge variant="destructive">À renouveler</Badge>;
  };

  return (
    <DashboardLayout>
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Planification</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Planifier une intervention
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="maintenanceId">ID Maintenance</Label>
                <Input 
                  id="maintenanceId" 
                  placeholder="Entrer l'ID de maintenance"
                  value={maintenanceId}
                  onChange={(e) => setMaintenanceId(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="vehicle">Véhicule</Label>
                <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un véhicule" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="clio">Renault Clio (AB-123-CD)</SelectItem>
                    <SelectItem value="308">Peugeot 308 (EF-456-GH)</SelectItem>
                    <SelectItem value="c3">Citroën C3 (IJ-789-KL)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Date planifiée</Label>
                <Input 
                  id="date" 
                  type="date" 
                  value={planningDate}
                  onChange={(e) => setPlanningDate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="workshop">Atelier</Label>
                <Select value={selectedWorkshop} onValueChange={setSelectedWorkshop}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un atelier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="atelier1">Atelier Central</SelectItem>
                    <SelectItem value="atelier2">Atelier Nord</SelectItem>
                    <SelectItem value="atelier3">Atelier Sud</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mechanic">Mécanicien assigné</Label>
                <Select value={selectedMechanic} onValueChange={setSelectedMechanic}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un mécanicien" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pierre">Pierre Martin</SelectItem>
                    <SelectItem value="sophie">Sophie Durand</SelectItem>
                    <SelectItem value="jean">Jean Dubois</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="completed" 
                    checked={isCompleted}
                    onCheckedChange={(checked) => setIsCompleted(checked as boolean)}
                  />
                  <Label htmlFor="completed">Intervention terminée</Label>
                </div>
              </div>

              {isCompleted && (
                <div className="space-y-2">
                  <Label htmlFor="cost">Coût</Label>
                  <div className="relative">
                    <Input
                      id="cost"
                      type="number"
                      placeholder="Montant"
                      value={cost}
                      onChange={(e) => setCost(e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <span className="text-gray-500">€</span>
                    </div>
                  </div>
                </div>
              )}

              <Button className="w-full">Planifier l'intervention</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Documents du véhicule
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document</TableHead>
                    <TableHead>Expiration</TableHead>
                    <TableHead>Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.map((doc, index) => (
                    <TableRow key={index}>
                      <TableCell>{doc.type}</TableCell>
                      <TableCell>{doc.expiration}</TableCell>
                      <TableCell>{getStatusBadge(doc.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-medium">
              Alertes prédictives
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-fleet-orange" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                <div>
                  <h3 className="font-medium">Renault Clio (AB-123-CD)</h3>
                  <p className="text-sm text-muted-foreground">Kilométrage : 95,000 km</p>
                  <p className="text-sm text-fleet-orange mt-1">Maintenance recommandée à 100,000 km</p>
                </div>
                <Badge variant="outline" className="border-fleet-orange text-fleet-orange">
                  5,000 km restants
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Planning;
