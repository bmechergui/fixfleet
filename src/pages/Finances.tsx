
import React from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleDollarSign } from "lucide-react";

const Finances = () => {
  return (
    <DashboardLayout>
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Finances</h1>
        </div>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Gestion financière
            </CardTitle>
            <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Suivi des coûts</div>
            <p className="text-xs text-muted-foreground mt-2">
              Analyse des dépenses et budget de maintenance
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Finances;
