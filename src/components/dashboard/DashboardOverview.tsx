import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Breakdown, CAUSE_LABELS, CAUSE_COLORS } from "@/types/breakdown";
import { AlertTriangle, TrendingUp, Calendar, Settings } from "lucide-react";

interface DashboardOverviewProps {
  breakdowns: Breakdown[];
}

export function DashboardOverview({ breakdowns }: DashboardOverviewProps) {
  const totalBreakdowns = breakdowns.length;
  const falseAlerts = breakdowns.filter(b => b.cause === 0).length;
  const realBreakdowns = totalBreakdowns - falseAlerts;
  const falseAlertRate = totalBreakdowns > 0 ? (falseAlerts / totalBreakdowns * 100).toFixed(1) : "0";

  const recentBreakdowns = breakdowns
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const causeStats = Object.entries(CAUSE_LABELS).map(([cause, label]) => {
    const count = breakdowns.filter(b => b.cause === parseInt(cause)).length;
    const percentage = totalBreakdowns > 0 ? (count / totalBreakdowns * 100).toFixed(1) : "0";
    return { cause: parseInt(cause), label, count, percentage };
  }).filter(stat => stat.count > 0);

  const getCauseColor = (cause: number) => {
    return CAUSE_COLORS[cause as keyof typeof CAUSE_COLORS] || "false-alert";
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pannes</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBreakdowns}</div>
            <p className="text-xs text-muted-foreground">
              Toutes pannes confondues
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pannes Réelles</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{realBreakdowns}</div>
            <p className="text-xs text-muted-foreground">
              Hors fausses alertes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fausses Alertes</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{falseAlerts}</div>
            <p className="text-xs text-muted-foreground">
              {falseAlertRate}% du total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cette Semaine</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {breakdowns.filter(b => {
                const weekAgo = new Date();
                weekAgo.setDate(weekAgo.getDate() - 7);
                return new Date(b.date) >= weekAgo;
              }).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Nouvelles pannes
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Cause Statistics */}
        <Card>
          <CardHeader>
            <CardTitle>Répartition par Cause (5M)</CardTitle>
            <CardDescription>Statistiques des causes de pannes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {causeStats.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  Aucune donnée disponible
                </p>
              ) : (
                causeStats.map((stat) => (
                  <div key={stat.cause} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className={`w-3 h-3 rounded-full bg-${getCauseColor(stat.cause)}`}
                      ></div>
                      <span className="text-sm font-medium">{stat.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{stat.percentage}%</span>
                      <Badge variant="secondary">{stat.count}</Badge>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Breakdowns */}
        <Card>
          <CardHeader>
            <CardTitle>Pannes Récentes</CardTitle>
            <CardDescription>Les 5 dernières pannes enregistrées</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentBreakdowns.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  Aucune panne enregistrée
                </p>
              ) : (
                recentBreakdowns.map((breakdown) => (
                  <div key={breakdown.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{breakdown.equipmentName}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {breakdown.description}
                      </p>
                    </div>
                    <div className="ml-2 flex-shrink-0">
                      <Badge 
                        variant="secondary"
                        className={`bg-${getCauseColor(breakdown.cause)}/10 text-${getCauseColor(breakdown.cause)} border-${getCauseColor(breakdown.cause)}/20`}
                      >
                        {CAUSE_LABELS[breakdown.cause as keyof typeof CAUSE_LABELS]}
                      </Badge>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}