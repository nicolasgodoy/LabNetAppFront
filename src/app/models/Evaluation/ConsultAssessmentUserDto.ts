import { AssessmentQuestionDto} from "./assessmentQuestionDto";


export interface ConsultAssessmentUserDto {
    idRequest: number;
    nombreUser: string;
    requestTitle: string;
    dateTime: Date;
    pointsObtained: number;
    dniUsuario: number;
    consultAssessmentQuestion: AssessmentQuestionDto[];
}

 
    