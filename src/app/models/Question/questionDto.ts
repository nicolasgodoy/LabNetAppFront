import { Answer } from "../Answer/answer";
import { Skill } from "../skill";

export class QuestionDto {

    id?: number;
    description: string;
    value: number;
    skillList: Skill[] = [];
    skills: number[] = [];
    file?: string;
    answers : Answer[] = [];
    answersInsert : Answer[] = [];
}