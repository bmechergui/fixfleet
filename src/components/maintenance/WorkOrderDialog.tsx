
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface WorkOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  maintenanceId: string | null;
}

export function WorkOrderDialog({ open, onOpenChange, maintenanceId }: WorkOrderDialogProps) {
  const [description, setDescription] = useState("");

  if (!maintenanceId) return null;

  const handleSubmit = () => {
    // Ici, traiter l'ordre de travail : on pourrait envoyer dans la base de données via API/Supabase
    // Pour ce clone on affiche juste dans la console.
    console.log("Création OT pour maintenance:", maintenanceId, " | description:", description);
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
          <label className="font-medium">Description de l'OT</label>
          <Input
            placeholder="Ex: Vérification détaillée, liste des tâches, etc."
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Annuler</Button>
          </DialogClose>
          <Button onClick={handleSubmit} className="bg-fleet-blue hover:bg-fleet-lightBlue">
            Créer l'ordre de travail
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
