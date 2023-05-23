import { Component, OnInit, Inject, AfterViewInit, ViewChild } from '@angular/core';
import { SkillService } from '../../../../app/service/skill.service';
import { Skill } from '../../../../app/models/skill';
import { ResponseDto } from 'src/app/Response/responseDto';


import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";


import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AddComponent } from '../add/add.component';
import { DeleteComponent } from '../delete/delete.component';



@Component({
  selector: 'app-consult',
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.css']
})
export class ConsultComponent implements OnInit {

  formSkill: FormGroup;
  tituloAccionCustomers: string = "Nuevo";
  botonAccion: string = "Guardar";
  listaSkill: Skill[] = [];
  dataSource = new MatTableDataSource<Skill>();
  displayedColumns: string[] = ['description', 'acciones'];



  constructor(
    private skillService: SkillService,
    private dialogoReferencia: MatDialogRef<AddComponent>,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public dataSkill: Skill) {

    this.formSkill = this.fb.group({
      description: ["", [Validators.required, Validators.pattern('^[a-zA-Z0-9\\s]+$')]]
    })


    this.skillService.getSkill().subscribe({
      next: (data: ResponseDto) => {
        this.listaSkill = data.result;
      }, error: (e) => { }
    })

  }


  ngOnInit(): void {

    this.mostrarSkill();

  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  mensajeAlerta(msg: string, accion: string) {
    this._snackBar.open(msg, accion, {
      horizontalPosition: "center",
      verticalPosition: "bottom",
      duration: 3000
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  mostrarSkill() {

    this.skillService.getSkill().subscribe({
      next: (dataResponse: ResponseDto) => {
        console.log(dataResponse)
        this.dataSource.data = dataResponse.result;

      }, error: (e) => {
        console.log('ocurrio un error inesperado')
      }

    })
  }


  AddSkills() {

    console.log(this.formSkill.value)
    const modelo: Skill = {
      id: this.formSkill.value.id,
      description: this.formSkill.value.Description

    }

    if (this.dataSkill == null) {
      this.skillService.AddSkill(modelo).subscribe({
        next: (data) => {
          //this.mensajeAlerta("Customer Creado", "Listo")
          this.dialogoReferencia.close("creado");
        }, error: (e) => {
          //this.mensajeAlerta("Ocurrio un error verifique que todos los inputs esten correctos", "error");
        }
      })
    }
  }

  dialogAddSkill() {
    this.dialog.open(AddComponent, {
      disableClose: true,

    }).afterClosed().subscribe(resultado => {
      if (resultado === "creado") {
        this.mostrarSkill();
      }
    })
  }


  dialogDeleteSkill(dataSkill: Skill) {
    this.dialog.open(DeleteComponent, {
      disableClose: true,
      data: dataSkill,
    }).afterClosed().subscribe(resultado => {
      if (resultado === "eliminar") {
        this.skillService.deleteSkill(dataSkill.id).subscribe({
          next: (data) => {
            this.mensajeAlerta("Customer Eliminado Correctamente!!", "Listo")
            this.mostrarSkill();
          },
          error: (e) => { this.mensajeAlerta("Ocurrio un error al Eliminar", "cerrar") }
        })
      }
    })
  }

}
