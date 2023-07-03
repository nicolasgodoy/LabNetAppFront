import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Alert } from 'src/app/helpers/alert';
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

  @Output()
  detailsRequestEmit: EventEmitter<DetailsRequestDto[]> = new EventEmitter<DetailsRequestDto[]>();

  public displayedColumns: string[] = ['skill', 'dificultad', 'cantidadPreguntas',
    'acciones'];

  public skillList: Skill[] = [];
  public difficultyList: Difficulty[] = [];
  public detailsRequestList: DetailsRequestDto[] = [];
  public skills = new FormControl<string | Skill>('');
  public difficultys = new FormControl<string | Difficulty>('');
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
    console.log(this.detailsRequestList);
  }

  confirmDelete(data: Request) {

    Swal.fire({
      title: 'Esta seguro?',
      text: `Esta a punto de Eliminar la pregunta : ${data.titleRequest}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#000',
      cancelButtonColor: '#198754',
      confirmButtonText: 'Si, Borralo!',
    }).then((result) => {

      if (result.isConfirmed) {

        this.requestService.deleteRequest(data.idRequest).subscribe({

          next: () => {

            Alert.mensajeExitoToast();
            this.getRequest();
          },
          error: (e) => {

            Alert.mensajeSinExitoToast();
          },
        });
      }
    });
  }
}