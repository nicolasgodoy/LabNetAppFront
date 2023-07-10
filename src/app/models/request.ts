
import { QuestionDto } from "./Question/questionDto";
import { DetailsRequestDto } from "./detailsRequestDto";

export interface Request {

    id: number;
    timeInMinutes: number;
    titleRequest: string;
    percentageMinimoRequired: number;
    detailRequirements: DetailsRequestDto[];
    questionsRequired: number[];
}

export interface RequestDto {

    id: number;
    timeInMinutes: number;
    titleRequest: string;
    percentageMinimoRequired: number;
    detailRequirements: DetailsRequestDto[];
    questionsRequired: QuestionDto[];
}