import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Answer } from 'src/app/models/Answer/answer';
import { QuestionServiceService } from 'src/app/service/question-service.service';
import { requestService } from 'src/app/service/request.service';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit {

  public id: number;
  public descriptionQuestion: any[] = [];
  public descriptionAnswer: any[] = [];
  public formEvaluation: FormGroup; 

  constructor(
    private questionService: QuestionServiceService,
    private activatedRoute: ActivatedRoute,
    private requestService: requestService,
    private fb: FormBuilder) {

      this.formEvaluation = this.fb.group({
        descriptionAnswer: [
          '',
          [
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9\\s!@#$%^&*(),.?":{}|<>]+$'),
          ],
        ],
      });

    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {

    this.id ? this.getQuestionById() : this.getQuestionAll();
  }

  
  getQuestionById() {

    this.requestService.getAllQuestion(this.id).subscribe({

      next: (resp) => {

        this.descriptionQuestion = resp.result;
        this.descriptionAnswer = resp.result;
        console.log(resp.result);
      },

      error: (error) => {

        console.log(error);
      }
    });
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


  validate(data: Answer[]): boolean {

    let countCorrect = 0;

    for (const answer of data) {
      if (answer.isCorrect) {
        countCorrect++;
      }
      if (countCorrect === 2) {
        return false;
      }
    }
    return true;
  }

}