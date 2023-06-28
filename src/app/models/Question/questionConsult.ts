import { Answer } from "../Answer/answer";
import { Skill } from "../skill";

export class questionConsult {

    id?: number;
    isVisible: boolean;
    description: string;
    value: number;
    skillEntities: Skill[] = [];
    answerEntities : Answer[] = [];
    file?: string;
    idFile?: number;
}