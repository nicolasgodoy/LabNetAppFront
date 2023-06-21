import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogAnswerComponent } from './dialog-answer/dialog-answer.component';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})

export class AnswerComponent implements OnInit {

  public displayedColumnsAnswer: string[] = ['description', 'isCorrect', 'add',
  ];
  public dataSourceAnswer = new MatTableDataSource();

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openDialogAnswer(): void {

    this.dialog.open(DialogAnswerComponent, {

      width: '500px'
    });
  }
}