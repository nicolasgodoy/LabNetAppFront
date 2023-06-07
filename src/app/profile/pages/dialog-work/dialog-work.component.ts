import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkDto } from 'src/app/models/Work/WorkDto';

import { WorkService } from 'src/app/service/work.service';

@Component({
  selector: 'app-dialog-work',
  templateUrl: './dialog-work.component.html',
  styleUrls: ['./dialog-work.component.css']
})
export class DialogWorkComponent implements OnInit {

  formGroup: FormGroup;
  work: WorkDto = new WorkDto;

  constructor(private formBuilder: FormBuilder,
    private workService: WorkService,
    private router: Router,
    private dialogRef: MatDialogRef<DialogWorkComponent>) {

    this.formGroup = this.formBuilder.group({

      company: [''],
      role: [''],
      IdProfile: 1
    });
  }
  ngOnInit(): void {
  }

  addWork(): void {

    if (this.formGroup.valid) {

      this.work = {

        company: this.formGroup.value.company,
        role: this.formGroup.value.role,
        IdProfile: 1,
        IdSector: 1,
        IdUbication: 1,
        IdWorkType: 1
      }
    }

    this.workService.AddWork(this.work).subscribe({

      next: (res) => {

        console.log(res.result);
        this.dialogRef.close(res.result);
      },

      error: (res) => {

        console.log(res);
      }
    })

  }

  // deleteWork(id : number) : void {

  //   this.workService.DeleteWork(id).subscribe({

  //   next: (resp) => {


  //   }      
  //   })
  // } 
}