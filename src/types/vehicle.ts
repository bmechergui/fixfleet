
export interface VehicleDocument {
  id: string;
  name: string;
  expirationDate: string;
  status: "valid" | "to-renew" | "expired";
  fileUrl?: string;
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
