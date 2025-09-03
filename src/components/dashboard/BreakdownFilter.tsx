import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Breakdown, CAUSE_LABELS, CAUSE_COLORS } from "@/types/breakdown";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface BreakdownFilterProps {
  breakdowns: Breakdown[];
}

export function BreakdownFilter({ breakdowns }: BreakdownFilterProps) {
  const [selectedCause, setSelectedCause] = useState<string>("all");

  const filteredBreakdowns = selectedCause === "all" 
    ? breakdowns 
    : breakdowns.filter(b => b.cause === parseInt(selectedCause));

  const getCauseColor = (cause: number) => {
    return CAUSE_COLORS[cause as keyof typeof CAUSE_COLORS] || "false-alert";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Filtrer les Pannes</CardTitle>
          <CardDescription>Filtrez les pannes par cause selon la méthode 5M</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <Select value={selectedCause} onValueChange={setSelectedCause}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez une cause" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les causes</SelectItem>
                  {Object.entries(CAUSE_LABELS).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setSelectedCause("all")}
            >
              Réinitialiser
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Résultats du Filtre 
            <span className="text-muted-foreground text-base font-normal ml-2">
              ({filteredBreakdowns.length} panne{filteredBreakdowns.length > 1 ? 's' : ''})
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredBreakdowns.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Aucune panne trouvée pour ce filtre
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Équipement</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Cause</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBreakdowns.map((breakdown) => (
                    <TableRow key={breakdown.id}>
                      <TableCell className="font-medium">
                        {breakdown.equipmentName}
                      </TableCell>
                      <TableCell>
                        {format(new Date(breakdown.date), "dd MMM yyyy", { locale: fr })}
                      </TableCell>
                      <TableCell className="max-w-md">
                        <div className="truncate" title={breakdown.description}>
                          {breakdown.description}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="secondary"
                          className={`bg-${getCauseColor(breakdown.cause)}/10 text-${getCauseColor(breakdown.cause)} border-${getCauseColor(breakdown.cause)}/20`}
                        >
                          {CAUSE_LABELS[breakdown.cause as keyof typeof CAUSE_LABELS]}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}