
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Maintenance } from "@/types/maintenance";

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
          <div><span className="font-bold">Statut :</span> {maintenance.status}</div>
          <div><span className="font-bold">Mécanicien :</span> {maintenance.mechanic}</div>
          <div><span className="font-bold">Description :</span> {maintenance.description}</div>
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
