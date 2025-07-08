import type { User, UserRole, Permission, LoginCredentials, RoleDefinition } from '@/types/auth';

// Définitions des rôles et permissions
export const ROLE_DEFINITIONS: RoleDefinition[] = [
  {
    role: "admin",
    name: "Administrateur",
    description: "Accès complet à toutes les fonctionnalités",
    permissions: [
      "vehicles.read", "vehicles.write", "vehicles.delete",
      "maintenance.read", "maintenance.write", "maintenance.delete", "maintenance.assign",
      "drivers.read", "drivers.write", "drivers.delete",
      "mechanics.read", "mechanics.write", "mechanics.delete",
      "workshop.read", "workshop.write",
      "planning.read", "planning.write",
      "alerts.read", "alerts.write", "alerts.acknowledge",
      "inventory.read", "inventory.write",
      "finances.read", "finances.write",
      "analytics.read",
      "users.read", "users.write", "users.delete",
      "system.admin"
    ],
    color: "#dc2626"
  },
  {
    role: "gestionnaire_parc",
    name: "Gestionnaire de Parc",
    description: "Gestion complète des véhicules et chauffeurs",
    permissions: [
      "vehicles.read", "vehicles.write", "vehicles.delete",
      "maintenance.read", "maintenance.write", "maintenance.assign",
      "drivers.read", "drivers.write", "drivers.delete",
      "planning.read", "planning.write",
      "alerts.read", "alerts.write", "alerts.acknowledge",
      "inventory.read",
      "analytics.read"
    ],
    color: "#1a56db"
  },
  {
    role: "mecanicien",
    name: "Mécanicien",
    description: "Gestion des maintenances et atelier",
    permissions: [
      "vehicles.read",
      "maintenance.read", "maintenance.write",
      "workshop.read", "workshop.write",
      "planning.read",
      "alerts.read", "alerts.acknowledge",
      "inventory.read"
    ],
    color: "#059669"
  },
  {
    role: "superviseur_atelier",
    name: "Superviseur d'Atelier",
    description: "Supervision de l'atelier et des mécaniciens",
    permissions: [
      "vehicles.read",
      "maintenance.read", "maintenance.write", "maintenance.assign",
      "mechanics.read", "mechanics.write",
      "workshop.read", "workshop.write",
      "planning.read", "planning.write",
      "alerts.read", "alerts.write", "alerts.acknowledge",
      "inventory.read", "inventory.write"
    ],
    color: "#ea580c"
  },
  {
    role: "chauffeur",
    name: "Chauffeur",
    description: "Consultation des véhicules assignés",
    permissions: [
      "vehicles.read",
      "maintenance.read",
      "alerts.read"
    ],
    color: "#eab308"
  },
  {
    role: "comptable",
    name: "Comptable",
    description: "Gestion financière et analytique",
    permissions: [
      "vehicles.read",
      "maintenance.read",
      "finances.read", "finances.write",
      "analytics.read",
      "inventory.read"
    ],
    color: "#8b5cf6"
  },
  {
    role: "lecteur",
    name: "Lecteur",
    description: "Accès en lecture seule",
    permissions: [
      "vehicles.read",
      "maintenance.read",
      "drivers.read",
      "mechanics.read",
      "workshop.read",
      "planning.read",
      "alerts.read",
      "inventory.read",
      "analytics.read"
    ],
    color: "#6b7280"
  }
];

// Utilisateurs de démonstration
const DEMO_USERS: User[] = [
  {
    id: "U-001",
    email: "admin@elitefleet.com",
    name: "Admin Système",
    role: "admin",
    permissions: ROLE_DEFINITIONS.find(r => r.role === "admin")?.permissions || [],
    isActive: true,
    department: "IT",
    createdAt: "2024-01-01"
  },
  {
    id: "U-002",
    email: "marie.lambert@elitefleet.com",
    name: "Marie Lambert",
    role: "gestionnaire_parc",
    permissions: ROLE_DEFINITIONS.find(r => r.role === "gestionnaire_parc")?.permissions || [],
    isActive: true,
    department: "Gestion de Parc",
    createdAt: "2024-01-15"
  },
  {
    id: "U-003",
    email: "pierre.martin@elitefleet.com",
    name: "Pierre Martin",
    role: "mecanicien",
    permissions: ROLE_DEFINITIONS.find(r => r.role === "mecanicien")?.permissions || [],
    isActive: true,
    department: "Atelier",
    createdAt: "2024-02-01"
  },
  {
    id: "U-004",
    email: "sophie.durand@elitefleet.com",
    name: "Sophie Durand",
    role: "superviseur_atelier",
    permissions: ROLE_DEFINITIONS.find(r => r.role === "superviseur_atelier")?.permissions || [],
    isActive: true,
    department: "Atelier",
    createdAt: "2024-02-10"
  },
  {
    id: "U-005",
    email: "jean.dupont@elitefleet.com",
    name: "Jean Dupont",
    role: "chauffeur",
    permissions: ROLE_DEFINITIONS.find(r => r.role === "chauffeur")?.permissions || [],
    isActive: true,
    department: "Commercial",
    createdAt: "2024-03-01"
  }
];

export class AuthService {
  private static currentUser: User | null = DEMO_USERS[0]; // Admin par défaut

  static async login(credentials: LoginCredentials): Promise<User> {
    // Simulation d'authentification
    const user = DEMO_USERS.find(u => u.email === credentials.email);
    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }
    
    this.currentUser = {
      ...user,
      lastLogin: new Date().toISOString()
    };
    
    return this.currentUser;
  }

  static async logout(): Promise<void> {
    this.currentUser = null;
  }

  static getCurrentUser(): User | null {
    return this.currentUser;
  }

  static hasPermission(permission: Permission): boolean {
    if (!this.currentUser) return false;
    return this.currentUser.permissions.includes(permission);
  }

  static hasRole(role: UserRole): boolean {
    if (!this.currentUser) return false;
    return this.currentUser.role === role;
  }

  static hasAnyRole(roles: UserRole[]): boolean {
    if (!this.currentUser) return false;
    return roles.includes(this.currentUser.role);
  }

  static canAccess(requiredPermissions: Permission[]): boolean {
    if (!this.currentUser) return false;
    return requiredPermissions.every(permission => 
      this.currentUser!.permissions.includes(permission)
    );
  }

  static getRoleDefinition(role: UserRole): RoleDefinition | undefined {
    return ROLE_DEFINITIONS.find(r => r.role === role);
  }

  static getAllUsers(): User[] {
    return DEMO_USERS;
  }

  static async createUser(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const newUser: User = {
      ...userData,
      id: `U-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    
    DEMO_USERS.push(newUser);
    return newUser;
  }

  static async updateUser(userId: string, updates: Partial<User>): Promise<User> {
    const userIndex = DEMO_USERS.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      throw new Error("Utilisateur non trouvé");
    }
    
    DEMO_USERS[userIndex] = { ...DEMO_USERS[userIndex], ...updates };
    return DEMO_USERS[userIndex];
  }

  static async deleteUser(userId: string): Promise<void> {
    const userIndex = DEMO_USERS.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      throw new Error("Utilisateur non trouvé");
    }
    
    DEMO_USERS.splice(userIndex, 1);
  }

  // Méthodes utilitaires pour l'interface
  static getRoleColor(role: UserRole): string {
    return ROLE_DEFINITIONS.find(r => r.role === role)?.color || "#6b7280";
  }

  static getRoleName(role: UserRole): string {
    return ROLE_DEFINITIONS.find(r => r.role === role)?.name || role;
  }
}