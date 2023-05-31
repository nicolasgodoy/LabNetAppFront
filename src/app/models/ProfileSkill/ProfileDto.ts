import { Skill } from "../skill";

export interface ProfileDto{
    id?: number;
    name?:string;
    lastName?:string;
    mail?:string;
    phone?:string;
    skill: Skill[];
}
