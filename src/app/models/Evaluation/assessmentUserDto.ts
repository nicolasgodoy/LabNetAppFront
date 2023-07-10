import { AssessmentQuestionDto } from './assessmentQuestionDto';

export interface AssessmentUserDto {
  idRequest: number;
  assessmentQuestion: AssessmentQuestionDto[];
}
