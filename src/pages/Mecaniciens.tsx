
import React from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HardHat } from "lucide-react";

const Mecaniciens = () => {
  return (
    <DashboardLayout>
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Mécaniciens</h1>
        </div>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Équipe technique
            </CardTitle>
            <HardHat className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Gestion des mécaniciens</div>
            <p className="text-xs text-muted-foreground mt-2">
              Planification et suivi de l'équipe technique
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Mecaniciens;
