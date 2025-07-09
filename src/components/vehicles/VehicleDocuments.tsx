
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { VehicleDocument } from "@/types/vehicle";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface VehicleDocumentsProps {
  documents: VehicleDocument[];
  selectedDoc?: VehicleDocument | null;
  setSelectedDoc?: (doc: VehicleDocument | null) => void;
  onCloseDetail?: () => void;
  onBack?: () => void;
}

const getStatusBadge = (status: VehicleDocument['status']) => {
  switch (status) {
    case "valid":
      return <Badge variant="outline" className="border-fleet-green text-fleet-green">Valide</Badge>;
    case "to-renew":
      return <Badge variant="outline" className="border-fleet-orange text-fleet-orange">À renouveler</Badge>;
    case "expired":
      return <Badge variant="outline" className="border-fleet-red text-fleet-red">Expiré</Badge>;
    default:
      return null;
  }
};

export function VehicleDocuments({ documents, selectedDoc: controlledSelectedDoc, setSelectedDoc: controlledSetSelectedDoc, onCloseDetail, onBack }: VehicleDocumentsProps) {
  const [internalSelectedDoc, setInternalSelectedDoc] = useState<VehicleDocument | null>(null);
  const [open, setOpen] = useState(false);
  const [editDoc, setEditDoc] = useState<VehicleDocument | null>(null);
  const [form, setForm] = useState<{ name: string; expirationDate: string; status: VehicleDocument['status']; file?: File | null; comment?: string }>({ name: "", expirationDate: "", status: "valid", file: undefined, comment: "" });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectedDoc = controlledSelectedDoc !== undefined ? controlledSelectedDoc : internalSelectedDoc;
  const setSelectedDoc = controlledSetSelectedDoc !== undefined ? controlledSetSelectedDoc : setInternalSelectedDoc;

  // Gestion ouverture/fermeture modale
  const handleAdd = () => {
    setEditDoc(null);
    setForm({ name: "", expirationDate: "", status: "valid", file: undefined, comment: "" });
    setOpen(true);
  };
  const handleEdit = (doc: VehicleDocument) => {
    setEditDoc(doc);
    setForm({ name: doc.name, expirationDate: doc.expirationDate, status: doc.status, file: undefined, comment: doc.comment || "" });
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setEditDoc(null);
    setForm({ name: "", expirationDate: "", status: "valid", file: undefined, comment: "" });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Gestion du formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, files } = e.target as any;
    if (type === "file") {
      setForm((prev) => ({ ...prev, file: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleStatusChange = (value: VehicleDocument['status']) => {
    setForm((prev) => ({ ...prev, status: value }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici, appeler la logique d'ajout ou de modification (API ou state parent)
    handleClose();
  };

  return (
    <Card className="bg-white">
      <CardContent className="space-y-4 p-6">
        {onBack && (
          <button
            className="mb-4 flex items-center text-fleet-blue hover:underline font-medium"
            onClick={onBack}
          >
            <span className="mr-2">←</span> Retour
          </button>
        )}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Documents du véhicule</h3>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" onClick={handleAdd}>
                <Upload className="h-4 w-4 mr-2" />
                Ajouter un document
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[480px]">
              <DialogHeader>
                <DialogTitle>{editDoc ? "Modifier le document" : "Ajouter un document"}</DialogTitle>
              </DialogHeader>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="name">Nom du document</Label>
                  <Input id="name" name="name" value={form.name} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expirationDate">Date d'expiration</Label>
                  <Input id="expirationDate" name="expirationDate" type="date" value={form.expirationDate} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Statut</Label>
                  <Select value={form.status} onValueChange={handleStatusChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="valid">Valide</SelectItem>
                      <SelectItem value="to-renew">À renouveler</SelectItem>
                      <SelectItem value="expired">Expiré</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="file">Fichier</Label>
                  <Input id="file" name="file" type="file" accept=".pdf,image/*" ref={fileInputRef} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="comment">Commentaire</Label>
                  <textarea id="comment" name="comment" className="w-full border rounded px-2 py-1 text-sm" value={form.comment} onChange={handleChange} rows={2} placeholder="Ajouter un commentaire..." />
                </div>
                <DialogFooter>
                  <Button variant="outline" type="button" onClick={handleClose}>Annuler</Button>
                  <Button type="submit" className="bg-fleet-blue hover:bg-fleet-lightBlue">{editDoc ? "Enregistrer" : "Ajouter"}</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Expiration</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Télécharger</TableHead>
              <TableHead>Commentaire</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc) => (
              <TableRow key={doc.id} className="hover:bg-muted/50">
                <TableCell>{doc.name}</TableCell>
                <TableCell>{doc.expirationDate}</TableCell>
                <TableCell>{getStatusBadge(doc.status)}</TableCell>
                <TableCell>
                  {doc.fileUrl ? (
                    <a href={doc.fileUrl} download target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-fleet-blue hover:underline">
                      <span role="img" aria-label="télécharger">📎</span>
                      <span className="truncate max-w-[120px]">{doc.fileUrl.split("/").pop()}</span>
                    </a>
                  ) : (
                    <span className="text-gray-400 italic">Aucun fichier</span>
                  )}
                </TableCell>
                <TableCell>{doc.comment || <span className="text-gray-400 italic">—</span>}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(doc)} title="Modifier">
                      ✏️
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
