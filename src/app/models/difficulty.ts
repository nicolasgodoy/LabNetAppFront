import { Skill } from "./skill"

export class Difficulty{
    id: number;
    description: string;
    value: number;
    skillEntities: Skill[] = [];
    // falta la de Details
}