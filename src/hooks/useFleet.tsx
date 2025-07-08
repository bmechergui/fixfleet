import React, { createContext, useContext, useReducer, useMemo, ReactNode } from 'react';
import type { 
  Vehicle, 
  Mechanic, 
  MaintenanceRecord, 
  WorkshopBay, 
  Alert, 
  PlanningEntry,
  FleetState,
  FleetAction 
} from '@/types/shared';

// Données initiales intégrées
const initialVehicles: Vehicle[] = [
  {
    id: "V-001",
    registrationNumber: "AB-123-CD",
    brand: "Renault",
    model: "Clio",
    year: 2021,
    driver: "Jean Dupont",
    group: "Commercial",
    status: "active",
    kilometers: 95000,
    nextMaintenanceKm: 100000,
    lastMaintenanceDate: "15/03/2025"
  },
  {
    id: "V-002",
    registrationNumber: "EF-456-GH",
    brand: "Peugeot",
    model: "308",
    year: 2020,
    driver: "Marie Martin",
    group: "Commercial",
    status: "in-workshop",
    kilometers: 32000,
    lastMaintenanceDate: "10/04/2025"
  },
  {
    id: "V-003",
    registrationNumber: "IJ-789-KL",
    brand: "Citroën",
    model: "C3",
    year: 2022,
    driver: "Paul Bernard",
    group: "Service",
    status: "waiting",
    kilometers: 28000
  }
];

const initialMechanics: Mechanic[] = [
  {
    id: "M-001",
    name: "Pierre Martin",
    speciality: "Moteur/Transmission",
    currentAssignments: 2,
    status: "busy",
    skills: ["Moteur", "Transmission", "Vidange"],
    workingHours: { start: "08:00", end: "17:00" }
  },
  {
    id: "M-002",
    name: "Sophie Durand",
    speciality: "Électronique",
    currentAssignments: 1,
    status: "busy",
    skills: ["Électronique", "Diagnostic", "Injection"],
    workingHours: { start: "07:30", end: "16:30" }
  },
  {
    id: "M-003",
    name: "Jean Dubois",
    speciality: "Général",
    currentAssignments: 0,
    status: "available",
    skills: ["Contrôle technique", "Climatisation", "Freins"],
    workingHours: { start: "08:30", end: "17:30" }
  }
];

const initialWorkshopBays: WorkshopBay[] = [
  { id: "A1", name: "Poste A1", type: "general", status: "occupied", currentVehicleId: "V-002", equipment: ["Pont élévateur", "Outillage général"] },
  { id: "A2", name: "Poste A2", type: "general", status: "free", equipment: ["Pont élévateur", "Outillage général"] },
  { id: "B1", name: "Poste B1", type: "specialized", status: "free", equipment: ["Diagnostic électronique", "Station de climatisation"] },
  { id: "B2", name: "Poste B2", type: "specialized", status: "occupied", currentVehicleId: "V-002", equipment: ["Diagnostic électronique", "Banc de freinage"] }
];

const initialMaintenanceRecords: MaintenanceRecord[] = [
  {
    id: "M-001",
    type: "Vidange",
    vehicleId: "V-001",
    vehicleName: "Renault Clio (AB-123-CD)",
    date: "15/04/2025",
    status: "completed",
    mechanicId: "M-001",
    mechanicName: "Pierre Martin",
    description: "Vidange complète avec remplacement du filtre à huile.",
    category: "preventive",
    cost: "120 €",
    actualDuration: 1.5,
    workflowStage: "closure"
  },
  {
    id: "M-002",
    type: "Diagnostic système",
    vehicleId: "V-002",
    vehicleName: "Peugeot 308 (EF-456-GH)",
    date: "14/04/2025",
    status: "in-progress",
    mechanicId: "M-002",
    mechanicName: "Sophie Durand",
    description: "Diagnostic système injection.",
    category: "corrective",
    urgency: "haute",
    isUrgent: true,
    isImportant: true,
    eisenhowerCategory: "urgent-important",
    requestedBy: "Chef d'atelier",
    workflowStage: "execution",
    estimatedDuration: 3,
    workshopBay: "B2"
  },
  {
    id: "M-003",
    type: "Vidange",
    vehicleId: "V-003",
    vehicleName: "Citroën C3 (IJ-789-KL)",
    date: "16/04/2025",
    status: "planned",
    description: "Vidange complète.",
    category: "preventive",
    estimatedDuration: 1,
    isUrgent: false,
    isImportant: true,
    eisenhowerCategory: "important-not-urgent",
    requestedBy: "Conducteur",
    workflowStage: "analysis"
  }
];

