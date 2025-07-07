import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { FileText, Plus, Trash2 } from "lucide-react";
import type { MaintenanceRecord, WorkOrder, WorkOrderTask } from "@/types/shared";

interface WorkOrderCreationProps {
  maintenance: MaintenanceRecord;
  onCreateWorkOrder: (workOrder: Omit<WorkOrder, "id" | "createdAt">) => void;
  mechanics: Array<{ id: string; name: string; speciality: string }>;
}

export function WorkOrderCreation({ maintenance, onCreateWorkOrder, mechanics }: WorkOrderCreationProps) {
  const [title, setTitle] = useState(`OT - ${maintenance.type} - ${maintenance.vehicleName}`);
  const [description, setDescription] = useState(maintenance.description);
  const [priority, setPriority] = useState<"high" | "medium" | "low">("medium");
  const [deadline, setDeadline] = useState("");
  const [tasks, setTasks] = useState<Omit<WorkOrderTask, "id">[]>([
    { title: "Inspection initiale", description: "Vérification de l'état général", status: "pending", estimatedTime: 0.5, order: 1 },
    { title: "Diagnostic", description: "Identification précise du problème", status: "pending", estimatedTime: 1, order: 2 },
    { title: "Commande de pièces", description: "Vérification et commande des pièces nécessaires", status: "pending", estimatedTime: 0.5, order: 3 },
    { title: "Intervention", description: "Réalisation de la maintenance", status: "pending", estimatedTime: 2, order: 4 },
    { title: "Test et validation", description: "Vérification du bon fonctionnement", status: "pending", estimatedTime: 0.5, order: 5 },
    { title: "Rapport final", description: "Rédaction du rapport d'intervention", status: "pending", estimatedTime: 0.5, order: 6 }
  ]);
  const [notes, setNotes] = useState("");

  const addTask = () => {
    const newTask: Omit<WorkOrderTask, "id"> = {
      title: "",
      description: "",
      status: "pending",
      estimatedTime: 1,
      order: tasks.length + 1
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (index: number, field: keyof Omit<WorkOrderTask, "id">, value: any) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = { ...updatedTasks[index], [field]: value };
    setTasks(updatedTasks);
  };

  const removeTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const assignTaskToMechanic = (index: number, mechanicId: string) => {
    updateTask(index, "assignedTo", mechanicId);
  };

  const handleCreateWorkOrder = () => {
    const workOrder: Omit<WorkOrder, "id" | "createdAt"> = {
      maintenanceId: maintenance.id,
      title,
      description,
      priority,
      deadline: deadline || undefined,
      createdBy: "Utilisateur actuel", // À remplacer par l'utilisateur connecté
      tasks: tasks.map((task, index) => ({
        ...task,
        id: `task-${index + 1}`
      })),
      status: "draft",
      notes
    };

    onCreateWorkOrder(workOrder);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-600 bg-red-50 border-red-200";
      case "medium": return "text-orange-600 bg-orange-50 border-orange-200";
      case "low": return "text-blue-600 bg-blue-50 border-blue-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Création de l'Ordre de Travail
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titre de l'OT</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Priorité</Label>
              <Select value={priority} onValueChange={(value: "high" | "medium" | "low") => setPriority(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">Haute</SelectItem>
                  <SelectItem value="medium">Moyenne</SelectItem>
                  <SelectItem value="low">Faible</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description détaillée</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="deadline">Date limite (optionnel)</Label>
              <Input
                id="deadline"
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-center">
              <Badge className={`px-3 py-1 ${getPriorityColor(priority)}`}>
                Priorité: {priority === "high" ? "Haute" : priority === "medium" ? "Moyenne" : "Faible"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Liste des tâches</CardTitle>
          <Button onClick={addTask} size="sm" variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Ajouter une tâche
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {tasks.map((task, index) => (
            <Card key={index} className="p-4">
              <div className="grid grid-cols-12 gap-4 items-start">
                <div className="col-span-3">
                  <Label className="text-xs">Titre</Label>
                  <Input
                    value={task.title}
                    onChange={(e) => updateTask(index, "title", e.target.value)}
                    placeholder="Titre de la tâche"
                    className="mt-1"
                  />
                </div>
                <div className="col-span-4">
                  <Label className="text-xs">Description</Label>
                  <Input
                    value={task.description}
                    onChange={(e) => updateTask(index, "description", e.target.value)}
                    placeholder="Description"
                    className="mt-1"
                  />
                </div>
                <div className="col-span-2">
                  <Label className="text-xs">Temps estimé (h)</Label>
                  <Input
                    type="number"
                    step="0.5"
                    value={task.estimatedTime}
                    onChange={(e) => updateTask(index, "estimatedTime", parseFloat(e.target.value))}
                    className="mt-1"
                  />
                </div>
                <div className="col-span-2">
                  <Label className="text-xs">Assigné à</Label>
                  <Select value={task.assignedTo || ""} onValueChange={(value) => assignTaskToMechanic(index, value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Mécanicien" />
                    </SelectTrigger>
                    <SelectContent>
                      {mechanics.map((mechanic) => (
                        <SelectItem key={mechanic.id} value={mechanic.id}>
                          {mechanic.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-1 flex items-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeTask(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <Label htmlFor="notes">Notes supplémentaires</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Notes, instructions spéciales, précautions..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button variant="outline">Sauvegarder comme brouillon</Button>
        <Button onClick={handleCreateWorkOrder} className="bg-fleet-blue hover:bg-fleet-lightBlue">
          Créer l'Ordre de Travail
        </Button>
      </div>
    </div>
  );
}