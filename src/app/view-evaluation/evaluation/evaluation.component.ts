import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import {
  Answer,
  AssessmentQuestion,
} from 'src/app/models/Question/assessmentQuestion';
import { QuestionServiceService } from 'src/app/service/question-service.service';
import { requestService } from 'src/app/service/request.service';
import { AssessmentUserDto } from '../../models/Evaluation/assessmentUserDto';
import { AssessmentQuestionDto } from 'src/app/models/Evaluation/assessmentQuestionDto';
import { AssessmentQuestionAnswerDto } from 'src/app/models/Evaluation/assessmentQuestionAnswerDto';
import { bootstrapApplication } from '@angular/platform-browser';
import { Alert } from 'src/app/helpers/alert';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css'],
})
export class EvaluationComponent implements OnInit {
  public id: number;
  public assessment: AssessmentQuestion[] = [];
  public assessmentQuestion: AssessmentQuestionDto[] = [];

  constructor(
    private questionService: QuestionServiceService,
    private activatedRoute: ActivatedRoute,
    private requestService: requestService
  ) {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.getQuestionById();
  }

  getQuestionById() {
    this.requestService.getAllQuestion(this.id).subscribe({
      next: (resp) => {
        this.assessment = resp.result as AssessmentQuestion[];
        console.log(this.assessment);
      },

      error: (error) => {
        console.log(error);
      },
    });
  }

  selectQuestion(idQuestion: number, idAnswer: number) {
    let questionExist = this.assessmentQuestion.find(
      (x) => x.idQuestion == idQuestion
    );

    if (questionExist != null) {
      let multiple: Boolean = this.multipleAnswer(
        this.assessment.find((x) => x.id == idQuestion).answers
      );

      if (multiple) {
        let listAnswer = questionExist.assessmentQuestionAnswer;

        if (listAnswer.find((x) => x.idAnswer == idAnswer)) {
          listAnswer = listAnswer.filter((x) => x.idAnswer != idAnswer);
        } else {
          let answer: AssessmentQuestionAnswerDto = {
            idAnswer: idAnswer,
            isCorrect: true,
          };
          listAnswer.push(answer);
        }

        questionExist.assessmentQuestionAnswer = listAnswer;
        this.assessmentQuestion = this.assessmentQuestion.filter(
          (x) => x.idQuestion != idQuestion
        );
        this.assessmentQuestion.push(questionExist);

        console.log(listAnswer);
      } else {
        let question = this.getQuestionAnswer(idQuestion, idAnswer);
        this.assessmentQuestion = this.assessmentQuestion.filter(
          (x) => x.idQuestion != idQuestion
        );
        this.assessmentQuestion.push(question);
      }
    } else {
      let question = this.getQuestionAnswer(idQuestion, idAnswer);
      this.assessmentQuestion.push(question);
    }

    // let post: AssessmentUserDto = {
    //   idRequest: this.id,
    //   assessmentQuestion: this.assessmentQuestion,
    // };

    //console.log(this.assessmentQuestion);
    //console.log(this.assessment.find((x) => x.id == idQuestion));
  }

  getQuestionAnswer(idQuestion: number, idAnswer: number) {
    let answer: AssessmentQuestionAnswerDto = {
      idAnswer: idAnswer,
      isCorrect: true,
    };
    let question: AssessmentQuestionDto = {
      idQuestion: idQuestion,
      assessmentQuestionAnswer: [answer],
    };

    return question;
  }

  validateCheckboxAndRadio(data: Answer[]): boolean {
    if (this.multipleAnswer(data)) {
      return false;
    } else {
      return true;
    }
  }

  multipleAnswer(data: Answer[]) {
    let result = data.filter((x) => x.isCorrect);
    return result.length > 1;
  }

  //enviar
  sendQuestion() {
    if (this.validatePendingQuestion()) {
      console.log('Enviar al metodo post');
    }
  }

  validatePendingQuestion() {
    if (this.assessment.length > this.assessmentQuestion.length) {
      for (let index = 0; index < this.assessment.length; index++) {
        let assesment = this.assessmentQuestion.find(
          (x) => x.idQuestion == this.assessment[index].id
        );

        console.log(assesment);
        if (assesment == undefined || assesment == null) {
          let count = (index = index + 1);
          Alert.meessageWarningToast(
            'Falta la pregunta: ' + count,
            'Hay preguntas pendientes por responder'
          );

          return false;
        }
      }

      Alert.meessageWarningToast(
        'Revisa todas las preguntas.',
        'Hay preguntas pendientes por responder'
      );
      return false;
    }

    return true;
  }
}
