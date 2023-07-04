
import { DetailsRequestDto } from "./detailsRequestDto";

export interface Request {

    idRequest: number;
    timeInMinutes: number;
    titleRequest: string;
    percentageMinimoRequired: number;
    detailRequirements: DetailsRequestDto[];
    questionsRequired: number[];
}