
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Bell } from "lucide-react";
import { WorkOrderHistory } from "./WorkOrderHistory";

interface WorkOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  maintenanceId: string | null;
}

const mechanicsOrManagers = [
  { value: "Pierre Martin", label: "Pierre Martin (Mécanicien)" },
  { value: "Sophie Durand", label: "Sophie Durand (Mécanicienne)" },
  { value: "Jean Dubois", label: "Jean Dubois (Mécanicien)" },
  { value: "Marie Lambert", label: "Marie Lambert (Gestionnaire de parc)" }
];

// Sample history data
const sampleHistory = [
  { date: "21/04/2025 14:30", by: "Système", action: "Création de l'ordre de travail" },
  { date: "21/04/2025 15:45", by: "Marie Lambert", action: "Attribution au mécanicien" },
  { date: "21/04/2025 16:20", by: "Pierre Martin", action: "Début des travaux" }
];

export function WorkOrderDialog({ open, onOpenChange, maintenanceId }: WorkOrderDialogProps) {
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState("");
  const [assignee, setAssignee] = useState<string | undefined>();

  if (!maintenanceId) return null;

  // Fausse logique d'alerte : si l'ID se termine par "1", on affiche une alerte fictive.
  const showAlert = maintenanceId.endsWith("1");

  const handleSubmit = () => {
    // Simulation d'action d'ordre de travail.
    console.log("Création OT pour maintenance:", maintenanceId, "| description:", description, "| tâches:", tasks, "| assigné à:", assignee);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Créer un ordre de travail</DialogTitle>
          <DialogDescription>
            Générer un ordre de travail pour la maintenance #{maintenanceId}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Alerte au-dessus de la section de responsable (mécanicien) */}
          {showAlert && (
            <Alert variant="destructive" className="flex items-center gap-3">
              <Bell className="h-4 w-4" />
              <div>
                <AlertTitle>Attention requise !</AlertTitle>
                <AlertDescription>
                  Cette maintenance est considérée comme urgente par le système.
                </AlertDescription>
              </div>
            </Alert>
          )}
          <div>
            <label className="font-medium mb-1 block">Description de l'OT</label>
            <Input
              placeholder="Ex: Vérification détaillée, liste des tâches, etc."
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label className="font-medium mb-1 block">Détails des tâches</label>
            <Textarea
              placeholder="Listez les tâches à effectuer (ex: - vidange huile, - contrôle freins...)"
              value={tasks}
              onChange={e => setTasks(e.target.value)}
              rows={3}
            />
          </div>
          <div>
            <label className="font-medium mb-1 block">Assigner à</label>
            <Select value={assignee} onValueChange={setAssignee}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un responsable" />
              </SelectTrigger>
              <SelectContent>
                {mechanicsOrManagers.map(opt => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Passing the sample history data to the WorkOrderHistory component */}
        <WorkOrderHistory history={sampleHistory} />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Annuler</Button>
          </DialogClose>
          <Button
            onClick={handleSubmit}
            className="bg-fleet-blue hover:bg-fleet-lightBlue"
            disabled={!description || !tasks || !assignee}
          >
            Créer l'ordre de travail
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
