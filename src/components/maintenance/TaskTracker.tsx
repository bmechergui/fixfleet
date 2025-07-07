import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Clock, Play, Pause, MessageSquare } from "lucide-react";
import type { WorkOrder, WorkOrderTask } from "@/types/shared";

interface TaskTrackerProps {
  workOrder: WorkOrder;
  onUpdateTask: (taskId: string, updates: Partial<WorkOrderTask>) => void;
  onCompleteWorkOrder: () => void;
}

export function TaskTracker({ workOrder, onUpdateTask, onCompleteWorkOrder }: TaskTrackerProps) {
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [comment, setComment] = useState("");

  const getTaskStatusColor = (status: WorkOrderTask["status"]) => {
    switch (status) {
      case "pending": return "border-gray-300 bg-gray-50";
      case "in-progress": return "border-blue-300 bg-blue-50";
      case "completed": return "border-green-300 bg-green-50";
      default: return "border-gray-300 bg-gray-50";
    }
  };

  const getStatusBadge = (status: WorkOrderTask["status"]) => {
    switch (status) {
      case "pending": return <Badge variant="outline" className="border-gray-500 text-gray-500">En attente</Badge>;
      case "in-progress": return <Badge variant="outline" className="border-blue-500 text-blue-500">En cours</Badge>;
      case "completed": return <Badge className="bg-green-500">Terminé</Badge>;
      default: return null;
    }
  };

  const updateTaskStatus = (taskId: string, status: WorkOrderTask["status"]) => {
    const updates: Partial<WorkOrderTask> = { status };
    
    if (status === "in-progress") {
      updates.actualTime = 0; // Commencer le chrono
    } else if (status === "completed") {
      const task = workOrder.tasks.find(t => t.id === taskId);
      if (task && !task.actualTime) {
        updates.actualTime = task.estimatedTime; // Utiliser le temps estimé par défaut
      }
    }
    
    onUpdateTask(taskId, updates);
  };

  const completedTasks = workOrder.tasks.filter(task => task.status === "completed").length;
  const totalTasks = workOrder.tasks.length;
  const completionPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const canCompleteWorkOrder = completedTasks === totalTasks;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Suivi de l'OT: {workOrder.title}</span>
            <Badge className={workOrder.priority === "high" ? "bg-red-500" : workOrder.priority === "medium" ? "bg-orange-500" : "bg-blue-500"}>
              {workOrder.priority === "high" ? "Haute" : workOrder.priority === "medium" ? "Moyenne" : "Faible"} priorité
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Progression globale</span>
                <span>{completedTasks}/{totalTasks} tâches terminées</span>
              </div>
              <Progress value={completionPercentage} className="h-3" />
            </div>
            
            <div className="text-sm text-muted-foreground">
              <p><strong>Description:</strong> {workOrder.description}</p>
              {workOrder.deadline && (
                <p><strong>Date limite:</strong> {workOrder.deadline}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {workOrder.tasks
          .sort((a, b) => a.order - b.order)
          .map((task) => (
            <Card key={task.id} className={`${getTaskStatusColor(task.status)} border-l-4`}>
              <CardContent className="pt-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium">{task.title}</h3>
                      {getStatusBadge(task.status)}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                    
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Temps estimé: {task.estimatedTime}h</span>
                      {task.actualTime && (
                        <span>Temps réel: {task.actualTime}h</span>
                      )}
                      {task.assignedTo && (
                        <span>Assigné à: {task.assignedTo}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {task.status === "pending" && (
                      <Button
                        size="sm"
                        onClick={() => updateTaskStatus(task.id, "in-progress")}
                        className="bg-blue-500 hover:bg-blue-600"
                      >
                        <Play className="h-4 w-4 mr-1" />
                        Commencer
                      </Button>
                    )}
                    
                    {task.status === "in-progress" && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateTaskStatus(task.id, "pending")}
                        >
                          <Pause className="h-4 w-4 mr-1" />
                          Pause
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => updateTaskStatus(task.id, "completed")}
                          className="bg-green-500 hover:bg-green-600"
                        >
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          Terminer
                        </Button>
                      </>
                    )}
                    
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setSelectedTask(selectedTask === task.id ? null : task.id)}
                    >
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {selectedTask === task.id && (
                  <div className="mt-4 pt-4 border-t">
                    <Textarea
                      placeholder="Ajouter un commentaire sur cette tâche..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={2}
                    />
                    <Button size="sm" className="mt-2">
                      Ajouter commentaire
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
      </div>

      {canCompleteWorkOrder && (
        <Card className="border-green-300 bg-green-50">
          <CardContent className="pt-6">
            <div className="text-center">
              <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-green-700 mb-2">
                Toutes les tâches sont terminées !
              </h3>
              <p className="text-sm text-green-600 mb-4">
                Vous pouvez maintenant clôturer cet ordre de travail.
              </p>
              <Button onClick={onCompleteWorkOrder} className="bg-green-500 hover:bg-green-600">
                Clôturer l'Ordre de Travail
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}