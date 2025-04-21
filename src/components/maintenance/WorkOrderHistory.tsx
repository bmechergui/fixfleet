
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Clock, User } from "lucide-react";

export interface WorkOrderTask {
  id: string;
  label: string;
  assignedTo: string;
  status: "pending" | "done";
}

interface WorkOrderHistoryProps {
  history: {
    date: string;
    by: string;
    action: string;
  }[];
}

export function WorkOrderHistory({ history }: WorkOrderHistoryProps) {
  return (
    <div className="mt-4">
      <Alert className="mb-2">
        <Clock className="h-4 w-4" />
        <AlertTitle>Historique</AlertTitle>
        <AlertDescription>
          <ul className="list-disc ml-5 space-y-1">
            {history.map((item, idx) => (
              <li key={idx}>
                <span className="font-medium">{item.date}</span> — {item.action} <span className="text-xs text-muted-foreground">({item.by})</span>
              </li>
            ))}
          </ul>
        </AlertDescription>
      </Alert>
    </div>
  );
}
