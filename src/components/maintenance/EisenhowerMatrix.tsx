import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock, ArrowRight, Calendar } from "lucide-react";
import type { MaintenanceRecord } from "@/types/shared";

interface EisenhowerMatrixProps {
  maintenances: MaintenanceRecord[];
  onSelectMaintenance: (maintenance: MaintenanceRecord) => void;
  onPlanMaintenance: (maintenanceId: string) => void;
}

export function EisenhowerMatrix({ maintenances, onSelectMaintenance, onPlanMaintenance }: EisenhowerMatrixProps) {
  const categorizeMaintenances = () => {
    const categories = {
      "urgent-important": maintenances.filter(m => m.isUrgent && m.isImportant),
      "important-not-urgent": maintenances.filter(m => !m.isUrgent && m.isImportant),
      "urgent-not-important": maintenances.filter(m => m.isUrgent && !m.isImportant),
      "not-urgent-not-important": maintenances.filter(m => !m.isUrgent && !m.isImportant)
    };
    return categories;
  };

  const categories = categorizeMaintenances();

  const getCategoryConfig = (category: string) => {
    switch (category) {
      case "urgent-important":
        return {
          title: "Urgent & Important",
          subtitle: "À faire immédiatement",
          color: "border-red-500 bg-red-50",
          headerColor: "text-red-700",
          icon: AlertTriangle,
          iconColor: "text-red-500"
        };
      case "important-not-urgent":
        return {
          title: "Important non urgent",
          subtitle: "À planifier",
          color: "border-orange-500 bg-orange-50",
          headerColor: "text-orange-700",
          icon: Calendar,
          iconColor: "text-orange-500"
        };
      case "urgent-not-important":
        return {
          title: "Urgent non important",
          subtitle: "À déléguer",
          color: "border-blue-500 bg-blue-50",
          headerColor: "text-blue-700",
          icon: Clock,
          iconColor: "text-blue-500"
        };
      case "not-urgent-not-important":
        return {
          title: "Ni urgent ni important",
          subtitle: "À éliminer/reporter",
          color: "border-gray-500 bg-gray-50",
          headerColor: "text-gray-700",
          icon: Clock,
          iconColor: "text-gray-500"
        };
      default:
        return {
          title: "",
          subtitle: "",
          color: "",
          headerColor: "",
          icon: Clock,
          iconColor: ""
        };
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Analyse des demandes - Matrice d'Eisenhower</h2>
        <p className="text-muted-foreground">Priorisez vos interventions selon leur urgence et importance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(categories).map(([category, items]) => {
          const config = getCategoryConfig(category);
          const IconComponent = config.icon;

          return (
            <Card key={category} className={`${config.color} border-l-4`}>
              <CardHeader className="pb-3">
                <CardTitle className={`flex items-center gap-2 ${config.headerColor}`}>
                  <IconComponent className={`h-5 w-5 ${config.iconColor}`} />
                  {config.title}
                  <Badge variant="outline" className="ml-auto">
                    {items.length}
                  </Badge>
                </CardTitle>
                <p className="text-sm text-muted-foreground">{config.subtitle}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                {items.length === 0 ? (
                  <p className="text-sm text-muted-foreground italic">Aucune demande dans cette catégorie</p>
                ) : (
                  items.map((maintenance) => (
                    <div
                      key={maintenance.id}
                      className="bg-white p-3 rounded-lg border cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => onSelectMaintenance(maintenance)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="font-medium text-sm">{maintenance.id}</div>
                          <div className="text-sm text-muted-foreground">{maintenance.vehicleName}</div>
                          <div className="text-sm mt-1">{maintenance.type}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Demandé par: {maintenance.requestedBy || "Non spécifié"}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              onPlanMaintenance(maintenance.id);
                            }}
                            className="text-xs"
                          >
                            <ArrowRight className="h-3 w-3 mr-1" />
                            Planifier
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}