import { AssessmentQuestionAnswerDto } from './assessmentQuestionAnswerDto';

export interface AssessmentQuestionDto {
  idQuestion: number;
  assessmentQuestionAnswer: AssessmentQuestionAnswerDto[];
}
