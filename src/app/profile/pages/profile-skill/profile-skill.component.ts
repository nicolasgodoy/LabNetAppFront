import { Component, OnInit,Input} from '@angular/core';
import { ProfilesService } from 'src/app/service/profiles.service';
import {MatDialog} from '@angular/material/dialog';
import { ResponseDto } from 'src/app/Response/responseDto';
import { DialogDeleteComponent } from './dialog-delete/dialog-delete.component';
import { DialogAddSkillComponent } from './dialog-add-skill/dialog-add-skill.component';
import { Skill } from 'src/app/models/skill';
import { Alert } from 'src/app/helpers/alert';

@Component({
  selector: 'app-profile-skill',
  templateUrl: './profile-skill.component.html',
  styleUrls: ['./profile-skill.component.css']
})
export class ProfileSkillComponent implements OnInit {

  @Input()
  idProfile?:number; // obtener de la view - <app-profile-skill [idProfile]= id > </app-profile-skill>
  
  @Input()
  modify:boolean = true;
  public dataSource: any;
  displayedColumns: string[] = ['Skill','Acciones'];
  listProfileSkill: Skill[] = [];

  constructor(private profileService:ProfilesService,
    public dialog: MatDialog,
    ) { }

    ngOnInit(): void {
      this.GetProfileSkill(this.idProfile);
  }

  DeleteSkillToProfile(idProfile:number,idSkill:number){
    this.profileService.deleteEmploye(idProfile,idSkill).subscribe(
      {
        next:(res)=> {
          Alert.mensajeExitoToast(res.message)
          this.GetProfileSkill(this.idProfile);
        },
        error:() => Alert.mensajeSinExitoToast('error al eliminar')
      }
    )
  }

  GetProfileSkill(id:number){
    this.profileService.GetProfileSkill(id).subscribe({
      next: (dataResponse: ResponseDto) => {
        if (dataResponse.isSuccess) {
          this.dataSource = dataResponse.result;
          this.listProfileSkill = dataResponse.result;
        }
      },
      error: () => Alert.mensajeSinExitoToast('error al cargar skills')
    })
  }
  openDialog(id:number): void {

    if (id) {
      const dialogoref = this.dialog.open(DialogDeleteComponent, {
        width: '350px'
      });
      dialogoref.afterClosed().subscribe(res=>{
        res && this.DeleteSkillToProfile(this.idProfile,id);
      })
    }else{
      const dialogoref = this.dialog.open(DialogAddSkillComponent, {
        data: { id:this.idProfile, list:this.listProfileSkill },
        panelClass: 'dialog'
      });
      dialogoref.afterClosed().subscribe(res=>{
        if(res)
          Alert.mensajeExitoToast()
          this.GetProfileSkill(this.idProfile);
      })
    }
  }
}

