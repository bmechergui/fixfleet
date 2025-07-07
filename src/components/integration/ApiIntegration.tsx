import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plug, 
  CheckCircle2, 
  AlertCircle, 
  Settings, 
  Database,
  Cloud,
  Smartphone,
  Truck,
  Fuel,
  MapPin
} from "lucide-react";

interface Integration {
  id: string;
  name: string;
  type: "erp" | "telematics" | "fuel" | "maintenance" | "accounting";
  status: "connected" | "disconnected" | "error";
  lastSync: string;
  description: string;
}

const integrations: Integration[] = [
  {
    id: "1",
    name: "SAP ERP",
    type: "erp",
    status: "connected",
    lastSync: "Il y a 5 min",
    description: "Synchronisation des données financières et RH"
  },
  {
    id: "2",
    name: "Geotab Telematics",
    type: "telematics",
    status: "connected",
    lastSync: "Il y a 2 min",
    description: "Données de géolocalisation et conduite"
  },
  {
    id: "3",
    name: "Total Fuel Card",
    type: "fuel",
    status: "error",
    lastSync: "Il y a 2h",
    description: "Transactions carburant et consommation"
  },
  {
    id: "4",
    name: "Bosch Diagnostics",
    type: "maintenance",
    status: "disconnected",
    lastSync: "Jamais",
    description: "Données de diagnostic véhicule"
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "connected":
      return <Badge className="bg-green-500">Connecté</Badge>;
    case "error":
      return <Badge variant="destructive">Erreur</Badge>;
    case "disconnected":
      return <Badge variant="outline">Déconnecté</Badge>;
    default:
      return null;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "connected":
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    case "error":
      return <AlertCircle className="h-4 w-4 text-red-500" />;
    default:
      return <AlertCircle className="h-4 w-4 text-gray-400" />;
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case "erp":
      return <Database className="h-4 w-4" />;
    case "telematics":
      return <MapPin className="h-4 w-4" />;
    case "fuel":
      return <Fuel className="h-4 w-4" />;
    case "maintenance":
      return <Settings className="h-4 w-4" />;
    default:
      return <Plug className="h-4 w-4" />;
  }
};

export function ApiIntegration() {
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState("");
  const [autoSync, setAutoSync] = useState(true);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Intégrations actives</CardTitle>
            <Plug className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              {integrations.filter(i => i.status === "connected").length}
            </div>
            <p className="text-xs text-muted-foreground">
              sur {integrations.length} configurées
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Données synchronisées</CardTitle>
            <Cloud className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2M</div>
            <p className="text-xs text-muted-foreground">points de données/jour</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Temps de réponse API</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245ms</div>
            <p className="text-xs text-muted-foreground">moyenne sur 24h</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fiabilité</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.8%</div>
            <p className="text-xs text-muted-foreground">uptime ce mois</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="integrations" className="w-full">
        <TabsList>
          <TabsTrigger value="integrations">Intégrations</TabsTrigger>
          <TabsTrigger value="api-config">Configuration API</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="integrations" className="space-y-4">
          <div className="grid gap-4">
            {integrations.map((integration) => (
              <Card key={integration.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getTypeIcon(integration.type)}
                      <div>
                        <h3 className="font-medium">{integration.name}</h3>
                        <p className="text-sm text-muted-foreground">{integration.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusIcon(integration.status)}
                      {getStatusBadge(integration.status)}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3 pt-3 border-t">
                    <span className="text-xs text-muted-foreground">
                      Dernière sync: {integration.lastSync}
                    </span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Configurer</Button>
                      <Button size="sm" variant="outline">Tester</Button>
                      {integration.status === "connected" ? (
                        <Button size="sm" variant="outline">Synchroniser</Button>
                      ) : (
                        <Button size="sm" className="bg-fleet-blue">Connecter</Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="api-config" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuration API</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="api-endpoint">Point de terminaison API</Label>
                  <Input id="api-endpoint" placeholder="https://api.example.com/v1" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="api-key">Clé API</Label>
                  <Input 
                    id="api-key" 
                    type="password" 
                    placeholder="sk-..." 
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="auto-sync" 
                  checked={autoSync}
                  onCheckedChange={setAutoSync}
                />
                <Label htmlFor="auto-sync">Synchronisation automatique</Label>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sync-interval">Intervalle de sync (min)</Label>
                  <Input id="sync-interval" type="number" defaultValue="5" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeout">Timeout (sec)</Label>
                  <Input id="timeout" type="number" defaultValue="30" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="retry">Tentatives</Label>
                  <Input id="retry" type="number" defaultValue="3" />
                </div>
              </div>
              
              <Button className="bg-fleet-blue">Sauvegarder la configuration</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuration des Webhooks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="webhook-url">URL du Webhook</Label>
                  <Input id="webhook-url" placeholder="https://votre-app.com/webhook" />
                </div>
                
                <div className="space-y-2">
                  <Label>Événements à écouter</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "Nouvelle maintenance",
                      "Maintenance terminée",
                      "Alerte véhicule",
                      "Changement de statut",
                      "Nouveau document",
                      "Expiration document"
                    ].map((event) => (
                      <div key={event} className="flex items-center space-x-2">
                        <input type="checkbox" id={event} className="rounded" />
                        <Label htmlFor={event} className="text-sm">{event}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button className="bg-fleet-blue">Configurer Webhook</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Logs d'intégration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 font-mono text-xs">
                <div className="flex items-center gap-2 p-2 bg-green-50 rounded">
                  <CheckCircle2 className="h-3 w-3 text-green-500" />
                  <span className="text-muted-foreground">2025-04-15 14:30:25</span>
                  <span>SAP ERP sync completed - 245 records updated</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-blue-50 rounded">
                  <Database className="h-3 w-3 text-blue-500" />
                  <span className="text-muted-foreground">2025-04-15 14:28:12</span>
                  <span>Geotab API call - Vehicle positions updated</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-red-50 rounded">
                  <AlertCircle className="h-3 w-3 text-red-500" />
                  <span className="text-muted-foreground">2025-04-15 14:25:03</span>
                  <span>Total Fuel Card API error - Timeout after 30s</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}