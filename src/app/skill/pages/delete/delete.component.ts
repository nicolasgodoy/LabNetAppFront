import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Skill } from 'src/app/models/skill';


@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
}) 
export class DeleteComponent implements OnInit {

  constructor(
    private dialogoReferencia: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public dataSkill: Skill,

  ) { }

  ngOnInit(): void {

  }

  DeleteSkill() {
    if (this.dataSkill) {
      this.dialogoReferencia.close("eliminar");
    }
  }

}
