import { toast } from "@/hooks/use-toast";

export class NotificationService {
  static success(title: string, description?: string) {
    toast({
      title,
      description,
      variant: "default"
    });
  }

  static error(title: string, description?: string) {
    toast({
      title,
      description,
      variant: "destructive"
    });
  }

  static info(title: string, description?: string) {
    toast({
      title,
      description
    });
  }

  static warning(title: string, description?: string) {
    toast({
      title,
      description,
      variant: "destructive"
    });
  }

  // Notifications spécifiques à la flotte
  static maintenanceCompleted(vehicleName: string) {
    this.success(
      "Maintenance terminée",
      `La maintenance du véhicule ${vehicleName} a été terminée avec succès.`
    );
  }

  static maintenanceScheduled(vehicleName: string, date: string) {
    this.info(
      "Maintenance planifiée",
      `La maintenance du véhicule ${vehicleName} a été planifiée pour le ${date}.`
    );
  }

  static alertCreated(message: string) {
    this.warning(
      "Nouvelle alerte",
      message
    );
  }

  static vehicleStatusChanged(vehicleName: string, status: string) {
    this.info(
      "Statut véhicule modifié",
      `Le statut du véhicule ${vehicleName} a été changé en ${status}.`
    );
  }
}