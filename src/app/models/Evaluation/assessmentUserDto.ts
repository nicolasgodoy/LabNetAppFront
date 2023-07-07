import { assessmentQuestionDto } from "./assessmentQuestionDto";


export interface assessmentUserDto {

    idRequest: number;
    assessmentQuestion: assessmentQuestionDto[];
}