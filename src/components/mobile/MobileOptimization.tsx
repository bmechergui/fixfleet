import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Smartphone, 
  MapPin, 
  Camera, 
  Mic, 
  CheckCircle2, 
  AlertTriangle,
  Navigation,
  Clock,
  Fuel,
  Wrench
} from "lucide-react";

interface MobileTask {
  id: string;
  title: string;
  vehicle: string;
  location: string;
  priority: "high" | "medium" | "low";
  estimatedTime: string;
  status: "pending" | "in-progress" | "completed";
}

const mobileTasks: MobileTask[] = [
  {
    id: "MT-001",
    title: "Inspection freins",
    vehicle: "Renault Clio (AB-123-CD)",
    location: "Atelier principal",
    priority: "high",
    estimatedTime: "45 min",
    status: "pending"
  },
  {
    id: "MT-002",
    title: "Vidange moteur",
    vehicle: "Peugeot 308 (EF-456-GH)",
    location: "Poste A2",
    priority: "medium",
    estimatedTime: "30 min",
    status: "in-progress"
  }
];

const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case "high":
      return <Badge variant="destructive">Urgent</Badge>;
    case "medium":
      return <Badge variant="outline" className="border-orange-500 text-orange-500">Moyen</Badge>;
    case "low":
      return <Badge variant="outline" className="border-green-500 text-green-500">Faible</Badge>;
    default:
      return null;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    case "in-progress":
      return <Clock className="h-4 w-4 text-orange-500" />;
    default:
      return <AlertTriangle className="h-4 w-4 text-red-500" />;
  }
};

export function MobileOptimization() {
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [voiceNote, setVoiceNote] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const handleStartTask = (taskId: string) => {
    setSelectedTask(taskId);
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    // Simulation d'enregistrement vocal
    if (!isRecording) {
      setTimeout(() => {
        setVoiceNote("Inspection des plaquettes terminée. Usure à 70%. Remplacement recommandé dans 2 mois.");
        setIsRecording(false);
      }, 3000);
    }
  };

  return (
    <div className="space-y-4 max-w-md mx-auto p-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Smartphone className="h-5 w-5" />
            Interface Mobile Mécanicien
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="tasks" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="tasks">Tâches</TabsTrigger>
              <TabsTrigger value="inspection">Inspection</TabsTrigger>
              <TabsTrigger value="report">Rapport</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tasks" className="space-y-3 mt-4">
              {mobileTasks.map((task) => (
                <Card key={task.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(task.status)}
                        <h3 className="font-medium text-sm">{task.title}</h3>
                      </div>
                      {getPriorityBadge(task.priority)}
                    </div>
                    
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {task.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {task.estimatedTime}
                      </div>
                      <p className="font-medium text-foreground">{task.vehicle}</p>
                    </div>
                    
                    <div className="flex gap-2 mt-3">
                      <Button 
                        size="sm" 
                        className="flex-1 text-xs"
                        onClick={() => handleStartTask(task.id)}
                        disabled={task.status === "completed"}
                      >
                        {task.status === "pending" ? "Commencer" : 
                         task.status === "in-progress" ? "Continuer" : "Terminé"}
                      </Button>
                      <Button size="sm" variant="outline" className="px-2">
                        <Navigation className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="inspection" className="space-y-4 mt-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Checklist d'inspection</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { item: "Niveau d'huile", status: "ok" },
                    { item: "Pression pneus", status: "warning" },
                    { item: "Freins", status: "pending" },
                    { item: "Éclairage", status: "ok" }
                  ].map((check, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm">{check.item}</span>
                      <div className="flex gap-1">
                        <Button size="sm" variant={check.status === "ok" ? "default" : "outline"} className="h-6 w-6 p-0">
                          ✓
                        </Button>
                        <Button size="sm" variant={check.status === "warning" ? "destructive" : "outline"} className="h-6 w-6 p-0">
                          !
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Camera className="h-3 w-3 mr-1" />
                      Photo
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={handleVoiceRecord}
                    >
                      <Mic className={`h-3 w-3 mr-1 ${isRecording ? 'text-red-500' : ''}`} />
                      {isRecording ? "Arrêter" : "Vocal"}
                    </Button>
                  </div>
                  
                  {voiceNote && (
                    <div className="mt-3 p-2 bg-muted rounded text-xs">
                      <strong>Note vocale:</strong> {voiceNote}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="report" className="space-y-4 mt-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Rapport d'intervention</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <label className="text-xs font-medium">Travaux effectués</label>
                    <Input placeholder="Résumé des travaux..." className="text-xs" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-medium">Pièces utilisées</label>
                    <Input placeholder="Liste des pièces..." className="text-xs" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-xs font-medium">Temps passé</label>
                      <Input placeholder="45 min" className="text-xs" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium">Coût</label>
                      <Input placeholder="120 €" className="text-xs" />
                    </div>
                  </div>
                  
                  <Button className="w-full mt-4" size="sm">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Finaliser l'intervention
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Widget de statut rapide */}
      <Card className="bg-gradient-to-r from-blue-50 to-blue-100">
        <CardContent className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wrench className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">Pierre Martin</span>
            </div>
            <Badge className="bg-green-500">En service</Badge>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-2 text-xs">
            <div className="text-center">
              <div className="font-bold">2/5</div>
              <div className="text-muted-foreground">Tâches</div>
            </div>
            <div className="text-center">
              <div className="font-bold">3.5h</div>
              <div className="text-muted-foreground">Temps</div>
            </div>
            <div className="text-center">
              <div className="font-bold">A2</div>
              <div className="text-muted-foreground">Poste</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}