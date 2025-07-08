import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { AlertTriangle, Clock } from "lucide-react";
import { maintenanceRequestSchema, type MaintenanceRequestFormData } from "@/services/validationSchemas";

interface MaintenanceRequestFormProps {
  onSubmit: (request: MaintenanceRequestFormData) => void;
  vehicles: Array<{ id: string; brand: string; model: string; registrationNumber: string }>;
}

export function MaintenanceRequestForm({ onSubmit, vehicles }: MaintenanceRequestFormProps) {
  const form = useForm<MaintenanceRequestFormData>({
    resolver: zodResolver(maintenanceRequestSchema),
    defaultValues: {
      vehicleId: "",
      description: "",
      isUrgent: false,
      isImportant: false,
      requestedBy: "",
      type: ""
    }
  });

  const handleSubmit = (data: MaintenanceRequestFormData) => {
    onSubmit(data);
    form.reset();
  };

  const getEisenhowerCategory = (isUrgent: boolean, isImportant: boolean) => {
    if (isUrgent && isImportant) return { category: "Urgent & Important", color: "text-red-600", bg: "bg-red-50" };
    if (!isUrgent && isImportant) return { category: "Important non urgent", color: "text-orange-600", bg: "bg-orange-50" };
    if (isUrgent && !isImportant) return { category: "Urgent non important", color: "text-blue-600", bg: "bg-blue-50" };
    return { category: "Ni urgent ni important", color: "text-gray-600", bg: "bg-gray-50" };
  };

  const watchedValues = form.watch();
  const eisenhower = getEisenhowerCategory(watchedValues.isUrgent, watchedValues.isImportant);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Nouvelle demande de maintenance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="vehicleId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Véhicule concerné *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un véhicule" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {vehicles.map((vehicle) => (
                            <SelectItem key={vehicle.id} value={vehicle.id}>
                              {vehicle.brand} {vehicle.model} ({vehicle.registrationNumber})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type d'intervention *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner le type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Vidange">Vidange</SelectItem>
                          <SelectItem value="Freinage">Freinage</SelectItem>
                          <SelectItem value="Pneus">Pneus</SelectItem>
                          <SelectItem value="Batterie">Batterie</SelectItem>
                          <SelectItem value="Climatisation">Climatisation</SelectItem>
                          <SelectItem value="Diagnostic">Diagnostic</SelectItem>
                          <SelectItem value="Révision">Révision générale</SelectItem>
                          <SelectItem value="Autre">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description du problème *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Décrivez en détail le problème ou l'intervention nécessaire..."
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="requestedBy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Demandé par *</FormLabel>
                    <FormControl>
                      <Input placeholder="Nom du demandeur" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="isUrgent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-red-500" />
                          Est-ce urgent ?
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isImportant"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-orange-500" />
                          Est-ce important ?
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              {(watchedValues.isUrgent || watchedValues.isImportant) && (
                <Card className={`${eisenhower.bg} border-l-4 ${eisenhower.color.replace('text-', 'border-')}`}>
                  <CardContent className="pt-4">
                    <div className={`font-medium ${eisenhower.color}`}>
                      Catégorie Eisenhower: {eisenhower.category}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {watchedValues.isUrgent && watchedValues.isImportant && "Traitement immédiat requis"}
                      {!watchedValues.isUrgent && watchedValues.isImportant && "À planifier rapidement"}
                      {watchedValues.isUrgent && !watchedValues.isImportant && "Déléguer si possible"}
                      {!watchedValues.isUrgent && !watchedValues.isImportant && "À traiter quand possible"}
                    </div>
                  </CardContent>
                </Card>
              )}

              <Button 
                type="submit"
                className="w-full bg-fleet-blue hover:bg-fleet-lightBlue"
                disabled={!form.formState.isValid}
              >
                Soumettre la demande
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}