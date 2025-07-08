// Types pour l'authentification et les rôles
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  permissions: Permission[];
  avatar?: string;
  department?: string;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
}

export type UserRole = 
  | "admin" 
  | "gestionnaire_parc" 
  | "mecanicien" 
  | "chauffeur" 
  | "superviseur_atelier"
  | "comptable"
  | "lecteur";

export type Permission = 
  | "vehicles.read"
  | "vehicles.write"
  | "vehicles.delete"
  | "maintenance.read"
  | "maintenance.write"
  | "maintenance.delete"
  | "maintenance.assign"
  | "drivers.read"
  | "drivers.write"
  | "drivers.delete"
  | "mechanics.read"
  | "mechanics.write"
  | "mechanics.delete"
  | "workshop.read"
  | "workshop.write"
  | "planning.read"
  | "planning.write"
  | "alerts.read"
  | "alerts.write"
  | "alerts.acknowledge"
  | "inventory.read"
  | "inventory.write"
  | "finances.read"
  | "finances.write"
  | "analytics.read"
  | "users.read"
  | "users.write"
  | "users.delete"
  | "system.admin";

export interface RoleDefinition {
  role: UserRole;
  name: string;
  description: string;
  permissions: Permission[];
  color: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}