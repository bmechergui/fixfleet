import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import React from "react";

export interface PlanningFormProps {
  onSubmit?: (data: any) => void;
}

export function PlanningForm({ onSubmit }: PlanningFormProps) {
  const [form, setForm] = useState<any>({
    maintenance: "",
    vehicle: "",
    atelier: "",
    date: "",
    time: "09:00",
    duration: "2",
    mechanic: "",
    completed: false,
  });

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
      onSubmit(form);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <h2 className="text-lg font-semibold">Planifier une intervention</h2>
      <div className="space-y-2">
        <Label htmlFor="maintenance">Maintenance à planifier</Label>
        <Select onValueChange={(value) => handleSelectChange("maintenance", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner une maintenance" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="vidange">Vidange</SelectItem>
            <SelectItem value="freins">Remplacement plaquettes</SelectItem>
            <SelectItem value="batterie">Changement batterie</SelectItem>
            <SelectItem value="revision">Révision générale</SelectItem>
          </SelectContent>
        </Select>
      </div>
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
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date">Date planifiée</Label>
          <Input id="date" type="date" onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="time">Heure</Label>
          <Input id="time" type="time" value={form.time} onChange={handleChange} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="duration">Durée estimée (heures)</Label>
        <Input id="duration" type="number" value={form.duration} onChange={handleChange} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="atelier">Atelier</Label>
        <Select onValueChange={(value) => handleSelectChange("atelier", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner un atelier" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="atelier1">Atelier principal</SelectItem>
            <SelectItem value="atelier2">Atelier secondaire</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="mechanic">Mécanicien assigné</Label>
        <Select onValueChange={(value) => handleSelectChange("mechanic", value)}>
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
      <Button type="submit" className="w-full mt-4">Planifier l'intervention</Button>
    </form>
  );
} 