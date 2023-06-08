import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModifyWorkDto } from 'src/app/models/Work/ModifyWorkDto';
import { WorkAddDto } from 'src/app/models/Work/WorkAddDto';
import { Sector } from 'src/app/models/sector';
import { sectorService } from 'src/app/service/sector.service';

import { WorkService } from 'src/app/service/work.service';

@Component({
  selector: 'app-dialog-work',
  templateUrl: './dialog-work.component.html',
  styleUrls: ['./dialog-work.component.css']
})
export class DialogWorkComponent implements OnInit {

  formGroup: FormGroup;
  work: WorkAddDto = new WorkAddDto;
  workModify: ModifyWorkDto = new ModifyWorkDto;
  titulo: string = '';
  sectorArr: Sector[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private workService: WorkService,
    @Inject(MAT_DIALOG_DATA) public data: ModifyWorkDto,
    private dialogRef: MatDialogRef<DialogWorkComponent>,
    private sectorServices : sectorService) {

    this.formGroup = this.formBuilder.group({

      company: ['', [Validators.required, Validators.maxLength(30),
      Validators.pattern('^[a-zA-Z]+$')]],
      role: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      IdProfile: 1
    });
  }

  ngOnInit(): void {

    this.GetSector();
    
    this.titulo = this.data ? 'Editar' : 'Insertar';

    this.formGroup.patchValue({

      company: this.data.company,
      role: this.data.role
    })
  }

  GetSector(): void {

    this.sectorServices.getAllSector().subscribe({

      next: (resp) => {

        this.sectorArr = resp.result
        console.log(resp.result);
      }
    })
  }

  addWork(): void {

    if (this.formGroup.valid) {

      this.work = {

        Company: this.formGroup.value.company,
        Role: this.formGroup.value.role,
        UbicationName: this.formGroup.value.tipoTrabajo,
        DescriptionSector: this.formGroup.value.sector,
        WorkTypeName: this.formGroup.value.ubicacion,
        IdProfile: 1,
        IdSector: 1,
        IdUbication: 1,
        IdWorkType: 1
      }

      this.workService.AddWork(this.work).subscribe({

        next: (res) => {
  
          this.dialogRef.close(res.result);
        },
  
        error: (res) => {
  
          console.log(res);
        }
      })
    }
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