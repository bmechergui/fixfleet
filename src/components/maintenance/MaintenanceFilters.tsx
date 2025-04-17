
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MaintenanceFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  activeTab: string;
  onTabChange: (value: string) => void;
}

export function MaintenanceFilters({
  searchTerm,
  onSearchChange,
  activeTab,
  onTabChange
}: MaintenanceFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher une maintenance..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-4 w-full md:w-auto">
        <Tabs defaultValue={activeTab} className="w-full md:w-auto" onValueChange={onTabChange}>
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="all">Tous</TabsTrigger>
            <TabsTrigger value="planned">Planifiés</TabsTrigger>
            <TabsTrigger value="in-progress">En cours</TabsTrigger>
            <TabsTrigger value="completed">Terminés</TabsTrigger>
          </TabsList>
        </Tabs>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filtrer
        </Button>
      </div>
    </div>
  );
}
