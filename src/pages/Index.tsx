import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { BarChart3, Settings, TrendingUp, Users, Calendar, Wrench, FileText } from "lucide-react";
import industrialHero from "@/assets/industrial-hero.jpg";

const Index = () => {
  const navigate = useNavigate();

  const navigationItems = [
    { title: "5M Dashboard", description: "Analyse des pannes selon la méthode 5M", icon: BarChart3, path: "/dashboard", color: "primary" },
    { title: "Équipements", description: "Gérez et surveillez tous vos équipements", icon: Settings, path: "/equipements", color: "accent" },
    { title: "Maintenance", description: "Planifiez et suivez les interventions", icon: Wrench, path: "/maintenance", color: "method" },
    { title: "Planning", description: "Organisez le planning des interventions", icon: Calendar, path: "/schedule", color: "milieu" },
    { title: "Techniciens", description: "Gérez votre équipe de maintenance", icon: Users, path: "/technicians", color: "moyens" },
    { title: "Rapports", description: "Analyses et statistiques détaillées", icon: FileText, path: "/reports", color: "matiere" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light via-background to-secondary">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="relative rounded-2xl overflow-hidden mb-16">
          <div 
            className="h-96 bg-cover bg-center relative"
            style={{ backgroundImage: `url(${industrialHero})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-dashboard-sidebar/90 to-dashboard-sidebar/70"></div>
            <div className="relative h-full flex items-center justify-center text-center text-white">
              <div>
                <h1 className="text-6xl font-bold mb-6">TIMELEC</h1>
                <p className="text-2xl mb-4">Système de Gestion de Maintenance</p>
                <p className="text-lg opacity-90 max-w-2xl mx-auto">
                  Plateforme complète pour surveiller, planifier et analyser toutes vos opérations de maintenance industrielle
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {navigationItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card 
                key={index}
                className="hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                onClick={() => navigate(item.path)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-${item.color}/10`}>
                      <Icon className={`h-6 w-6 text-${item.color}`} />
                    </div>
                    {item.title}
                  </CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="w-full justify-start p-0">
                    Accéder →
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Access */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6">Accès Rapide</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              onClick={() => navigate('/dashboard')}
              className="bg-primary hover:bg-primary-dark"
            >
              <BarChart3 className="h-5 w-5 mr-2" />
              Dashboard 5M
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/equipements')}
            >
              <Settings className="h-5 w-5 mr-2" />
              Équipements
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/maintenance')}
            >
              <Wrench className="h-5 w-5 mr-2" />
              Maintenance
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
