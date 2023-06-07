import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { InstitutionType } from 'src/app/models/Education/InstitutionTypeDto';
import { addEducationDto } from 'src/app/models/Education/addEducationDto';
import { ResponseDto } from 'src/app/models/response';
import { EducationService } from 'src/app/service/education.service';

@Component({
  selector: 'app-dialog-education',
  templateUrl: './dialog-education.component.html',
  styleUrls: ['./dialog-education.component.css']
})
export class DialogEducationComponent implements OnInit {
  
  public formulario: FormGroup;
  InstitutionTypeList: InstitutionType[];

  constructor(
    private formBuilder: FormBuilder,
    private educationService: EducationService,
    private dialogRef: MatDialogRef<DialogEducationComponent>
  ) { 

    this.formulario = this.formBuilder.group({

      institutionName: ['',[Validators.required]],
      degree: ['',[Validators.required]],
      admissionDate: ['',[Validators.required]],
      expeditionDate: ['',[Validators.required]],
      institutionType: ['',]
    });
  }

  ngOnInit(): void {
  }


  update(){
  }
  create(){
    event?.preventDefault()
    if (this.formulario.valid) {
      const data: addEducationDto = {
        InstitutionName: this.formulario.value.institutionName,
        Degree: this.formulario.value.degree,
        AdmissionDate: this.formulario.value.admissionDate,
        ExpeditionDate: this.formulario.value.expeditionDate,
        IdInstitutionType:1,
        IdProfile:1
      };
      this.educationService.Insert(data).subscribe({
          next: (dataResponse: ResponseDto) => {
            this.dialogRef.close(dataResponse.message);
          }, error: () => console.error('ocurrio un error inesperado')
      })
    }
  }
}

