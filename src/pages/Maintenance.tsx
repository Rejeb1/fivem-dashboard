import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Clock, Wrench, AlertTriangle, CheckCircle, Plus } from "lucide-react";

export default function Maintenance() {
  const maintenanceData = [
    { id: "MT-001", equipment: "Convoyeur Principal A", type: "Préventive", priority: "Moyenne", scheduled: "2024-02-15", technician: "Jean Dupont", status: "Programmée" },
    { id: "MT-002", equipment: "Presse Hydraulique B", type: "Corrective", priority: "Haute", scheduled: "2024-02-10", technician: "Marie Martin", status: "En cours" },
    { id: "MT-003", equipment: "Robot Soudage C", type: "Préventive", priority: "Basse", scheduled: "2024-02-20", technician: "Paul Bernard", status: "Programmée" },
    { id: "MT-004", equipment: "Découpe Laser D", type: "Urgente", priority: "Critique", scheduled: "2024-02-08", technician: "Sophie Petit", status: "Urgent" },
    { id: "MT-005", equipment: "Assemblage Auto E", type: "Préventive", priority: "Moyenne", scheduled: "2024-02-18", technician: "Jean Dupont", status: "Complétée" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Complétée": return "bg-success/10 text-success border-success/20";
      case "En cours": return "bg-primary/10 text-primary border-primary/20";
      case "Programmée": return "bg-secondary/10 text-secondary-foreground border-secondary/20";
      case "Urgent": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critique": return "bg-destructive/10 text-destructive border-destructive/20";
      case "Haute": return "bg-warning/10 text-warning border-warning/20";
      case "Moyenne": return "bg-primary/10 text-primary border-primary/20";
      case "Basse": return "bg-muted/10 text-muted-foreground border-muted/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  return (
    <div className="min-h-screen bg-dashboard-content">
      {/* Header */}
      <div className="bg-dashboard-header border-b p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Maintenance</h1>
            <p className="text-muted-foreground">Planifiez et suivez toutes les interventions de maintenance</p>
          </div>
          <Button className="w-fit">
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle Intervention
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Maintenances Prévues</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">
                Cette semaine
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En Cours</CardTitle>
              <Wrench className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">
                Interventions actives
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Urgentes</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">
                Priorité critique
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Complétées</CardTitle>
              <CheckCircle className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">
                Ce mois
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Maintenance Préventive
              </CardTitle>
              <CardDescription>
                Planifiez les maintenances régulières pour éviter les pannes
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5 text-warning" />
                Maintenance Corrective
              </CardTitle>
              <CardDescription>
                Interventions pour résoudre les problèmes identifiés
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Intervention Urgente
              </CardTitle>
              <CardDescription>
                Réparations d'urgence pour équipements critiques
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Maintenance Schedule */}
        <Card>
          <CardHeader>
            <CardTitle>Planning des Interventions</CardTitle>
            <CardDescription>
              Vue d'ensemble des maintenances programmées et en cours
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Équipement</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Priorité</TableHead>
                    <TableHead>Date Prévue</TableHead>
                    <TableHead>Technicien</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {maintenanceData.map((maintenance) => (
                    <TableRow key={maintenance.id}>
                      <TableCell className="font-medium">{maintenance.id}</TableCell>
                      <TableCell>{maintenance.equipment}</TableCell>
                      <TableCell>{maintenance.type}</TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(maintenance.priority)}>
                          {maintenance.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          {maintenance.scheduled}
                        </div>
                      </TableCell>
                      <TableCell>{maintenance.technician}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(maintenance.status)}>
                          {maintenance.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          Détails
                        </Button>
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