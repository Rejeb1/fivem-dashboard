import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, MapPin, Activity, Settings, Plus, Edit, Trash2 } from "lucide-react";

export default function Equipements() {
  const equipmentData = [
    { id: "EQ-001", name: "Convoyeur Principal A", status: "Operational", location: "Zone A", lastMaintenance: "2024-01-15", nextMaintenance: "2024-03-15" },
    { id: "EQ-002", name: "Presse Hydraulique B", status: "Maintenance", location: "Zone B", lastMaintenance: "2024-01-10", nextMaintenance: "2024-02-10" },
    { id: "EQ-003", name: "Robot Soudage C", status: "Operational", location: "Zone C", lastMaintenance: "2024-01-20", nextMaintenance: "2024-04-20" },
    { id: "EQ-004", name: "Découpe Laser D", status: "Critical", location: "Zone A", lastMaintenance: "2024-01-05", nextMaintenance: "2024-01-30" },
    { id: "EQ-005", name: "Assemblage Auto E", status: "Operational", location: "Zone B", lastMaintenance: "2024-01-18", nextMaintenance: "2024-03-18" },
    { id: "EQ-006", name: "Contrôle Qualité F", status: "Maintenance", location: "Zone C", lastMaintenance: "2024-01-12", nextMaintenance: "2024-02-12" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Operational": return "bg-success/10 text-success border-success/20";
      case "Maintenance": return "bg-warning/10 text-warning border-warning/20";
      case "Critical": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  return (
    <div className="min-h-screen bg-dashboard-content">
      {/* Header */}
      <div className="bg-dashboard-header border-b p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Équipements</h1>
            <p className="text-muted-foreground">Gérez et surveillez tous vos équipements industriels</p>
          </div>
          <Button className="w-fit">
            <Plus className="h-4 w-4 mr-2" />
            Ajouter Équipement
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Équipements</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">922</div>
              <p className="text-xs text-muted-foreground">
                +8 ce mois
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Opérationnels</CardTitle>
              <Activity className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">854</div>
              <p className="text-xs text-muted-foreground">
                92.6% du total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En Maintenance</CardTitle>
              <Settings className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">64</div>
              <p className="text-xs text-muted-foreground">
                6.9% du total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Critiques</CardTitle>
              <Activity className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">
                Attention requise
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filtres et Recherche</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Rechercher par ID ou nom..."
                  className="pl-10"
                />
              </div>
              <Select>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Zone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les zones</SelectItem>
                  <SelectItem value="zone-a">Zone A</SelectItem>
                  <SelectItem value="zone-b">Zone B</SelectItem>
                  <SelectItem value="zone-c">Zone C</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="operational">Opérationnel</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="critical">Critique</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Equipment Table */}
        <Card>
          <CardHeader>
            <CardTitle>Liste des Équipements</CardTitle>
            <CardDescription>
              Gérez vos équipements et suivez leur état de maintenance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nom</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Zone</TableHead>
                    <TableHead>Dernière Maintenance</TableHead>
                    <TableHead>Prochaine Maintenance</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {equipmentData.map((equipment) => (
                    <TableRow key={equipment.id}>
                      <TableCell className="font-medium">{equipment.id}</TableCell>
                      <TableCell>{equipment.name}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(equipment.status)}>
                          {equipment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          {equipment.location}
                        </div>
                      </TableCell>
                      <TableCell>{equipment.lastMaintenance}</TableCell>
                      <TableCell>{equipment.nextMaintenance}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-3 w-3 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}