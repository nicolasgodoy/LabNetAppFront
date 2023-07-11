import { AssessmentQuestionDto} from "./assessmentQuestionDto";


export interface ConsultAssessmentUserDto {
    idRequest: number;
    requestTitle: string;
    dateTime: Date;
    pointsObtained: number;
    assessmentQuestion: AssessmentQuestionDto[];
}

 
    