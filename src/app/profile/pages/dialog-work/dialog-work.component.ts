import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ModifyWorkDto } from 'src/app/models/Work/ModifyWorkDto';
import { WorkDto } from 'src/app/models/Work/WorkDto';
import { ProfilesService } from 'src/app/service/profiles.service';

import { WorkService } from 'src/app/service/work.service';

@Component({
  selector: 'app-dialog-work',
  templateUrl: './dialog-work.component.html',
  styleUrls: ['./dialog-work.component.css']
})
export class DialogWorkComponent implements OnInit {

  formGroup: FormGroup;
  work: WorkDto = new WorkDto;
  workModify: ModifyWorkDto = new ModifyWorkDto;

  constructor(
    private formBuilder: FormBuilder,
    private workService: WorkService,
    @Inject(MAT_DIALOG_DATA) public data: ModifyWorkDto,
    private dialogRef: MatDialogRef<DialogWorkComponent>) {

    this.formGroup = this.formBuilder.group({

      company: ['', [Validators.required, Validators.maxLength(30),
      Validators.pattern('^[a-zA-Z]+$')]],
      role: ['', Validators.required, Validators.pattern('^[a-zA-Z]+$')],
      IdProfile: 1
    });
  }

  ngOnInit(): void {


    this.formGroup.patchValue({

      company: this.data.company,
      role: this.data.role
    })
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

  updateWork(): void {

    this.workModify = {

      id: this.data.id,
      company: this.formGroup.value.company,
      role: this.formGroup.value.role
    }

    this.workService.ModifyWork(this.workModify).subscribe({

      next: (resp) => {

        this.dialogRef.close(resp.message);
      }
    })
  }
}