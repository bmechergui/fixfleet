
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Clock, User } from "lucide-react";

// Historique simulé (remplacer par objet réel ou props si besoin)
const history = [
  {
    date: "15/04/2025",
    by: "Pierre Martin",
    action: "Création de l'ordre de travail."
  },
  {
    date: "16/04/2025",
    by: "Sophie Durand",
    action: "Tâche assignée à un mécanicien."
  }
];

export function WorkOrderHistory() {
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
