import { profileDto } from "./profileDto";
import { profileEducationDto } from "./profileEducation";
import { WorkDto } from "./profileWorkDto";

export class profileEditDto extends profileDto {

    description? : string;
    phone? : string;
    photo? : string;
    cv? : string;
    workEntities : WorkDto[]
    educationEntities: profileEducationDto[]
}