const initialAlerts: Alert[] = [
  {
    id: "A-001",
    type: "maintenance_due",
    vehicleId: "V-001",
    vehicleName: "Renault Clio (AB-123-CD)",
    priority: "medium",
    message: "Maintenance recommandée à 100,000 km (5,000 km restants)",
    dueDate: "30/04/2025",
    isAcknowledged: false,
    createdAt: "15/04/2025"
  }
];

const initialPlanningEntries: PlanningEntry[] = [
  {
    id: "P-001",
    maintenanceId: "M-003",
    vehicleId: "V-003",
    mechanicId: "M-003",
    workshopBayId: "A2",
    scheduledDate: "16/04/2025",
    scheduledTime: "09:00",
    estimatedDuration: 1,
    status: "scheduled"
  }
];

const initialState: FleetState = {
  vehicles: initialVehicles,
  mechanics: initialMechanics,
  maintenanceRecords: initialMaintenanceRecords,
  workshopBays: initialWorkshopBays,
  alerts: initialAlerts,
  planningEntries: initialPlanningEntries
};

// Reducer pour gérer les actions
function fleetReducer(state: FleetState, action: FleetAction): FleetState {
  switch (action.type) {
    case "CREATE_MAINTENANCE":
      const newMaintenance: MaintenanceRecord = {
        ...action.payload,
        id: `M-${Date.now()}`,
      };
      return {
        ...state,
        maintenanceRecords: [...state.maintenanceRecords, newMaintenance]
      };

    case "UPDATE_MAINTENANCE":
      return {
        ...state,
        maintenanceRecords: state.maintenanceRecords.map(record =>
          record.id === action.payload.id 
            ? { ...record, ...action.payload.updates }
            : record
        )
      };

    case "ASSIGN_MECHANIC":
      const updatedMaintenanceRecords = state.maintenanceRecords.map(record => {
        if (record.id === action.payload.maintenanceId) {
          const mechanic = state.mechanics.find(m => m.id === action.payload.mechanicId);
          return {
            ...record,
            mechanicId: action.payload.mechanicId,
            mechanicName: mechanic?.name || ""
          };
        }
        return record;
      });
      
      const updatedMechanics = state.mechanics.map(mechanic => 
        mechanic.id === action.payload.mechanicId
          ? { ...mechanic, currentAssignments: mechanic.currentAssignments + 1, status: "busy" as const }
          : mechanic
      );

      return {
        ...state,
        maintenanceRecords: updatedMaintenanceRecords,
        mechanics: updatedMechanics
      };

    case "ASSIGN_WORKSHOP_BAY":
      const maintenanceForBay = state.maintenanceRecords.find(m => m.id === action.payload.maintenanceId);
      
      return {
        ...state,
        maintenanceRecords: state.maintenanceRecords.map(record =>
          record.id === action.payload.maintenanceId 
            ? { ...record, workshopBay: action.payload.bayId }
            : record
        ),
        workshopBays: state.workshopBays.map(bay =>
          bay.id === action.payload.bayId
            ? { ...bay, status: "occupied" as const, currentVehicleId: maintenanceForBay?.vehicleId }
            : bay
        )
      };

    case "UPDATE_VEHICLE_STATUS":
      return {
        ...state,
        vehicles: state.vehicles.map(vehicle =>
          vehicle.id === action.payload.vehicleId
            ? { ...vehicle, status: action.payload.status }
            : vehicle
        )
      };

    case "COMPLETE_MAINTENANCE":
      const completedMaintenance = state.maintenanceRecords.find(m => m.id === action.payload.maintenanceId);
      
      let updatedMechanicsForCompletion = state.mechanics;
      let updatedWorkshopBays = state.workshopBays;
      
      if (completedMaintenance?.mechanicId) {
        updatedMechanicsForCompletion = state.mechanics.map(mechanic => 
          mechanic.id === completedMaintenance.mechanicId
            ? { 
                ...mechanic, 
                currentAssignments: Math.max(0, mechanic.currentAssignments - 1),
                status: mechanic.currentAssignments <= 1 ? "available" as const : "busy" as const
              }
            : mechanic
        );
      }
      
      if (completedMaintenance?.workshopBay) {
        updatedWorkshopBays = state.workshopBays.map(bay =>
          bay.id === completedMaintenance.workshopBay
            ? { ...bay, status: "free" as const, currentVehicleId: undefined }
            : bay
        );
      }

      return {
        ...state,
        maintenanceRecords: state.maintenanceRecords.map(record => {
          if (record.id === action.payload.maintenanceId) {
            return {
              ...record,
              status: "completed" as const,
              cost: action.payload.cost,
              actualDuration: action.payload.actualDuration
            };
          }
          return record;
        }),
        mechanics: updatedMechanicsForCompletion,
        workshopBays: updatedWorkshopBays
      };

    case "CREATE_ALERT":
      const newAlert: Alert = {
        ...action.payload,
        id: `A-${Date.now()}`,
        createdAt: new Date().toLocaleDateString('fr-FR')
      };
      return {
        ...state,
        alerts: [...state.alerts, newAlert]
      };

    case "ACKNOWLEDGE_ALERT":
      return {
        ...state,
        alerts: state.alerts.map(alert =>
          alert.id === action.payload.alertId
            ? { ...alert, isAcknowledged: true }
            : alert
        )
      };

    case "SCHEDULE_MAINTENANCE":
      const newPlanningEntry: PlanningEntry = {
        ...action.payload,
        id: `P-${Date.now()}`
      };
      return {
        ...state,
        planningEntries: [...state.planningEntries, newPlanningEntry]
      };

    default:
      return state;
  }
}

