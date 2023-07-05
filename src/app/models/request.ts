
import { DetailsRequestDto } from "./detailsRequestDto";

export interface Request {

    id: number;
    timeInMinutes: number;
    titleRequest: string;
    percentageMinimoRequired: number;
    detailRequirements: DetailsRequestDto[];
    questionsRequired: number[];
}