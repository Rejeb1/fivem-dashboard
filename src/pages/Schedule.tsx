import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, User, Plus, ChevronLeft, ChevronRight } from "lucide-react";

export default function Schedule() {
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('fr-FR', { month: 'long', year: 'numeric' });

  const todaySchedule = [
    { time: "08:00", task: "Maintenance Convoyeur A", technician: "Jean Dupont", location: "Zone A", priority: "Haute" },
    { time: "10:30", task: "Inspection Robot Soudage", technician: "Marie Martin", location: "Zone C", priority: "Moyenne" },
    { time: "14:00", task: "Réparation Presse B", technician: "Paul Bernard", location: "Zone B", priority: "Critique" },
    { time: "16:00", task: "Maintenance préventive", technician: "Sophie Petit", location: "Zone A", priority: "Basse" },
  ];

  const upcomingTasks = [
    { date: "Demain", task: "Révision annuelle Découpe Laser", technician: "Jean Dupont", priority: "Haute" },
    { date: "15 Fév", task: "Remplacement courroies", technician: "Marie Martin", priority: "Moyenne" },
    { date: "18 Fév", task: "Contrôle hydraulique", technician: "Paul Bernard", priority: "Moyenne" },
    { date: "20 Fév", task: "Calibration instruments", technician: "Sophie Petit", priority: "Basse" },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critique": return "bg-destructive/10 text-destructive border-destructive/20";
      case "Haute": return "bg-warning/10 text-warning border-warning/20";
      case "Moyenne": return "bg-primary/10 text-primary border-primary/20";
      case "Basse": return "bg-muted/10 text-muted-foreground border-muted/20";
      default: return "bg-muted/10 text-muted-foreground border-muted/20";
    }
  };

  const calendarDays = Array.from({ length: 28 }, (_, i) => i + 1);
  const hasTask = (day: number) => [3, 7, 12, 15, 18, 20, 25].includes(day);

  return (
    <div className="min-h-screen bg-dashboard-content">
      {/* Header */}
      <div className="bg-dashboard-header border-b p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Planning</h1>
            <p className="text-muted-foreground">Organisez et suivez le planning des interventions</p>
          </div>
          <Button className="w-fit">
            <Plus className="h-4 w-4 mr-2" />
            Nouvel Événement
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Today's Overview */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Aujourd'hui - {currentDate.toLocaleDateString('fr-FR')}
                </CardTitle>
                <CardDescription>
                  Planning des interventions pour aujourd'hui
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {todaySchedule.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="text-sm font-mono font-medium w-16">
                      {item.time}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{item.task}</div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {item.technician}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {item.location}
                        </div>
                      </div>
                    </div>
                    <Badge className={getPriorityColor(item.priority)}>
                      {item.priority}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Calendar View */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    {currentMonth}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
                    <div key={day} className="text-center text-sm font-medium p-2">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {calendarDays.map(day => (
                    <div 
                      key={day} 
                      className={`
                        relative p-2 text-center text-sm border rounded cursor-pointer hover:bg-muted/50 transition-colors
                        ${day === currentDate.getDate() ? 'bg-primary text-primary-foreground' : ''}
                        ${hasTask(day) ? 'border-accent' : ''}
                      `}
                    >
                      {day}
                      {hasTask(day) && (
                        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-accent rounded-full" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Statistiques Rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Aujourd'hui</span>
                  <span className="font-medium">4 tâches</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Cette semaine</span>
                  <span className="font-medium">23 tâches</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Ce mois</span>
                  <span className="font-medium">156 tâches</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Taux completion</span>
                    <span className="font-medium text-success">94%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Tasks */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Prochaines Tâches</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingTasks.map((task, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-muted-foreground">{task.date}</span>
                      <Badge className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                    </div>
                    <div className="text-sm font-medium mb-1">{task.task}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {task.technician}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}