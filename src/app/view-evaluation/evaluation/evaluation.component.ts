import { Component, OnInit } from '@angular/core';
import { QuestionServiceService } from 'src/app/service/question-service.service';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit {

  public descriptionQuestion: any[] = [];
  public descriptionAnswer: any[] = [];
  public numeroMaximoQuestion: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(private questionService: QuestionServiceService) { }

  ngOnInit(): void {

    this.getQuestionAll();
  }

  questionValueMax() {

    for (let index = 1; index < this.numeroMaximoQuestion.length; index++) {
      const element = this.numeroMaximoQuestion[index];
    }
  }

  getQuestionAll() {

    this.questionService.GetAllQuestion().subscribe({

      next: (respo) => {

        this.descriptionQuestion = respo.result;
        this.descriptionAnswer = respo.result;


        console.log(this.descriptionQuestion);
      },

      error: (error) => {

        console.log(error);
      }
    })
  }
}