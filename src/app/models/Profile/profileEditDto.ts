import { profileDto } from "./profileDto";

export class profileEditDto extends profileDto {

    description? : string;
    phone? : string;
    photo? : string;
    cv? : string;
}