import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { User, Mail, Phone, MapPin, Clock, Star, Plus, Edit } from "lucide-react";

export default function Technicians() {
  const techniciansData = [
    { 
      id: "TECH-001", 
      name: "Jean Dupont", 
      email: "jean.dupont@timelec.com", 
      phone: "+33 1 23 45 67 89",
      specialty: "Électrique", 
      zone: "Zone A", 
      status: "Disponible", 
      experience: "8 ans",
      rating: 4.8,
      tasksCompleted: 156,
      initials: "JD"
    },
    { 
      id: "TECH-002", 
      name: "Marie Martin", 
      email: "marie.martin@timelec.com", 
      phone: "+33 1 23 45 67 90",
      specialty: "Mécanique", 
      zone: "Zone B", 
      status: "En intervention", 
      experience: "12 ans",
      rating: 4.9,
      tasksCompleted: 203,
      initials: "MM"
    },
    { 
      id: "TECH-003", 
      name: "Paul Bernard", 
      email: "paul.bernard@timelec.com", 
      phone: "+33 1 23 45 67 91",
      specialty: "Hydraulique", 
      zone: "Zone C", 
      status: "Disponible", 
      experience: "6 ans",
      rating: 4.6,
      tasksCompleted: 98,
      initials: "PB"
    },
    { 
      id: "TECH-004", 
      name: "Sophie Petit", 
      email: "sophie.petit@timelec.com", 
      phone: "+33 1 23 45 67 92",
      specialty: "Électronique", 
      zone: "Zone A", 
      status: "En congé", 
      experience: "10 ans",
      rating: 4.7,
      tasksCompleted: 178,
      initials: "SP"
    },
    { 
      id: "TECH-005", 
      name: "Michel Durand", 
      email: "michel.durand@timelec.com", 
      phone: "+33 1 23 45 67 93",
      specialty: "Pneumatique", 
      zone: "Zone B", 
      status: "Disponible", 
      experience: "15 ans",
      rating: 4.9,
      tasksCompleted: 267,
      initials: "MD"
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Disponible": return "bg-success/10 text-success border-success/20";
      case "En intervention": return "bg-primary/10 text-primary border-primary/20";
      case "En congé": return "bg-muted/10 text-muted-foreground border-muted/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const getSpecialtyColor = (specialty: string) => {
    switch (specialty) {
      case "Électrique": return "bg-accent/10 text-accent border-accent/20";
      case "Mécanique": return "bg-primary/10 text-primary border-primary/20";
      case "Hydraulique": return "bg-method/10 text-method border-method/20";
      case "Électronique": return "bg-moyens/10 text-moyens border-moyens/20";
      case "Pneumatique": return "bg-milieu/10 text-milieu border-milieu/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  return (
    <div className="min-h-screen bg-dashboard-content">
      {/* Header */}
      <div className="bg-dashboard-header border-b p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Techniciens</h1>
            <p className="text-muted-foreground">Gérez votre équipe de maintenance et suivez leurs interventions</p>
          </div>
          <Button className="w-fit">
            <Plus className="h-4 w-4 mr-2" />
            Ajouter Technicien
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Techniciens</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">
                Équipe complète
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Disponibles</CardTitle>
              <Clock className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">
                Prêts pour intervention
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">En Intervention</CardTitle>
              <Clock className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">
                Actuellement occupés
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Note Moyenne</CardTitle>
              <Star className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.7</div>
              <p className="text-xs text-muted-foreground">
                Sur 5 étoiles
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Team Overview Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {techniciansData.slice(0, 3).map((tech) => (
            <Card key={tech.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary font-medium">
                      {tech.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{tech.name}</h3>
                      <Badge className={getStatusColor(tech.status)}>
                        {tech.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getSpecialtyColor(tech.specialty)}>
                        {tech.specialty}
                      </Badge>
                      <span className="text-sm text-muted-foreground">• {tech.zone}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-3 w-3 text-muted-foreground" />
                    {tech.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-3 w-3 text-muted-foreground" />
                    {tech.phone}
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-warning fill-current" />
                      <span className="text-sm font-medium">{tech.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {tech.tasksCompleted} tâches
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Full Team Table */}
        <Card>
          <CardHeader>
            <CardTitle>Équipe Complète</CardTitle>
            <CardDescription>
              Vue d'ensemble de tous les techniciens et leurs informations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Technicien</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Spécialité</TableHead>
                    <TableHead>Zone</TableHead>
                    <TableHead>Expérience</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Note</TableHead>
                    <TableHead>Tâches</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {techniciansData.map((tech) => (
                    <TableRow key={tech.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs">
                              {tech.initials}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{tech.name}</div>
                            <div className="text-xs text-muted-foreground">{tech.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-xs">
                            <Mail className="h-3 w-3" />
                            {tech.email}
                          </div>
                          <div className="flex items-center gap-1 text-xs">
                            <Phone className="h-3 w-3" />
                            {tech.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getSpecialtyColor(tech.specialty)}>
                          {tech.specialty}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          {tech.zone}
                        </div>
                      </TableCell>
                      <TableCell>{tech.experience}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(tech.status)}>
                          {tech.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-warning fill-current" />
                          {tech.rating}
                        </div>
                      </TableCell>
                      <TableCell>{tech.tasksCompleted}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-3 w-3" />
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