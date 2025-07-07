import React from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { FleetAnalytics } from "@/components/analytics/FleetAnalytics";
import { PredictiveAnalysis } from "@/components/predictive/PredictiveAnalysis";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Brain, Smartphone, Plug } from "lucide-react";
import { MobileOptimization } from "@/components/mobile/MobileOptimization";
import { ApiIntegration } from "@/components/integration/ApiIntegration";

const Analytics = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Analytics & Améliorations</h1>
        </div>
        
        <Tabs defaultValue="analytics" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="predictive" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              IA Prédictive
            </TabsTrigger>
            <TabsTrigger value="mobile" className="flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              Mobile
            </TabsTrigger>
            <TabsTrigger value="integrations" className="flex items-center gap-2">
              <Plug className="h-4 w-4" />
              Intégrations
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="analytics" className="mt-6">
            <FleetAnalytics />
          </TabsContent>
          
          <TabsContent value="predictive" className="mt-6">
            <PredictiveAnalysis />
          </TabsContent>
          
          <TabsContent value="mobile" className="mt-6">
            <MobileOptimization />
          </TabsContent>
          
          <TabsContent value="integrations" className="mt-6">
            <ApiIntegration />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;