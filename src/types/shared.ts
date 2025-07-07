// Types partagés pour la logique métier
export interface Vehicle {
  id: string;
  registrationNumber: string;
  brand: string;
  model: string;
  year: number;
  driver?: string;
  group?: string;
  status: "active" | "maintenance" | "inactive" | "in-workshop" | "waiting";
  kilometers: number;
  lastMaintenanceDate?: string;
  nextMaintenanceDate?: string;
  nextMaintenanceKm?: number;
  documents?: VehicleDocument[];
}

export interface VehicleDocument {
  id: string;
  name: string;
  expirationDate: string;
  status: "valid" | "to-renew" | "expired";
}

export interface Mechanic {
  id: string;
  name: string;
  speciality: string;
  currentAssignments: number;
  status: "available" | "busy" | "off";
  skills: string[];
  workingHours: {
    start: string;
    end: string;
  };
}

export interface MaintenanceRecord {
  id: string;
  type: string;
  vehicleId: string;
  vehicleName: string;
  date: string;
  status: "planned" | "in-progress" | "completed" | "cancelled";
  mechanicId?: string;
  mechanicName?: string;
  description: string;
  category: "preventive" | "corrective" | "periodic" | "predictive";
  urgency?: "haute" | "moyenne" | "faible";
  cost?: string;
  estimatedDuration?: number; // en heures
  actualDuration?: number;
  workshopBay?: string;
  nextMaintenanceKm?: number;
  nextMaintenanceDate?: string;
  parts?: MaintenancePart[];
  tasks?: MaintenanceTask[];
}

export interface MaintenancePart {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  inStock: boolean;
}

export interface MaintenanceTask {
  id: string;
  description: string;
  estimatedTime: number;
  actualTime?: number;
  status: "pending" | "in-progress" | "completed";
  assignedMechanicId?: string;
}

export interface WorkshopBay {
  id: string;
  name: string;
  type: "general" | "specialized";
  status: "free" | "occupied" | "maintenance";
  currentVehicleId?: string;
  equipment: string[];
}

export interface Alert {
  id: string;
  type: "maintenance_due" | "document_expiring" | "breakdown" | "inspection_due";
  vehicleId: string;
  vehicleName: string;
  priority: "high" | "medium" | "low";
  message: string;
  dueDate?: string;
  isAcknowledged: boolean;
  createdAt: string;
}

export interface PlanningEntry {
  id: string;
  maintenanceId: string;
  vehicleId: string;
  mechanicId: string;
  workshopBayId: string;
  scheduledDate: string;
  scheduledTime: string;
  estimatedDuration: number;
  status: "scheduled" | "confirmed" | "in-progress" | "completed" | "cancelled";
  notes?: string;
}

// États globaux pour la logique métier
export interface FleetState {
  vehicles: Vehicle[];
  mechanics: Mechanic[];
  maintenanceRecords: MaintenanceRecord[];
  workshopBays: WorkshopBay[];
  alerts: Alert[];
  planningEntries: PlanningEntry[];
}

// Actions pour la logique métier
export type FleetAction = 
  | { type: "CREATE_MAINTENANCE"; payload: Omit<MaintenanceRecord, "id"> }
  | { type: "UPDATE_MAINTENANCE"; payload: { id: string; updates: Partial<MaintenanceRecord> } }
  | { type: "ASSIGN_MECHANIC"; payload: { maintenanceId: string; mechanicId: string } }
  | { type: "ASSIGN_WORKSHOP_BAY"; payload: { maintenanceId: string; bayId: string } }
  | { type: "UPDATE_VEHICLE_STATUS"; payload: { vehicleId: string; status: Vehicle["status"] } }
  | { type: "COMPLETE_MAINTENANCE"; payload: { maintenanceId: string; cost: string; actualDuration: number } }
  | { type: "CREATE_ALERT"; payload: Omit<Alert, "id" | "createdAt"> }
  | { type: "ACKNOWLEDGE_ALERT"; payload: { alertId: string } }
  | { type: "SCHEDULE_MAINTENANCE"; payload: Omit<PlanningEntry, "id"> };