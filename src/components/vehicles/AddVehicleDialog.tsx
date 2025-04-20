
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";

interface AddVehicleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddVehicleDialog({ open, onOpenChange }: AddVehicleDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-fleet-blue hover:bg-fleet-lightBlue">
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un véhicule
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Ajouter un nouveau véhicule</DialogTitle>
          <DialogDescription>
            Saisissez les informations du véhicule à ajouter au parc.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="registration">Immatriculation</Label>
              <Input id="registration" placeholder="AB-123-CD" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="year">Année</Label>
              <Input id="year" type="number" placeholder="2023" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="brand">Marque</Label>
              <Input id="brand" placeholder="Renault" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="model">Modèle</Label>
              <Input id="model" placeholder="Clio" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="driver">Chauffeur assigné</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un chauffeur" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jean">Jean Dupont</SelectItem>
                  <SelectItem value="marie">Marie Martin</SelectItem>
                  <SelectItem value="paul">Paul Bernard</SelectItem>
                  <SelectItem value="none">Non assigné</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="group">Groupe</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un groupe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="service">Service</SelectItem>
                  <SelectItem value="livraison">Livraison</SelectItem>
                  <SelectItem value="direction">Direction</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Statut</Label>
            <Select defaultValue="active">
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">En service</SelectItem>
                <SelectItem value="maintenance">En maintenance</SelectItem>
                <SelectItem value="inactive">Hors service</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Annuler</Button>
          <Button className="bg-fleet-blue hover:bg-fleet-lightBlue" onClick={() => onOpenChange(false)}>Ajouter</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
