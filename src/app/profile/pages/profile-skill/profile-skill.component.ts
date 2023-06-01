import { Component, OnInit,Input} from '@angular/core';
import { ProfilesService } from 'src/app/service/profiles.service';
import {MatDialog} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResponseDto } from 'src/app/Response/responseDto';
import { DialogDeleteComponent } from './dialog-delete/dialog-delete.component';
import { DialogAddSkillComponent } from './dialog-add-skill/dialog-add-skill.component';
import { Skill } from 'src/app/models/skill';

@Component({
  selector: 'app-profile-skill',
  templateUrl: './profile-skill.component.html',
  styleUrls: ['./profile-skill.component.css']
})
export class ProfileSkillComponent implements OnInit {

  @Input()
  idProfile:number = 3;// obtener de la view - <app-profile-skill [idProfile]= id  [modify]=modify> </app-profile-skill>
  @Input()
  modify:boolean = true;
  public dataSource: any;
  displayedColumns: string[] = ['Skill','Acciones'];
  listProfileSkill: Skill[] = [];

  constructor(private profileService:ProfilesService,
    public dialog: MatDialog,
    private snack:MatSnackBar,
    ) { }

  ngOnInit(): void {
    this.GetProfileSkill(this.idProfile);
  }

  DeleteSkillToProfile(idProfile:number,idSkill:number){
    this.profileService.deleteEmploye(idProfile,idSkill).subscribe(
      {
        next:(res)=> {
          this.alert(res.message);
          this.GetProfileSkill(this.idProfile);
        },
        error:() =>  this.alert('error en eliminar skill')
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
      error: () => this.alert('error en carga de skills')
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
          this.alert(res);
          this.GetProfileSkill(this.idProfile);
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

