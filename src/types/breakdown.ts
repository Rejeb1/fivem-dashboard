export interface Breakdown {
  id: string;
  equipmentName: string;
  date: string;
  description: string;
  cause: number; // 0 = false alert, 1-5 = 5M methods
  createdAt: Date;
}

export const CAUSE_LABELS = {
  0: "Fausse Alerte",
  1: "Méthode",
  2: "Milieu", 
  3: "Matière",
  4: "Main-d'œuvre",
  5: "Moyens"
};

export const CAUSE_COLORS = {
  0: "false-alert",
  1: "method",
  2: "milieu",
  3: "matiere", 
  4: "main-oeuvre",
  5: "moyens"
};