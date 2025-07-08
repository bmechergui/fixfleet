import { z } from 'zod';

// Schémas de validation pour les formulaires
export const maintenanceRequestSchema = z.object({
  vehicleId: z.string().min(1, "Veuillez sélectionner un véhicule"),
  description: z.string().min(10, "La description doit contenir au moins 10 caractères"),
  requestedBy: z.string().min(2, "Le nom du demandeur est requis"),
  type: z.string().min(1, "Veuillez sélectionner un type d'intervention"),
  isUrgent: z.boolean().default(false),
  isImportant: z.boolean().default(false)
});

export const vehicleSchema = z.object({
  registrationNumber: z.string().min(1, "L'immatriculation est requise"),
  brand: z.string().min(1, "La marque est requise"),
  model: z.string().min(1, "Le modèle est requis"),
  year: z.number().min(1900).max(new Date().getFullYear() + 1),
  driver: z.string().optional(),
  group: z.string().optional(),
  status: z.enum(["active", "maintenance", "inactive", "in-workshop", "waiting"]).default("active")
});

export const mechanicSchema = z.object({
  name: z.string().min(2, "Le nom est requis"),
  speciality: z.string().min(1, "La spécialité est requise"),
  skills: z.array(z.string()).default([]),
  workingHours: z.object({
    start: z.string(),
    end: z.string()
  })
});

export type MaintenanceRequestFormData = z.infer<typeof maintenanceRequestSchema>;
export type VehicleFormData = z.infer<typeof vehicleSchema>;
export type MechanicFormData = z.infer<typeof mechanicSchema>;