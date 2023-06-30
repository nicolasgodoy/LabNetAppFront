import { Answer } from "../Answer/answer";
import { Difficulty } from "../difficulty";
import { Skill } from "../skill";

export class questionConsult {

    id?: number;
    isVisible: boolean;
    description: string;
    difficulty: Difficulty;
    skillEntities: Skill[] = [];
    answerEntities : Answer[] = [];
    urlFile?: string;
    idFile?: number;
}