import { Component, OnInit } from '@angular/core';
import { ProfilesService } from 'src/app/profile/services/profiles.service';
import { SkillService } from 'src/app/service/skill.service';
import { ProfileDto } from 'src/app/models/ProfileSkill/ProfileDto'
import {Skill} from 'src/app/models/skill'
import { AddProfileSkillDto } from 'src/app/models/ProfileSkill/AddProfileSkillDto'
import {MatDialog} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResponseDto } from 'src/app/Response/responseDto';
import { DialogDeleteComponent } from './dialog-delete/dialog-delete.component';
import { DialogAddSkillComponent } from './dialog-add-skill/dialog-add-skill.component';

@Component({
  selector: 'app-profile-skill',
  templateUrl: './profile-skill.component.html',
  styleUrls: ['./profile-skill.component.css']
})
export class ProfileSkillComponent implements OnInit {

  listSkills:Skill[] = [
    {id:1,description:'.NET'},
    {id:2,description:'JS'},
    {id:3,description:'CORRER'}
  ];

  public dataSource: any;
  displayedColumns: string[] = ['Skill','Acciones'];

  listProfileSkill:Skill[] = [];

  listaProfile: ProfileDto[] = [];
  skills: number[] = [];
  response?: ResponseDto;
  constructor(private profileService:ProfilesService,
    private skillService: SkillService,
    public dialog: MatDialog,
    private snack:MatSnackBar,
    ) { }

  ngOnInit(): void {
    //this.GetSkills();
   // this.dataSource = this.listSkills;
    this.GetProfileSkill(2);
  }

  GetSkills(){
      this.skillService.getSkill().subscribe({
        next: (dataResponse: ResponseDto) => {
          this.listSkills = dataResponse.result;
        }, error: (e) => {
          console.log('ocurrio un error inesperado')
        }
      })
  }

  AddSkillToProfile(idProfile:number,idSkill:number){
    //obtener idProfile, de la url; obtener idSkill
    // crear AddProfileSkillDto
    const add: AddProfileSkillDto = {IdProfile:idProfile,IdSkill:idSkill}
    this.profileService.AddSkillToProfile(add).subscribe(
      {
        next:(res)=> {
          this.alert(res.message);
        },
        error:(e) => console.error('error')
      }
      
    )
  }

  DeleteSkillToProfile(idProfile:number,idSkill:number){
    //obtener idProfile, de la url; obtener idSkill
    this.profileService.deleteEmploye(idProfile,idSkill).subscribe(
      {
        next:(res)=> {
          this.alert(res.message);
        },
        error:(e) => console.error(e)
      }
    )
  }

  GetProfileSkill(id:number){
      // dependiendo de cual sea el perfil se obtiene la id.
    this.profileService.GetProfileSkill(id).subscribe({
      next: (dataResponse: ResponseDto) => {
        if (dataResponse.isSuccess) {
          this.dataSource = dataResponse.result;
        }
      },
      error: (e) => {
        console.log('ocurrio un error inesperado')
      }
    })
  }
  openDialog(id:number): void {
    
    if (id) {
      const dialogoref = this.dialog.open(DialogDeleteComponent, {
        width: '350px'
      });
      dialogoref.afterClosed().subscribe(res=>{
        res && this.DeleteSkillToProfile(2,id);
      })
    }else{
      const dialogoref = this.dialog.open(DialogAddSkillComponent, {
        width: '40%'
      });
      dialogoref.afterClosed().subscribe(res=>{
        console.log(res)
      })
    }
  }

  alert(msj:string){
    this.snack.open(msj,'',{
      duration:3000,
      horizontalPosition:'right',
      verticalPosition:'top'
    });
  }
}

