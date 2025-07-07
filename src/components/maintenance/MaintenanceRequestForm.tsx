import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Clock } from "lucide-react";

interface MaintenanceRequestFormProps {
  onSubmit: (request: MaintenanceRequest) => void;
  vehicles: Array<{ id: string; brand: string; model: string; registrationNumber: string }>;
}

interface MaintenanceRequest {
  vehicleId: string;
  description: string;
  isUrgent: boolean;
  isImportant: boolean;
  requestedBy: string;
  type: string;
}

export function MaintenanceRequestForm({ onSubmit, vehicles }: MaintenanceRequestFormProps) {
  const [vehicleId, setVehicleId] = useState("");
  const [description, setDescription] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);
  const [isImportant, setIsImportant] = useState(false);
  const [requestedBy, setRequestedBy] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = () => {
    if (!vehicleId || !description || !requestedBy || !type) {
      return;
    }

    onSubmit({
      vehicleId,
      description,
      isUrgent,
      isImportant,
      requestedBy,
      type
    });

    // Reset form
    setVehicleId("");
    setDescription("");
    setIsUrgent(false);
    setIsImportant(false);
    setRequestedBy("");
    setType("");
  };

  const getEisenhowerCategory = () => {
    if (isUrgent && isImportant) return { category: "Urgent & Important", color: "text-red-600", bg: "bg-red-50" };
    if (!isUrgent && isImportant) return { category: "Important non urgent", color: "text-orange-600", bg: "bg-orange-50" };
    if (isUrgent && !isImportant) return { category: "Urgent non important", color: "text-blue-600", bg: "bg-blue-50" };
    return { category: "Ni urgent ni important", color: "text-gray-600", bg: "bg-gray-50" };
  };

  const eisenhower = getEisenhowerCategory();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Nouvelle demande de maintenance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="vehicle">Véhicule concerné *</Label>
              <Select value={vehicleId} onValueChange={setVehicleId}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un véhicule" />
                </SelectTrigger>
                <SelectContent>
                  {vehicles.map((vehicle) => (
                    <SelectItem key={vehicle.id} value={vehicle.id}>
                      {vehicle.brand} {vehicle.model} ({vehicle.registrationNumber})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Type d'intervention *</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner le type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Vidange">Vidange</SelectItem>
                  <SelectItem value="Freinage">Freinage</SelectItem>
                  <SelectItem value="Pneus">Pneus</SelectItem>
                  <SelectItem value="Batterie">Batterie</SelectItem>
                  <SelectItem value="Climatisation">Climatisation</SelectItem>
                  <SelectItem value="Diagnostic">Diagnostic</SelectItem>
                  <SelectItem value="Révision">Révision générale</SelectItem>
                  <SelectItem value="Autre">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description du problème *</Label>
            <Textarea
              id="description"
              placeholder="Décrivez en détail le problème ou l'intervention nécessaire..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="requestedBy">Demandé par *</Label>
            <Input
              id="requestedBy"
              placeholder="Nom du demandeur"
              value={requestedBy}
              onChange={(e) => setRequestedBy(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="urgent"
                checked={isUrgent}
                onCheckedChange={(checked) => setIsUrgent(checked as boolean)}
              />
              <Label htmlFor="urgent" className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-red-500" />
                Est-ce urgent ?
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="important"
                checked={isImportant}
                onCheckedChange={(checked) => setIsImportant(checked as boolean)}
              />
              <Label htmlFor="important" className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-orange-500" />
                Est-ce important ?
              </Label>
            </div>
          </div>

          {(isUrgent || isImportant) && (
            <Card className={`${eisenhower.bg} border-l-4 ${eisenhower.color.replace('text-', 'border-')}`}>
              <CardContent className="pt-4">
                <div className={`font-medium ${eisenhower.color}`}>
                  Catégorie Eisenhower: {eisenhower.category}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {isUrgent && isImportant && "Traitement immédiat requis"}
                  {!isUrgent && isImportant && "À planifier rapidement"}
                  {isUrgent && !isImportant && "Déléguer si possible"}
                  {!isUrgent && !isImportant && "À traiter quand possible"}
                </div>
              </CardContent>
            </Card>
          )}

          <Button 
            onClick={handleSubmit} 
            className="w-full bg-fleet-blue hover:bg-fleet-lightBlue"
            disabled={!vehicleId || !description || !requestedBy || !type}
          >
            Soumettre la demande
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}