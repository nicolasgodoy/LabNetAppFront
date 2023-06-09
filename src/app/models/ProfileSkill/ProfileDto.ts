import { WorkAddDto } from "../Work/WorkAddDto";
import { workDto } from "../Work/WorkDto";
import { Skill } from "../skill";

export interface ProfileDto{
    id?: number;
    idUser?: number;
    name?:string;
    lastName?:string;
    mail?:string;
    phone?:string;
    skill: Skill[];
    works: workDto[];

}
