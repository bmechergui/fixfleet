
import { useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash, Eye } from "lucide-react";
import type { VehicleType } from "@/types/vehicle";
import { useNavigate } from "react-router-dom";

// Types locaux pour la démo
interface VehicleGroup {
  id: string;
  name: string;
  description?: string;
  vehicles: string[];
  createdAt: string;
  updatedAt?: string;
}

// Données fictives pour la démo
const initialVehicles: VehicleType[] = [
  { id: "1", registrationNumber: "AB-123-CD", brand: "Renault", model: "Clio", year: 2021, driver: "Jean Dupont", group: "Commercial", status: "active", kilometers: "45000", documents: [] },
  { id: "2", registrationNumber: "EF-456-GH", brand: "Peugeot", model: "308", year: 2020, driver: "Marie Martin", group: "Commercial", status: "active", kilometers: "32000", documents: [] },
  { id: "3", registrationNumber: "IJ-789-KL", brand: "Citroën", model: "C3", year: 2022, driver: "Paul Bernard", group: "Service", status: "maintenance", kilometers: "28000", documents: [] },
];
const initialGroups: VehicleGroup[] = [
  { id: "g1", name: "Commercial", description: "Véhicules commerciaux", vehicles: ["1", "2"], createdAt: "2024-01-01" },
  { id: "g2", name: "Service", description: "Véhicules de service", vehicles: ["3"], createdAt: "2024-01-01" },
];

const Groups = () => {
  const [groups, setGroups] = useState<VehicleGroup[]>(initialGroups);
  const [vehicles] = useState<VehicleType[]>(initialVehicles);
  const [openForm, setOpenForm] = useState(false);
  const [editGroup, setEditGroup] = useState<VehicleGroup | null>(null);
  const [showDetails, setShowDetails] = useState<VehicleGroup | null>(null);
  const [form, setForm] = useState<{ name: string; description: string; vehicles: string[] }>({ name: "", description: "", vehicles: [] });
  const navigate = useNavigate();

  // Handlers
  const handleAdd = () => {
    setEditGroup(null);
    setForm({ name: "", description: "", vehicles: [] });
    setOpenForm(true);
  };
  const handleEdit = (group: VehicleGroup) => {
    setEditGroup(group);
    setForm({ name: group.name, description: group.description || "", vehicles: group.vehicles });
    setOpenForm(true);
  };
  const handleView = (group: VehicleGroup) => setShowDetails(group);
  const handleDelete = (group: VehicleGroup) => setGroups(gs => gs.filter(g => g.id !== group.id));
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleVehicleSelect = (id: string) => {
    setForm(prev => ({
      ...prev,
      vehicles: prev.vehicles.includes(id)
        ? prev.vehicles.filter(vid => vid !== id)
        : [...prev.vehicles, id],
    }));
  };
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editGroup) {
      setGroups(gs => gs.map(g => g.id === editGroup.id ? { ...g, ...form } : g));
    } else {
      setGroups(gs => [...gs, { id: Date.now().toString(), ...form, createdAt: new Date().toISOString() }]);
    }
    setOpenForm(false);
    setEditGroup(null);
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Gestion des groupes</h2>
              <Button onClick={handleAdd} className="bg-fleet-blue hover:bg-fleet-lightBlue">
                <Plus className="h-4 w-4 mr-2" /> Ajouter un groupe
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Nombre de voitures</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {groups.map((group) => (
                  <TableRow key={group.id}>
                    <TableCell>
                      {group.name}
                    </TableCell>
                    <TableCell>{group.description || <span className="text-gray-400 italic">—</span>}</TableCell>
                    <TableCell>
                      {vehicles.filter(v => v.group === group.name).length}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="icon" variant="ghost" onClick={() => navigate(`/vehicles?group=${encodeURIComponent(group.name)}`)} title="Voir">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost" onClick={() => handleEdit(group)} title="Modifier">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        {/* Formulaire d'ajout/édition */}
        <Dialog open={openForm} onOpenChange={setOpenForm}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editGroup ? "Modifier le groupe" : "Ajouter un groupe"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Nom du groupe</Label>
                <Input id="name" name="name" value={form.name} onChange={handleFormChange} required />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input id="description" name="description" value={form.description} onChange={handleFormChange} />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpenForm(false)}>Annuler</Button>
                <Button type="submit" className="bg-fleet-blue hover:bg-fleet-lightBlue">Enregistrer</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        {/* Détail d'un groupe */}
        {showDetails && (
          <Card className="mt-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-2">{showDetails.name}</h2>
              <p className="mb-4 text-gray-600">{showDetails.description}</p>
              <h3 className="font-semibold mb-2">Véhicules du groupe</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Immatriculation</TableHead>
                    <TableHead>Marque/Modèle</TableHead>
                    <TableHead>Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vehicles.filter(v => showDetails.vehicles.includes(v.id)).map((v) => (
                    <TableRow key={v.id}>
                      <TableCell>{v.registrationNumber}</TableCell>
                      <TableCell>{v.brand} {v.model}</TableCell>
                      <TableCell>{v.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4">
                <Button variant="outline" onClick={() => setShowDetails(null)}>Fermer</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Groups;
