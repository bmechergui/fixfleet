
export interface VehicleDocument {
  id: string;
  name: string;
  expirationDate: string;
  status: "valid" | "to-renew" | "expired";
  fileUrl?: string;
  comment?: string;
}

export interface Vehicle {
  id: string;
  registrationNumber: string;
  brand: string;
  model: string;
  year: number;
  driver: string;
  group: string;
  status: "active" | "maintenance" | "inactive";
  kilometers?: string;
  documents?: VehicleDocument[];
}

// Re-export with Type suffix for components that need to differentiate from local variables
export type VehicleType = Vehicle;
