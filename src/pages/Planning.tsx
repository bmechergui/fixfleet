
import React from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

const Planning = () => {
  return (
    <DashboardLayout>
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Planification</h1>
        </div>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Calendrier de maintenance
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Planning des interventions</div>
            <p className="text-xs text-muted-foreground mt-2">
              Programmation et suivi des interventions de maintenance
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Planning;
