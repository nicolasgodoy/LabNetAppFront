export interface AssessmentQuestion {
  id: number;
  isVisible: boolean;
  urlImg: null | string;
  difficulty: Difficulty;
  answers: Answer[];
  description: string;
  idFile: null;
}

export interface Answer {
  id: number;
  isCorrect: boolean;
  urlFile: null | string;
  description: string;
  idFile: null;
}

export interface Difficulty {
  id: number;
  description: string;
  value: number;
}
