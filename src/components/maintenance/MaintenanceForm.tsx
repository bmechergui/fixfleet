
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Maintenance } from "@/types/maintenance";

export function MaintenanceForm() {
  const [selectedCategory, setSelectedCategory] = useState<Maintenance['category']>("preventive");
  const [basedOn, setBasedOn] = useState<"kilometers" | "time">("kilometers");
  const [isCompleted, setIsCompleted] = useState(false);
  const [cost, setCost] = useState("");

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value as Maintenance['category']);
  };

  const handleBasedOnChange = (value: string) => {
    setBasedOn(value as "kilometers" | "time");
  };

  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="id">ID</Label>
          <Input id="id" placeholder="ID unique" disabled value="M-XXX" />
          <p className="text-xs text-muted-foreground">Attribué automatiquement</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Nom</Label>
          <Input id="name" placeholder="Nom de la maintenance" />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea 
          id="description" 
          placeholder="Détails des travaux à effectuer..."
          rows={3}
        />
      </div>
      
      <div className="space-y-2">
        <Label>Catégorie</Label>
        <ToggleGroup type="single" value={selectedCategory} onValueChange={handleCategoryChange} className="flex flex-wrap gap-2">
          <ToggleGroupItem value="preventive" className="data-[state=on]:bg-green-100 data-[state=on]:text-green-700 data-[state=on]:border-green-300">
            Préventive
          </ToggleGroupItem>
          <ToggleGroupItem value="corrective" className="data-[state=on]:bg-red-100 data-[state=on]:text-red-700 data-[state=on]:border-red-300">
            Corrective
          </ToggleGroupItem>
          <ToggleGroupItem value="periodic" className="data-[state=on]:bg-blue-100 data-[state=on]:text-blue-700 data-[state=on]:border-blue-300">
            Périodique
          </ToggleGroupItem>
          <ToggleGroupItem value="predictive" className="data-[state=on]:bg-purple-100 data-[state=on]:text-purple-700 data-[state=on]:border-purple-300">
            Prédictive
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      
      {selectedCategory === "preventive" && (
        <div className="space-y-3 border p-3 rounded-md">
          <Label>Basée sur</Label>
          <RadioGroup defaultValue="kilometers" className="flex space-x-4" onValueChange={handleBasedOnChange}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="kilometers" id="r1" />
              <Label htmlFor="r1">Kilométrage</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="time" id="r2" />
              <Label htmlFor="r2">Temps (date)</Label>
            </div>
          </RadioGroup>
          
          {basedOn === "kilometers" ? (
            <div className="space-y-2 mt-2">
              <Label htmlFor="kilometers">Kilométrage</Label>
              <Input id="kilometers" type="number" placeholder="Ex: 10000" />
            </div>
          ) : (
            <div className="space-y-2 mt-2">
              <Label htmlFor="time">Date</Label>
              <Input id="time" type="date" />
            </div>
          )}
        </div>
      )}
      
      {selectedCategory === "periodic" && (
        <div className="space-y-3 border p-3 rounded-md">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="periodicity">Périodicité</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1m">1 mois</SelectItem>
                  <SelectItem value="3m">3 mois</SelectItem>
                  <SelectItem value="6m">6 mois</SelectItem>
                  <SelectItem value="1y">1 an</SelectItem>
                  <SelectItem value="2y">2 ans</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="nextDate">Prochaine date</Label>
              <Input id="nextDate" type="date" />
            </div>
          </div>
        </div>
      )}
      
      {selectedCategory === "predictive" && (
        <div className="space-y-2 border p-3 rounded-md">
          <Label htmlFor="sensorData">Basée sur des données capteurs</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un type d'alerte" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="engine">Anomalie moteur</SelectItem>
              <SelectItem value="brakes">Usure des freins</SelectItem>
              <SelectItem value="battery">État de la batterie</SelectItem>
              <SelectItem value="fuel">Consommation carburant</SelectItem>
              <SelectItem value="custom">Autre</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="vehicle">Véhicule</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un véhicule" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="clio">Renault Clio (AB-123-CD)</SelectItem>
              <SelectItem value="308">Peugeot 308 (EF-456-GH)</SelectItem>
              <SelectItem value="c3">Citroën C3 (IJ-789-KL)</SelectItem>
              <SelectItem value="transit">Ford Transit (MN-012-OP)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="date">Date planifiée</Label>
          <Input id="date" type="date" />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="mechanic">Mécanicien assigné</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un mécanicien" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pierre">Pierre Martin</SelectItem>
              <SelectItem value="sophie">Sophie Durand</SelectItem>
              <SelectItem value="jean">Jean Dubois</SelectItem>
              <SelectItem value="marie">Marie Lambert</SelectItem>
              <SelectItem value="none">Non assigné</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Statut</Label>
          <Select defaultValue="planned">
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="planned">Planifié</SelectItem>
              <SelectItem value="in-progress">En cours</SelectItem>
              <SelectItem value="completed">Terminé</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="completed" 
            checked={isCompleted}
            onCheckedChange={(checked) => setIsCompleted(checked as boolean)}
          />
          <label className="text-sm font-medium leading-none">
            Intervention terminée
          </label>
        </div>
      </div>
      
      {isCompleted && (
        <div className="space-y-2">
          <Label htmlFor="cost">Coût (si terminé)</Label>
          <div className="relative">
            <Input 
              id="cost"
              placeholder="Ex: 120"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <span className="text-gray-500">€</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
