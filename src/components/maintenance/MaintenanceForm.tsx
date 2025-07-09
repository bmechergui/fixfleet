import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { Maintenance } from "@/types/maintenance";
import React from "react";

export interface MaintenanceFormProps {
  onSubmit?: (data: any) => void;
}

export function MaintenanceForm({ onSubmit }: MaintenanceFormProps) {
  const [selectedCategory, setSelectedCategory] = useState<Maintenance['category']>("preventive");
  const [basedOn, setBasedOn] = useState<"kilometers" | "time">("kilometers");
  const [form, setForm] = useState<any>({});

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value as Maintenance['category']);
    setForm((prev: any) => ({ ...prev, category: value }));
  };

  const handleBasedOnChange = (value: string) => {
    setBasedOn(value as "kilometers" | "time");
    setForm((prev: any) => ({ ...prev, basedOn: value }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value, type } = e.target;
    let fieldValue: string | boolean = value;
    if (type === "checkbox") {
      fieldValue = (e.target as HTMLInputElement).checked;
    }
    setForm((prev: any) => ({
      ...prev,
      [id]: fieldValue,
    }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setForm((prev: any) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({
        ...form,
        category: selectedCategory,
        basedOn,
      });
    }
  };

  return (
    <>
      {/* Commentaire explicatif et rappel */}
      <div className="mb-4 p-3 bg-blue-50 border border-blue-100 rounded text-blue-900 text-sm">
        <strong>Rappel :</strong> Veuillez remplir tous les champs afin d'ajouter une nouvelle maintenance. Les informations saisies permettront d'assurer un meilleur suivi et de planifier efficacement les interventions.
      </div>
      <form onSubmit={handleSubmit} className="grid gap-4 py-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="id">ID</Label>
          <Input id="id" placeholder="ID unique" disabled value="M-XXX" />
          <p className="text-xs text-muted-foreground">Attribué automatiquement</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">Nom</Label>
          <Input id="name" placeholder="Nom de la maintenance" onChange={handleChange} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" placeholder="Détails des travaux à effectuer..." rows={3} onChange={handleChange} />
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
              <Input id="kilometers" type="number" placeholder="Ex: 10000" onChange={handleChange} />
            </div>
          ) : (
            <div className="space-y-2 mt-2">
              <Label htmlFor="time">Date</Label>
              <Input id="time" type="date" onChange={handleChange} />
            </div>
          )}
        </div>
      )}
      {selectedCategory === "periodic" && (
        <div className="space-y-3 border p-3 rounded-md">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="periodicity">Périodicité</Label>
              <Select onValueChange={(value) => handleSelectChange("periodicity", value)}>
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
              <Input id="nextDate" type="date" onChange={handleChange} />
            </div>
          </div>
        </div>
      )}
      {selectedCategory === "predictive" && (
        <div className="space-y-2 border p-3 rounded-md">
          <Label htmlFor="sensorData">Basée sur des données capteurs</Label>
          <Select onValueChange={(value) => handleSelectChange("sensorData", value)}>
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
          <Select onValueChange={(value) => handleSelectChange("vehicle", value)}>
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
      </div>
      <Button type="submit" className="w-full mt-4">Enregistrer</Button>
    </form>
    </>
  );
} 