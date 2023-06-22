import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogAnswerComponent } from './dialog-answer/dialog-answer.component';
import { AnswerService } from '../service/answer.service';
import { Answer } from '../models/Answer/answer';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})

export class AnswerComponent implements OnInit, AfterViewInit {

  public displayedColumnsAnswer: string[] = ['description', 'acciones', 'add'];
  public dataSourceAnswer = new MatTableDataSource();

  constructor(
    private dialog: MatDialog,
    private answerService: AnswerService
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){

    this.getAll();
  }

  openDialogAnswer(): void {

    this.dialog.open(DialogAnswerComponent, {

      width: '500px'
    });
  }

  getAll() {

    this.answerService.GetAllAnswer().subscribe({

      next: (resp) => {

        this.dataSourceAnswer.data = resp.result;
        console.log(this.dataSourceAnswer.data);
        console.log(resp.result);
      },

      error: (error) => {

        console.log(error);
      }
    })
  }

  confirmDelete(answer: Answer) {

  }
}