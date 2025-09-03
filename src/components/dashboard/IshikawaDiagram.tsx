import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Breakdown, CAUSE_LABELS, CAUSE_COLORS } from "@/types/breakdown";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface IshikawaDiagramProps {
  breakdowns: Breakdown[];
}

export function IshikawaDiagram({ breakdowns }: IshikawaDiagramProps) {
  const [selectedCause, setSelectedCause] = useState<number | null>(null);

  const getBreakdownsByCause = (cause: number) => {
    return breakdowns.filter(b => b.cause === cause);
  };

  const getCauseColor = (cause: number) => {
    return CAUSE_COLORS[cause as keyof typeof CAUSE_COLORS] || "false-alert";
  };

  const branches = [
    { cause: 1, label: "Méthode", position: "top-left", angle: "-30deg" },
    { cause: 2, label: "Milieu", position: "top-right", angle: "30deg" },
    { cause: 3, label: "Matière", position: "bottom-left", angle: "30deg" },
    { cause: 4, label: "Main-d'œuvre", position: "bottom-right", angle: "-30deg" },
    { cause: 5, label: "Moyens", position: "center", angle: "0deg" }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Diagramme d'Ishikawa (Arête de Poisson)</CardTitle>
          <CardDescription>
            Analyse des causes racines selon la méthode 5M. Cliquez sur une branche pour voir les pannes associées.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative w-full h-96 bg-muted/20 rounded-lg overflow-hidden">
            {/* Main spine */}
            <div className="absolute top-1/2 left-4 right-16 h-1 bg-foreground transform -translate-y-1/2">
              {/* Arrow head */}
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                <div className="w-0 h-0 border-l-4 border-l-foreground border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
              </div>
            </div>

            {/* Problem label */}
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-destructive text-destructive-foreground px-3 py-1 rounded text-sm font-medium">
              Pannes d'Équipement
            </div>

            {/* Branches */}
            {branches.map((branch) => {
              const count = getBreakdownsByCause(branch.cause).length;
              const color = getCauseColor(branch.cause);
              
              return (
                <Dialog key={branch.cause}>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className={`absolute transform ${getBranchPosition(branch.position)} hover:scale-105 transition-transform`}
                      style={{ transform: getBranchTransform(branch.position, branch.angle) }}
                    >
                      <div className="text-center">
                        <div className={`w-24 h-1 bg-${color} mb-2`}></div>
                        <div className={`bg-${color}/10 border border-${color}/20 px-3 py-1 rounded text-sm font-medium`}>
                          {branch.label}
                          {count > 0 && (
                            <Badge variant="secondary" className="ml-2 text-xs">
                              {count}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>
                        Pannes - {branch.label}
                        <span className="text-muted-foreground text-base font-normal ml-2">
                          ({count} panne{count > 1 ? 's' : ''})
                        </span>
                      </DialogTitle>
                    </DialogHeader>
                    <div className="mt-4">
                      {count === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                          Aucune panne enregistrée pour cette cause
                        </div>
                      ) : (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Équipement</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead>Description</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {getBreakdownsByCause(branch.cause).map((breakdown) => (
                              <TableRow key={breakdown.id}>
                                <TableCell className="font-medium">
                                  {breakdown.equipmentName}
                                </TableCell>
                                <TableCell>
                                  {format(new Date(breakdown.date), "dd MMM yyyy", { locale: fr })}
                                </TableCell>
                                <TableCell>
                                  {breakdown.description}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function getBranchPosition(position: string): string {
  switch (position) {
    case "top-left":
      return "top-16 left-1/4";
    case "top-right":
      return "top-16 right-1/4";
    case "bottom-left":
      return "bottom-16 left-1/4";
    case "bottom-right":
      return "bottom-16 right-1/4";
    case "center":
      return "top-1/2 left-1/2";
    default:
      return "top-1/2 left-1/2";
  }
}

function getBranchTransform(position: string, angle: string): string {
  const baseTransform = position === "center" ? "-translate-x-1/2 -translate-y-1/2" : "-translate-x-1/2";
  return `${baseTransform} rotate(${angle})`;
}