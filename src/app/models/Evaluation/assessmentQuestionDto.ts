import { assessmentQuestionAnswerDto } from "./assessmentQuestionAnswerDto";

export interface assessmentQuestionDto {

    idQuestion: number;
    assessmentQuestionAnswer: assessmentQuestionAnswerDto[];
}