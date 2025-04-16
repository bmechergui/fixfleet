
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { MaintenanceAlerts } from "@/components/dashboard/MaintenanceAlerts";
import { RecentMaintenances } from "@/components/dashboard/RecentMaintenances";
import { VehicleStatusChart } from "@/components/dashboard/VehicleStatusChart";
import { InventoryStatus } from "@/components/dashboard/InventoryStatus";
import { Car, User, Wrench, Tool, Calendar } from "lucide-react";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold tracking-tight">Tableau de bord</h1>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            title="Véhicules" 
            value="24" 
            icon={Car} 
            trend={{ value: "2", isPositive: true }}
            color="blue"
          />
          <StatCard 
            title="Chauffeurs" 
            value="18" 
            icon={User}
            trend={{ value: "1", isPositive: true }}
            color="green"
          />
          <StatCard 
            title="Maintenances à venir" 
            value="7" 
            icon={Calendar}
            trend={{ value: "3", isPositive: false }}
            color="orange"
          />
          <StatCard 
            title="Pièces en stock" 
            value="238" 
            icon={Tool}
            trend={{ value: "15", isPositive: false }}
            color="yellow"
          />
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <VehicleStatusChart />
          <InventoryStatus />
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <MaintenanceAlerts />
          <RecentMaintenances />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
