import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Breakdown, CAUSE_LABELS } from "@/types/breakdown";

interface BreakdownFormProps {
  onAdd: (breakdown: Omit<Breakdown, 'id' | 'createdAt'>) => void;
}

export function BreakdownForm({ onAdd }: BreakdownFormProps) {
  const [formData, setFormData] = useState({
    equipmentName: "",
    date: "",
    description: "",
    cause: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.equipmentName || !formData.date || !formData.description || !formData.cause) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive"
      });
      return;
    }

    onAdd({
      equipmentName: formData.equipmentName,
      date: formData.date,
      description: formData.description,
      cause: parseInt(formData.cause)
    });

    setFormData({
      equipmentName: "",
      date: "",
      description: "",
      cause: ""
    });

    toast({
      title: "Succès",
      description: "Panne ajoutée avec succès"
    });
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Ajouter une Nouvelle Panne</CardTitle>
        <CardDescription>
          Enregistrez une nouvelle panne d'équipement en utilisant la méthode 5M
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="equipment">Nom de l'équipement</Label>
            <Input
              id="equipment"
              value={formData.equipmentName}
              onChange={(e) => setFormData({ ...formData, equipmentName: e.target.value })}
              placeholder="Ex: Convoyeur A-123"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date de la panne</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description de la panne</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Décrivez la panne en détail..."
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cause">Cause (Méthode 5M)</Label>
            <Select value={formData.cause} onValueChange={(value) => setFormData({ ...formData, cause: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez la cause" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(CAUSE_LABELS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full">
            Ajouter la Panne
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}