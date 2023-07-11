import { assessmentAnswerDto } from "./assessmentAnswerDto";

export interface ConsultAssessmentDto {
    idQuestion: number;
    urlQuestion: string;
    questionDescription: string;
    assessmentAnswer: assessmentAnswerDto[];
}





