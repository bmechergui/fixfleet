
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

interface VehicleSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export function VehicleSearch({ searchTerm, onSearchChange }: VehicleSearchProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher un véhicule..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Button variant="outline" className="ml-4">
        <Filter className="h-4 w-4 mr-2" />
        Filtrer
      </Button>
    </div>
  );
}
