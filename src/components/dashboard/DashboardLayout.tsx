import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, BarChart3, Plus, Filter, Target } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navigation = [
  { id: 'overview', name: 'Tableau de Bord', icon: BarChart3 },
  { id: 'add', name: 'Ajouter Panne', icon: Plus },
  { id: 'filter', name: 'Filtrer', icon: Filter },
  { id: 'ishikawa', name: 'Diagramme Ishikawa', icon: Target },
];

export function DashboardLayout({ children, activeTab, onTabChange }: DashboardLayoutProps) {
  const Sidebar = ({ className }: { className?: string }) => (
    <div className={cn("pb-12 min-h-screen", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold text-dashboard-sidebar-foreground">
            5M Breakdown Analysis
          </h2>
          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    activeTab === item.id 
                      ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                      : "text-dashboard-sidebar-foreground hover:bg-primary/10"
                  )}
                  onClick={() => onTabChange(item.id)}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-dashboard-content">
      {/* Desktop Sidebar */}
      <div className="hidden md:block fixed inset-y-0 z-50 w-72 bg-dashboard-sidebar">
        <Sidebar />
      </div>

      {/* Mobile Header */}
      <div className="md:hidden bg-dashboard-header border-b p-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 bg-dashboard-sidebar">
            <Sidebar />
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Content */}
      <div className="md:pl-72">
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}