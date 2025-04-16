
import React from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";

const Alerts = () => {
  return (
    <DashboardLayout>
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Alertes</h1>
        </div>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Centre de notifications
            </CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Alertes de maintenance</div>
            <p className="text-xs text-muted-foreground mt-2">
              Suivi des alertes et notifications d'entretien
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Alerts;
