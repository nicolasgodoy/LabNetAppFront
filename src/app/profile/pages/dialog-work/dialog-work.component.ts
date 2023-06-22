import { Component, Inject, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModifyWorkDto } from 'src/app/models/Work/ModifyWorkDto';
import { WorkAddDto } from 'src/app/models/Work/WorkAddDto';
import { JobPosition } from 'src/app/models/jobPositionDton';
import { Sector } from 'src/app/models/sector';
import { TipoEmpleo } from 'src/app/models/tipoEmpleo';
import { Ubicacion } from 'src/app/models/ubicacion';
import { JobPositionService } from 'src/app/service/job-position.service';
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
  positionArr: JobPosition[] = [];
  current: boolean = false;
  idProfile: number;

  constructor(
    private formBuilder: FormBuilder,
    private workService: WorkService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DialogWorkComponent>,
    private sectorServices: sectorService,
    private ubicacionServices: UbicacionService,
    private tipoEmpleoServices: TipoEmpleoService,
    private jobPositionServices: JobPositionService) {

    this.formGroup = this.formBuilder.group({

      company: ['', [Validators.required, Validators.maxLength(30),
      Validators.pattern('^[a-zA-Z ]*')]],
      role: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*')]],
      IdProfile: 1,
      sector: [''],
      ubicacion: [''],
      tipoEmpleo: [''],
      position: [''],
      startDate: ['', [Validators.required]],
      endDate: [{ disabled: this.current, value: '' }],
      isCurrent: ['']
    });

    this.formGroup.get('isCurrent').valueChanges.subscribe((value) => {
      if (value) {
        this.formGroup.get('endDate').disable();
      } else {
        this.formGroup.get('endDate').enable();
      }
    });
  }

  ngOnInit(): void {

    this.GetSector();
    this.GetUbicacion();
    this.GetTipoEmpleo();
    this.GetJobPosition();

    if (typeof this.data == 'number') {
      this.titulo = 'Insertar';
      this.idProfile = this.data;
    } else {
      this.titulo = 'Editar';
      this.idProfile = null;
    }

    this.formGroup.patchValue({

      company: this.data.company,
      role: this.data.role,
      sector: this.data.idSector,
      ubicacion: this.data.idUbication,
      position: this.data.idJobPosition,
      tipoEmpleo: this.data.idWorkType,
      startDate: this.formatoFecha(this.data.startDate),
      endDate: this.formatoFecha(this.data.endDate)
    })
  }

  GetSector(): void {

    this.sectorServices.getAllSector().subscribe({

      next: (resp) => {

        this.sectorArr = resp.result
      }
    })
  }

  GetUbicacion(): void {

    this.ubicacionServices.getUbicacion().subscribe({

      next: (resp) => {

        this.ubicacionArr = resp.result
      }
    })
  }

  GetTipoEmpleo(): void {

    this.tipoEmpleoServices.getTipoEmpleo().subscribe({

      next: (resp) => {
        this.tipoEmpleoArr = resp.result;
      }
    })
  }


  GetJobPosition(): void {

    this.jobPositionServices.GetAllPosition().subscribe({

      next: (resp) => {
        this.positionArr = resp.result;
      }
    })
  }

  addWork(): void {

    if (this.formGroup.valid) {

      this.work = {
        Company: this.formGroup.value.company,
        Role: this.formGroup.value.role,
        IdProfile: this.idProfile,
        IdSector: this.formGroup.value.sector,
        IdUbication: this.formGroup.value.ubicacion,
        IdWorkType: this.formGroup.value.tipoEmpleo,
        IdJobPosition: this.formGroup.value.position,
        startDate: this.formGroup.value.startDate,
        endDate: this.formGroup.value.isCurrent ? null : this.formGroup.value.endDate,
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
      role: this.formGroup.value.role,
      idSector: this.formGroup.value.sector,
      idUbication: this.formGroup.value.ubicacion,
      idWorkType: this.formGroup.value.tipoEmpleo,
      idJobPosition: this.formGroup.value.position,
      startDate: this.formGroup.value.startDate,
      endDate: this.formGroup.value.isCurrent ? null : this.formGroup.value.endDate,
      idProfile: this.data.idProfile
    }

    this.workService.ModifyWork(this.workModify).subscribe({

      next: (resp) => {

        this.dialogRef.close(resp.message);
      },

      error: (error) => {

        console.log(error);
      }
    })
  }
  formatoFecha(fechaConvertir: Date): string {

    const fecha = new Date(fechaConvertir);
    const formatoFinal = fecha.toISOString().split('T')[0];
    return formatoFinal;
  }
}