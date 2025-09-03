import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Breakdown, CAUSE_LABELS, CAUSE_COLORS } from "@/types/breakdown";

interface BreakdownChartProps {
  breakdowns: Breakdown[];
}

export function BreakdownChart({ breakdowns }: BreakdownChartProps) {
  const data = Object.entries(CAUSE_LABELS).map(([cause, label]) => {
    const count = breakdowns.filter(b => b.cause === parseInt(cause)).length;
    const percentage = breakdowns.length > 0 ? (count / breakdowns.length) * 100 : 0;
    
    return {
      name: label,
      value: count,
      percentage: percentage.toFixed(1),
      cause: parseInt(cause),
      color: `hsl(var(--${CAUSE_COLORS[parseInt(cause) as keyof typeof CAUSE_COLORS]}))`
    };
  }).filter(item => item.value > 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card p-3 rounded-lg shadow-lg border">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm text-muted-foreground">
            {data.value} panne{data.value > 1 ? 's' : ''} ({data.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Répartition des Pannes par Cause (5M)</CardTitle>
          <CardDescription>Analyse statistique des causes de pannes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            Aucune donnée à afficher
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Répartition des Pannes par Cause (5M)</CardTitle>
        <CardDescription>
          Analyse statistique des causes de pannes sur {breakdowns.length} enregistrement{breakdowns.length > 1 ? 's' : ''}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${name}: ${percentage}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                formatter={(value, entry: any) => `${value} (${entry.payload.value})`}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}