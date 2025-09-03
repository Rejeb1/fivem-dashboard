import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { BreakdownForm } from "@/components/dashboard/BreakdownForm";
import { BreakdownChart } from "@/components/dashboard/BreakdownChart";
import { BreakdownFilter } from "@/components/dashboard/BreakdownFilter";
import { IshikawaDiagram } from "@/components/dashboard/IshikawaDiagram";
import { Breakdown } from "@/types/breakdown";

// Sample data based on the provided numbers
const SAMPLE_DATA: Omit<Breakdown, 'id' | 'createdAt'>[] = [
  { equipmentName: "Convoyeur A-001", date: "2024-01-15", description: "Arrêt inattendu du moteur principal", cause: 3 },
  { equipmentName: "Presse B-002", date: "2024-01-18", description: "Problème de formation du personnel", cause: 1 },
  { equipmentName: "Robot C-003", date: "2024-01-20", description: "Température ambiante trop élevée", cause: 3 },
  { equipmentName: "Soudure D-004", date: "2024-01-22", description: "Capteur défaillant - fausse alerte", cause: 0 },
  { equipmentName: "Découpe E-005", date: "2024-01-25", description: "Procédure non respectée", cause: 3 },
  { equipmentName: "Assemblage F-006", date: "2024-01-28", description: "Matériau de mauvaise qualité", cause: 2 },
  { equipmentName: "Contrôle G-007", date: "2024-02-01", description: "Maintenance préventive non effectuée", cause: 4 },
  { equipmentName: "Emballage H-008", date: "2024-02-03", description: "Panne hydraulique", cause: 3 },
  { equipmentName: "Transport I-009", date: "2024-02-05", description: "Erreur de manipulation", cause: 1 },
  { equipmentName: "Stockage J-010", date: "2024-02-08", description: "Surcharge électrique", cause: 3 },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [breakdowns, setBreakdowns] = useState<Breakdown[]>([]);

  useEffect(() => {
    // Load sample data
    const sampleBreakdowns: Breakdown[] = SAMPLE_DATA.map((item, index) => ({
      ...item,
      id: `breakdown-${index + 1}`,
      createdAt: new Date()
    }));
    setBreakdowns(sampleBreakdowns);
  }, []);

  const handleAddBreakdown = (newBreakdown: Omit<Breakdown, 'id' | 'createdAt'>) => {
    const breakdown: Breakdown = {
      ...newBreakdown,
      id: `breakdown-${Date.now()}`,
      createdAt: new Date()
    };
    setBreakdowns(prev => [breakdown, ...prev]);
    setActiveTab('overview'); // Redirect to overview after adding
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Tableau de Bord 5M</h1>
              <p className="text-muted-foreground mt-2">
                Analyse des pannes d'équipement selon la méthode 5M (Méthode, Milieu, Matière, Main-d'œuvre, Moyens)
              </p>
            </div>
            <DashboardOverview breakdowns={breakdowns} />
            <BreakdownChart breakdowns={breakdowns} />
          </div>
        );
      case 'add':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Ajouter une Panne</h1>
              <p className="text-muted-foreground mt-2">
                Enregistrez une nouvelle panne d'équipement
              </p>
            </div>
            <BreakdownForm onAdd={handleAddBreakdown} />
          </div>
        );
      case 'filter':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Filtrer les Pannes</h1>
              <p className="text-muted-foreground mt-2">
                Analysez les pannes par cause selon la méthode 5M
              </p>
            </div>
            <BreakdownFilter breakdowns={breakdowns} />
          </div>
        );
      case 'ishikawa':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Diagramme d'Ishikawa</h1>
              <p className="text-muted-foreground mt-2">
                Visualisation des causes racines selon la méthode 5M
              </p>
            </div>
            <IshikawaDiagram breakdowns={breakdowns} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </DashboardLayout>
  );
}