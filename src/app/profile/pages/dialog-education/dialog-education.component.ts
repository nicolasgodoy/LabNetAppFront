import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { InstitutionType } from 'src/app/models/Education/InstitutionTypeDto';

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
  ) { }

  ngOnInit(): void {

    this.formulario = this.formBuilder.group({

      institutionName: [{ value: "", disabled: false }],
      degree: [{ value: "", disabled: false }],
      admissionDate: [{ value: "", disabled: false }],
      expeditionDate: [{ value: "", disabled: false }],
      institutionType: [{ value: "", disabled: false }]
    });
  }

}
