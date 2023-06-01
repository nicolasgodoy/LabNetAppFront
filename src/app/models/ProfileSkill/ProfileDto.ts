import { Skill } from "../skill";

export interface ProfileDto{
    id?: number;
    idUser?: number;
    name?:string;
    lastName?:string;
    mail?:string;
    phone?:string;
    skill: Skill[];
}
