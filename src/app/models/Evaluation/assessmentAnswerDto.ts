
import { AssessmentQuestionAnswerDto } from "./assessmentQuestionAnswerDto";

export interface assessmentAnswerDto extends AssessmentQuestionAnswerDto  {
    idAnswer: number;
    isCorrect: boolean;
    answerDescription: string;
    urlAnswer: string;
   
}



