import {
  Component,
  OnInit,
  Inject,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { SkillService } from '../../../../app/service/skill.service';
import { Skill } from '../../../../app/models/skill';
import { ResponseDto } from 'src/app/Response/responseDto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AddComponent } from '../add/add.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { Alert } from 'src/app/helpers/alert';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consult',
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.css'],
})
export class ConsultComponent implements OnInit {
  formSkill: FormGroup;
  tituloAccionSkill: string = 'Nuevo';
  botonAccion: string = 'Guardar';
  listaSkill: Skill[] = [];
  dataSource = new MatTableDataSource<Skill>();
  displayedColumns: string[] = ['description', 'acciones'];

  constructor(
    private spinnerService: NgxSpinnerService,
    private skillService: SkillService,
    private dialogoReferencia: MatDialogRef<AddComponent>,
    private fb: FormBuilder,

    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public dataSkill: Skill
  ) {
    this.formSkill = this.fb.group({
      description: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9\\s!@#$%^&*(),.?":{}|<>]+$'),
        ],
      ],
    });

    this.skillService.getSkill().subscribe({
      next: (data: ResponseDto) => {
        this.listaSkill = data.result;
      },
      error: (e) => {},
    });
  }

  ngOnInit(): void {
    this.mostrarSkill();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  mostrarSkill() {
    this.spinnerService.show();
    this.skillService.getSkill().subscribe({
      next: (dataResponse: ResponseDto) => {
        this.spinnerService.hide();
        this.dataSource.data = dataResponse.result;
      },
      error: (e) => {
        console.log('ocurrio un error inesperado');
        this.spinnerService.hide();
      },
    });
  }

  AddSkill(): void {
    if (this.formSkill.valid) {
      const modelo: Skill = {
        id: this.formSkill.value.id,
        description: this.formSkill.value.Description,
      };
      this.skillService.AddSkill(modelo).subscribe(
        (ResponseDto: Skill) => {
          Alert.mensajeExitoToast();
        },
        (error: any) => {
          console.log(error);
          Alert.mensajeSinExitoToast();
        }
      );
    } else {
    }
  }

  dialogAddSkill() {
    this.dialog
      .open(AddComponent, {
        disableClose: true,
        width: '30%',
      })
      .afterClosed()
      .subscribe((resultado) => {
        if (resultado === 'creado') {
          this.mostrarSkill();
        }
      });
  }

  confirmDelete(dataSkill: Skill) {
    Swal.fire({
      title: 'Esta seguro?',
      text: `Esta a punto de Eliminar la Skill : ${dataSkill.description}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borralo!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.skillService.deleteSkill(dataSkill.id).subscribe({
          next: (ResponseDto) => {
            console.log(ResponseDto);
            Alert.mensajeExitoToast();
            this.mostrarSkill();
          },
          error: (e) => {
            console.log(e);
            Alert.mensajeSinExitoToast();
          },
        });
      }
    });
  }
}
