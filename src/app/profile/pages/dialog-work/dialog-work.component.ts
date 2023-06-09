import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModifyWorkDto } from 'src/app/models/Work/ModifyWorkDto';
import { WorkAddDto } from 'src/app/models/Work/WorkAddDto';
import { Sector } from 'src/app/models/sector';
import { TipoEmpleo } from 'src/app/models/tipoEmpleo';
import { Ubicacion } from 'src/app/models/ubicacion';
import { sectorService } from 'src/app/service/sector.service';
import { TipoEmpleoService } from 'src/app/service/tipoEmpleo.service';
import { UbicacionService } from 'src/app/service/ubicacion.service';


import { WorkService } from 'src/app/service/work.service';

@Component({
  selector: 'app-dialog-work',
  templateUrl: './dialog-work.component.html',
  styleUrls: ['./dialog-work.component.css'],
})
export class DialogWorkComponent implements OnInit {

  formGroup: FormGroup;
  work: WorkAddDto = new WorkAddDto;
  workModify: ModifyWorkDto = new ModifyWorkDto;
  titulo: string = '';
  sectorArr: Sector[] = [];
  ubicacionArr: Ubicacion[] = [];
  tipoEmpleoArr: TipoEmpleo[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private workService: WorkService,
    @Inject(MAT_DIALOG_DATA) public data: ModifyWorkDto,
    private dialogRef: MatDialogRef<DialogWorkComponent>,
    private sectorServices: sectorService,
    private ubicacionServices: UbicacionService,
    private tipoEmpleoServices: TipoEmpleoService) {

    this.formGroup = this.formBuilder.group({

      company: ['', [Validators.required, Validators.maxLength(30),
      Validators.pattern('^[a-zA-Z]+$')]],
      role: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      IdProfile: 1,
      sector: [''],
      ubicacion: [''],
      tipoEmpleo: [''],
      startDate: ['', [Validators.required]],
      endDate: [''],
      isCurrent: ['']
    });
  }

  ngOnInit(): void {

    this.GetSector();
    this.GetUbicacion();
    this.GetTipoEmpleo();
    
    this.titulo = this.data ? 'Editar' : 'Insertar';

    this.formGroup.patchValue({

      company: this.data.company,
      role: this.data.role,
      sector: this.data.idSector,
      ubicacion: this.data.idUbication,
      tipoEmpleo: this.data.idWorkType
    })

    console.log(this.data.idSector)
  }

  GetSector(): void {

    this.sectorServices.getAllSector().subscribe({

      next: (resp) => {

        this.sectorArr = resp.result
        console.log(resp.result);
      }
    })
  }

  GetUbicacion(): void {

    this.ubicacionServices.getUbicacion().subscribe({

      next: (resp) => {

        this.ubicacionArr = resp.result
        console.log(this.ubicacionArr);
      }
    })
  }

  GetTipoEmpleo(): void {

    this.tipoEmpleoServices.getTipoEmpleo().subscribe({

      next: (resp) => {

        this.tipoEmpleoArr = resp.result;
        console.log(this.tipoEmpleoArr);
      }
    })
  }

  addWork(): void {

    if (this.formGroup.valid) {

      this.work = {

        Company: this.formGroup.value.company,
        Role: this.formGroup.value.role,
        IdProfile: 1,
        IdSector: this.formGroup.value.sector,
        IdUbication: this.formGroup.value.ubicacion,
        IdWorkType: this.formGroup.value.tipoEmpleo,
        startDate: this.formGroup.value.startDate,
        endDate: this.formGroup.value.endDate,
        isCurrent: this.formGroup.value.isCurrent
      }
      if(this.work.isCurrent){
        this.work.endDate = null;
      }
      console.log(this.work)

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
      role: this.formGroup.value.role,
      idSector: this.formGroup.value.sector,
      idUbication: this.formGroup.value.ubicacion,
      idWorkType: this.formGroup.value.tipoEmpleo,
      startDate: this.formGroup.value.startDate,
      endDate: this.formGroup.value.endDate,
      isCurrent: this.formGroup.value.isCurrent
    }
    if(this.work.isCurrent){
      this.work.endDate = null;
    }
    console.log(this.workModify);

    this.workService.ModifyWork(this.workModify).subscribe({

      next: (resp) => {

        this.dialogRef.close(resp.message);
      },

      error: (error) => {

        console.log(error);
      }
    })
  }
}