
import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import type { Vehicle as VehicleType, VehicleDocument } from "@/types/vehicle";
import { VehicleDocuments } from "@/components/vehicles/VehicleDocuments";
import { Card, CardContent } from "@/components/ui/card";
import { AddVehicleDialog } from "@/components/vehicles/AddVehicleDialog";
import { VehicleSearch } from "@/components/vehicles/VehicleSearch";
import { VehicleTable } from "@/components/vehicles/VehicleTable";

interface Vehicle {
  id: string;
  registrationNumber: string;
  brand: string;
  model: string;
  year: number;
  driver: string;
  group: string;
  status: "active" | "maintenance" | "inactive";
  kilometers: string;
  documents: VehicleDocument[];
}

const vehicles: Vehicle[] = [
  {
    id: "1",
    registrationNumber: "AB-123-CD",
    brand: "Renault",
    model: "Clio",
    year: 2021,
    driver: "Jean Dupont",
    group: "Commercial",
    status: "active",
    kilometers: "45000",
    documents: [
      {
        id: "1",
        name: "Assurance",
        expirationDate: "15/06/2025",
        status: "valid"
      },
      {
        id: "2",
        name: "Vignette",
        expirationDate: "31/12/2025",
        status: "to-renew"
      },
      {
        id: "3",
        name: "Contrôle technique",
        expirationDate: "20/05/2025",
        status: "valid"
      }
    ]
  },
  {
    id: "2",
    registrationNumber: "EF-456-GH",
    brand: "Peugeot",
    model: "308",
    year: 2020,
    driver: "Marie Martin",
    group: "Commercial",
    status: "active",
    kilometers: "32000",
    documents: []
  },
  {
    id: "3",
    registrationNumber: "IJ-789-KL",
    brand: "Citroën",
    model: "C3",
    year: 2022,
    driver: "Paul Bernard",
    group: "Service",
    status: "maintenance",
    kilometers: "28000",
    documents: []
  },
  {
    id: "4",
    registrationNumber: "MN-012-OP",
    brand: "Ford",
    model: "Transit",
    year: 2019,
    driver: "Sophie Petit",
    group: "Livraison",
    status: "active",
    kilometers: "65000",
    documents: []
  },
  {
    id: "5",
    registrationNumber: "QR-345-ST",
    brand: "Volkswagen",
    model: "Passat",
    year: 2021,
    driver: "Thomas Robert",
    group: "Direction",
    status: "active",
    kilometers: "38000",
    documents: []
  },
  {
    id: "6",
    registrationNumber: "UV-678-WX",
    brand: "Toyota",
    model: "Yaris",
    year: 2020,
    driver: "Émilie Durand",
    group: "Commercial",
    status: "inactive",
    kilometers: "42000",
    documents: []
  },
  {
    id: "7",
    registrationNumber: "YZ-901-AB",
    brand: "Renault",
    model: "Kangoo",
    year: 2018,
    driver: "Nicolas Moreau",
    group: "Service",
    status: "active",
    kilometers: "78000",
    documents: []
  },
  {
    id: "8",
    registrationNumber: "CD-234-EF",
    brand: "Mercedes",
    model: "Sprinter",
    year: 2022,
    driver: "Laure Simon",
    group: "Livraison",
    status: "maintenance",
    kilometers: "25000",
    documents: []
  }
];

export default function Vehicles() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);
  
  const filteredVehicles = vehicles.filter(vehicle => {
    const searchLower = searchTerm.toLowerCase();
    return (
      vehicle.registrationNumber.toLowerCase().includes(searchLower) ||
      vehicle.brand.toLowerCase().includes(searchLower) ||
      vehicle.model.toLowerCase().includes(searchLower) ||
      vehicle.driver.toLowerCase().includes(searchLower) ||
      vehicle.group.toLowerCase().includes(searchLower)
    );
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Gestion des véhicules</h1>
          <AddVehicleDialog 
            open={isAddDialogOpen} 
            onOpenChange={setIsAddDialogOpen} 
          />
        </div>
        
        <Card>
          <CardContent className="p-6">
            <VehicleSearch 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
            
            <div className="overflow-x-auto">
              <VehicleTable
                vehicles={filteredVehicles}
                onDocumentsClick={setSelectedVehicleId}
              />
            </div>

            {selectedVehicleId && (
              <div className="mt-8">
                <VehicleDocuments 
                  documents={vehicles.find(v => v.id === selectedVehicleId)?.documents || []} 
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
