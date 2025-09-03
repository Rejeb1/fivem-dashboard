import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { FileText, Download, TrendingUp, AlertTriangle, CheckCircle, Clock } from "lucide-react";

export default function Reports() {
  const monthlyData = [
    { month: "Jan", interventions: 45, preventive: 30, corrective: 15 },
    { month: "Fév", interventions: 52, preventive: 32, corrective: 20 },
    { month: "Mar", interventions: 38, preventive: 28, corrective: 10 },
    { month: "Avr", interventions: 61, preventive: 38, corrective: 23 },
    { month: "Mai", interventions: 44, preventive: 29, corrective: 15 },
    { month: "Juin", interventions: 55, preventive: 35, corrective: 20 },
  ];

  const statusData = [
    { name: "Complétées", value: 156, color: "hsl(var(--success))" },
    { name: "En cours", value: 23, color: "hsl(var(--primary))" },
    { name: "Programmées", value: 45, color: "hsl(var(--warning))" },
    { name: "En retard", value: 8, color: "hsl(var(--destructive))" },
  ];

  const equipmentData = [
    { zone: "Zone A", operational: 85, maintenance: 12, critical: 3 },
    { zone: "Zone B", operational: 92, maintenance: 6, critical: 2 },
    { zone: "Zone C", operational: 78, maintenance: 18, critical: 4 },
  ];

  const performanceData = [
    { date: "01/02", completion: 94, efficiency: 87 },
    { date: "02/02", completion: 96, efficiency: 89 },
    { date: "03/02", completion: 92, efficiency: 85 },
    { date: "04/02", completion: 98, efficiency: 92 },
    { date: "05/02", completion: 95, efficiency: 88 },
    { date: "06/02", completion: 97, efficiency: 91 },
    { date: "07/02", completion: 94, efficiency: 86 },
  ];

  return (
    <div className="min-h-screen bg-dashboard-content">
      {/* Header */}
      <div className="bg-dashboard-header border-b p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Rapports</h1>
            <p className="text-muted-foreground">Analyses et statistiques détaillées des opérations de maintenance</p>
          </div>
          <div className="flex gap-2">
            <Select defaultValue="month">
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Cette semaine</SelectItem>
                <SelectItem value="month">Ce mois</SelectItem>
                <SelectItem value="quarter">Ce trimestre</SelectItem>
                <SelectItem value="year">Cette année</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taux de Completion</CardTitle>
              <CheckCircle className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94.2%</div>
              <p className="text-xs text-muted-foreground">
                +2.1% vs mois dernier
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">MTTR Moyen</CardTitle>
              <Clock className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.4h</div>
              <p className="text-xs text-muted-foreground">
                -0.3h vs mois dernier
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Disponibilité</CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">98.7%</div>
              <p className="text-xs text-muted-foreground">
                +1.2% vs mois dernier
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Interventions Urgentes</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">
                -3 vs mois dernier
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Monthly Interventions Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Interventions Mensuelles</CardTitle>
              <CardDescription>
                Évolution des maintenances préventives et correctives
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="preventive" fill="hsl(var(--primary))" name="Préventive" />
                    <Bar dataKey="corrective" fill="hsl(var(--warning))" name="Corrective" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Status Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Répartition des Statuts</CardTitle>
              <CardDescription>
                État actuel de toutes les interventions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Equipment by Zone */}
          <Card>
            <CardHeader>
              <CardTitle>État des Équipements par Zone</CardTitle>
              <CardDescription>
                Répartition du statut des équipements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={equipmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="zone" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="operational" fill="hsl(var(--success))" name="Opérationnel" />
                    <Bar dataKey="maintenance" fill="hsl(var(--warning))" name="Maintenance" />
                    <Bar dataKey="critical" fill="hsl(var(--destructive))" name="Critique" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Performance Trends */}
          <Card>
            <CardHeader>
              <CardTitle>Tendances de Performance</CardTitle>
              <CardDescription>
                Évolution du taux de completion et de l'efficacité
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="completion" 
                      stroke="hsl(var(--primary))" 
                      name="Completion %" 
                      strokeWidth={2}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="efficiency" 
                      stroke="hsl(var(--accent))" 
                      name="Efficacité %" 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Report Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Rapports Disponibles</CardTitle>
            <CardDescription>
              Générez et téléchargez des rapports détaillés
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                <FileText className="h-6 w-6" />
                <div className="text-center">
                  <div className="font-medium">Rapport Mensuel</div>
                  <div className="text-xs text-muted-foreground">Synthèse complète</div>
                </div>
              </Button>
              
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                <TrendingUp className="h-6 w-6" />
                <div className="text-center">
                  <div className="font-medium">Analyse KPI</div>
                  <div className="text-xs text-muted-foreground">Indicateurs clés</div>
                </div>
              </Button>
              
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                <CheckCircle className="h-6 w-6" />
                <div className="text-center">
                  <div className="font-medium">Historique</div>
                  <div className="text-xs text-muted-foreground">Toutes interventions</div>
                </div>
              </Button>
              
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                <AlertTriangle className="h-6 w-6" />
                <div className="text-center">
                  <div className="font-medium">Rapport Urgences</div>
                  <div className="text-xs text-muted-foreground">Interventions critiques</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}