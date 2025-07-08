import type { Vehicle, MaintenanceRecord, Alert } from '@/types/shared';

export class FleetService {
  // Service pour les opérations liées aux véhicules
  static async getVehicles(): Promise<Vehicle[]> {
    // Simulation d'un appel API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([]);
      }, 100);
    });
  }

  static async createVehicle(vehicle: Omit<Vehicle, 'id'>): Promise<Vehicle> {
    // Simulation d'un appel API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ...vehicle,
          id: `V-${Date.now()}`
        });
      }, 100);
    });
  }

  // Service pour les opérations de maintenance
  static async getMaintenanceRecords(): Promise<MaintenanceRecord[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([]);
      }, 100);
    });
  }

  static async createMaintenanceRecord(maintenance: Omit<MaintenanceRecord, 'id'>): Promise<MaintenanceRecord> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ...maintenance,
          id: `M-${Date.now()}`
        });
      }, 100);
    });
  }

  // Service pour les alertes
  static async getAlerts(): Promise<Alert[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([]);
      }, 100);
    });
  }

  static async acknowledgeAlert(alertId: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 100);
    });
  }
}