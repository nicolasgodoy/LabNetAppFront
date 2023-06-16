import { Component, OnInit, Inject, AfterViewInit, ViewChild } from '@angular/core';
import { SkillService } from '../../../../app/service/skill.service';
import { Skill } from '../../../../app/models/skill';
import { ResponseDto } from 'src/app/Response/responseDto';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AddSkillDto } from 'src/app/Response/addSkillDto';
import { Alert } from 'src/app/helpers/alert';




@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements AfterViewInit, OnInit {

  formSkill: FormGroup;
  botonAccion: string = "Guardar";
  listaSkill: Skill[] = [];
  dataSource = new MatTableDataSource<Skill>();
  displayedColumns: string[] = ['description', 'acciones'];

  constructor(
    private skillService: SkillService,
    private dialogoReferencia: MatDialogRef<AddComponent>,
    private fb: FormBuilder,
    
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public dataSkill: Skill) {

    this.formSkill = this.fb.group({
      description: ["", [Validators.required, Validators.pattern('^[a-zA-Z0-9\\s!+@#$%^&*(),.?":{}|<>]+$')]]
    })

  }

  ngOnInit(): void {
    
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  AddSkills() {
    const modelo: AddSkillDto = {
      description: this.formSkill.value.description
    }

    if (this.dataSkill == null) {
      this.skillService.AddSkill(modelo).subscribe({
        next: (data) => {
          Alert.mensajeExitoToast();
          this.dialogoReferencia.close("creado");
        }, error: (e) => {
          Alert.mensajeSinExitoToast();
        }
      })
    }
  }

  dialogAddSkill() {
    this.dialog.open(AddComponent, {
      disableClose: true,

    }).afterClosed().subscribe(resultado => {
      if (resultado === "creado") {
        
      }
    })
  }
}






