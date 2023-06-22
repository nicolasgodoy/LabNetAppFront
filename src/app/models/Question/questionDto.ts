import { Answer } from "../Answer/answer";

export interface QuestionDto {

    id?: number;
    description: string;
    value: number;
    idSkill: number;
    fileName?: string;
    file?: string;
    answerEntities : Answer[];
}