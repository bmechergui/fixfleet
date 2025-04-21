
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

export interface WorkOrderTask {
  id: string;
  label: string;
  assignedTo: string;
  status: "pending" | "done";
}

interface WorkOrderTasksProps {
  tasks: WorkOrderTask[];
  onAssignTask?: (taskId: string, assignee: string) => void;
}

export const WorkOrderTasks = ({ tasks, onAssignTask }: WorkOrderTasksProps) => (
  <div className="space-y-3">
    <div className="font-bold mb-2">Liste des tâches</div>
    <ul className="divide-y">
      {tasks.map(task => (
        <li key={task.id} className="flex items-center justify-between py-2">
          <div>
            <span className="font-medium">{task.label}</span>
            <Badge variant="outline" className="ml-2">{task.status === "done" ? "Terminée" : "À faire"}</Badge>
            <span className="ml-4 text-xs flex items-center gap-1 text-muted-foreground">
              <User className="h-4 w-4 inline" />
              <span>{task.assignedTo || "Non assigné"}</span>
            </span>
          </div>
          {onAssignTask && (
            <Button size="sm" variant="outline" className="ml-2" onClick={() => onAssignTask(task.id, "Jean Dubois")}>
              Assigner
            </Button>
          )}
        </li>
      ))}
    </ul>
  </div>
);
