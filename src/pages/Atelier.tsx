
import React from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Hammer } from "lucide-react";

const Atelier = () => {
  return (
    <DashboardLayout>
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Atelier</h1>
        </div>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Gestion de l'Atelier
            </CardTitle>
            <Hammer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Atelier de maintenance</div>
            <p className="text-xs text-muted-foreground mt-2">
              Gestion des équipements et espaces de travail
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Atelier;
