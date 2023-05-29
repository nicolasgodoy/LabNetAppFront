import { profileDto } from "./profileDto";
import { WorkDto } from "./profileEducationDto";

export class profileEditDto extends profileDto {

    description? : string;
    phone? : string;
    photo? : string;
    cv? : string;
    workEntities : WorkDto[] = []
}