import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Alert } from 'src/app/helpers/alert';
import { QuestionDto } from 'src/app/models/Question/questionDto';
import { DetailsRequest } from 'src/app/models/detailsRequest';
import { DetailsRequestDto } from 'src/app/models/detailsRequestDto';
import { Difficulty } from 'src/app/models/difficulty';
import { Request } from 'src/app/models/request';
import { Skill } from 'src/app/models/skill';
import { DifficultyService } from 'src/app/service/difficulty.service';
import { requestService } from 'src/app/service/request.service';
import { SkillService } from 'src/app/service/skill.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details-request',
  templateUrl: './details-request.component.html',
  styleUrls: ['./details-request.component.css']
})

export class DetailsRequestComponent implements OnInit {

  @Input()
  dataRequest: Request;

  @Output()
  detailsRequestEmit: EventEmitter<DetailsRequestDto[]> = new EventEmitter<DetailsRequestDto[]>();

  public displayedColumns: string[] = ['skill', 'dificultad', 'cantidadPreguntas',
    'acciones'];

  public skillList: Skill[] = [];
  public difficultyList: Difficulty[] = [];

  public detailsRequestList: DetailsRequestDto[] = [];

  public formDetailRequest: FormGroup;

  public dataSourceAssessmentRequest = new MatTableDataSource();

  constructor(
    private requestService: requestService,
    private skillServices: SkillService,
    private difficultyServices: DifficultyService,
    private fb: FormBuilder
  ) {

    this.formDetailRequest = this.fb.group({

      skills: [''],
      difficultys: [''],
      cantidadPreguntas: ['']
    });
  }

  ngOnInit(): void {

    this.getSkillList();
    this.getDifficultyList();
    
    console.log(this.dataRequest);

    this.dataSourceAssessmentRequest.data = this.dataRequest.detailRequirements
  }

  getSkillList() {

    this.skillServices.getSkill().subscribe({

      next: (resp) => {

        this.skillList = resp.result;
      }
    });
  }

  getDifficultyList() {

    this.difficultyServices.getAllDifficulty().subscribe({

      next: (resp) => {

        this.difficultyList = resp.result;
      }
    });
  }

  getRequest() {

    this.requestService.getAllRequest().subscribe({

      next: (resp) => {

        this.dataSourceAssessmentRequest.data = resp.result;
      },

      error: () => {

        Alert.mensajeSinExitoToast();
      }
    });
  }

  addDetails() {

    event?.preventDefault();
    const detailsRequest: DetailsRequest = {

      idSkill: this.formDetailRequest.value.skills.id,
      skillDescription: this.formDetailRequest.value.skills.description,
      idDifficulty: this.formDetailRequest.value.difficultys.id,
      difficultyDescription: this.formDetailRequest.value.difficultys.description,
      quantityQuestion: this.formDetailRequest.value.cantidadPreguntas
    }

    this.detailsRequestList.push(detailsRequest);
    this.dataSourceAssessmentRequest.data = this.detailsRequestList;

    this.detailsRequestEmit.emit(this.detailsRequestList);

    this.formDetailRequest.reset();
  }

  
  DeleteDetailRequired(detailRequest:DetailsRequest ) {

    const index = this.detailsRequestList.findIndex(d => d.idSkill === detailRequest.idSkill && 
                                                    d.idDifficulty === detailRequest.idDifficulty && 
                                                    d.quantityQuestion === detailRequest.quantityQuestion);


    if (index !== -1) {
      this.detailsRequestList.splice(index, 1);
    }
    this.dataSourceAssessmentRequest.data = this.detailsRequestList;
    this.detailsRequestEmit.emit(this.detailsRequestList);

  }
}