import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './pages/add/add.component';
import { ConsultComponent } from './pages/consult/consult.component';
import { SharedModule } from '../shared/shared.module';
import { QuestionRoutingModule } from './question-routing.module';
import { AnswerComponent } from '../answer/answer.component';
import { ShowAnswerComponent } from './pages/show-answer/show-answer.component';
import { FilterSkillComponent } from './filter-skill/filter-skill.component';
import { AnswerInQuestionComponent } from './pages/answer-in-question/answer-in-question.component';
import { DifficultyComponent } from './filter-difficulty/difficulty/difficulty.component';



@NgModule({
  declarations: [
    AddComponent,
    ConsultComponent,
    AnswerComponent,
    ShowAnswerComponent,
    FilterSkillComponent,
    AnswerInQuestionComponent,
    DifficultyComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    QuestionRoutingModule
  ]
})
export class QuestionModule { }