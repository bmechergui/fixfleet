
import { Package, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

interface InventoryItem {
  id: string;
  name: string;
  current: number;
  total: number;
  alert: boolean;
}

const inventoryItems: InventoryItem[] = [
  {
    id: "1",
    name: "Huile moteur",
    current: 24,
    total: 40,
    alert: false
  },
  {
    id: "2",
    name: "Filtre à air",
    current: 12,
    total: 50,
    alert: false
  },
  {
    id: "3",
    name: "Plaquettes de frein",
    current: 5,
    total: 30,
    alert: true
  },
  {
    id: "4",
    name: "Ampoules phare",
    current: 3,
    total: 20,
    alert: true
  },
];

export function InventoryStatus() {
  return (
    <Card className="h-full border-none shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">Statut du stock</CardTitle>
        <Package className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {inventoryItems.map(item => {
            const percentage = (item.current / item.total) * 100;
            let progressColor = "bg-fleet-blue";
            
            if (percentage <= 20) {
              progressColor = "bg-fleet-red";
            } else if (percentage <= 40) {
              progressColor = "bg-fleet-orange";
            }
            
            return (
              <div key={item.id}>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <span className="text-sm">{item.current} / {item.total}</span>
                </div>
                <Progress value={percentage} className={`h-2 ${progressColor}`} />
                {item.alert && (
                  <p className="text-xs text-fleet-red mt-1">Stock bas - Réapprovisionnement requis</p>
                )}
              </div>
            );
          })}
        </div>
        <Button variant="outline" className="w-full mt-4 text-fleet-blue hover:text-white hover:bg-fleet-blue">
          <span>Gérer le stock</span>
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
}
