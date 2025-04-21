
export interface Maintenance {
  id: string;
  type: string;
  vehicle: string;
  date: string;
  dueDate?: string;
  status: "planned" | "in-progress" | "completed";
  mechanic: string;
  description: string;
  category: "preventive" | "corrective" | "periodic" | "predictive";
  basedOn?: "kilometers" | "time";
  kilometers?: string;
  periodicity?: string;
  nextDate?: string;
  cost?: string;
  urgency?: "haute" | "moyenne" | "faible";
  // Ajouté pour gérer l’urgence
  alarmDescription?: string;
}
