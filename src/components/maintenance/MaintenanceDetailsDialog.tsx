
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Maintenance } from "@/types/maintenance";

const getUrgencyBadge = (urgency?: Maintenance['urgency']) => {
  switch (urgency) {
    case "haute":
      return <span className="text-red-600 font-bold ml-2">Haute</span>;
    case "moyenne":
      return <span className="text-orange-500 font-bold ml-2">Moyenne</span>;
    case "faible":
      return <span className="text-blue-600 font-bold ml-2">Faible</span>;
    default:
      return <span className="text-muted ml-2">-</span>;
  }
};

interface MaintenanceDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  maintenance: Maintenance | null;
}

export function MaintenanceDetailsDialog({
  open,
  onOpenChange,
  maintenance
}: MaintenanceDetailsDialogProps) {
  if (!maintenance) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Détails de la maintenance #{maintenance.id}</DialogTitle>
          <DialogDescription>
            Consultez les informations complètes sur cette maintenance.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <div><span className="font-bold">Type :</span> {maintenance.type}</div>
          <div><span className="font-bold">Véhicule :</span> {maintenance.vehicle}</div>
          <div><span className="font-bold">Date :</span> {maintenance.date}</div>
          <div><span className="font-bold">Catégorie :</span> {maintenance.category}</div>
          <div>
            <span className="font-bold">Urgence :</span> {getUrgencyBadge(maintenance.urgency)}
          </div>
          <div><span className="font-bold">Statut :</span> {maintenance.status}</div>
          <div><span className="font-bold">Mécanicien :</span> {maintenance.mechanic}</div>
          <div><span className="font-bold">Description :</span> {maintenance.description}</div>
          {maintenance.alarmDescription && (
            <div>
              <span className="font-bold">État de l’alarme :</span> <span>{maintenance.alarmDescription}</span>
            </div>
          )}
          {maintenance.cost && (
            <div><span className="font-bold">Coût :</span> {maintenance.cost}</div>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Fermer</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