// Contexte
interface FleetContextType {
  state: FleetState;
  dispatch: React.Dispatch<FleetAction>;
  stats: {
    vehiclesInMaintenance: number;
    vehiclesInWorkshop: number;
    vehiclesWaiting: number;
    availableMechanics: number;
    busyMechanics: number;
    freeWorkshopBays: number;
    unacknowledgedAlerts: number;
    plannedMaintenances: number;
    inProgressMaintenances: number;
  };
}

const FleetContext = createContext<FleetContextType | undefined>(undefined);

// Provider
interface FleetProviderProps {
  children: ReactNode;
}

export function FleetProvider({ children }: FleetProviderProps) {
  const [state, dispatch] = useReducer(fleetReducer, initialState);

  // Calculateurs dérivés
  const stats = useMemo(() => {
    const vehiclesInMaintenance = state.vehicles.filter(v => v.status === "maintenance" || v.status === "in-workshop").length;
    const vehiclesInWorkshop = state.vehicles.filter(v => v.status === "in-workshop").length;
    const vehiclesWaiting = state.vehicles.filter(v => v.status === "waiting").length;
    const availableMechanics = state.mechanics.filter(m => m.status === "available").length;
    const busyMechanics = state.mechanics.filter(m => m.status === "busy").length;
    const freeWorkshopBays = state.workshopBays.filter(b => b.status === "free").length;
    const unacknowledgedAlerts = state.alerts.filter(a => !a.isAcknowledged).length;
    const plannedMaintenances = state.maintenanceRecords.filter(m => m.status === "planned").length;
    const inProgressMaintenances = state.maintenanceRecords.filter(m => m.status === "in-progress").length;

    return {
      vehiclesInMaintenance,
      vehiclesInWorkshop,
      vehiclesWaiting,
      availableMechanics,
      busyMechanics,
      freeWorkshopBays,
      unacknowledgedAlerts,
      plannedMaintenances,
      inProgressMaintenances
    };
  }, [state]);

  const contextValue = useMemo(() => ({
    state,
    dispatch,
    stats
  }), [state, stats]);

  return (
    <FleetContext.Provider value={contextValue}>
      {children}
    </FleetContext.Provider>
  );
}

// Hook personnalisé
export function useFleet() {
  const context = useContext(FleetContext);
  if (context === undefined) {
    throw new Error('useFleet must be used within a FleetProvider');
  }
  return context;
}