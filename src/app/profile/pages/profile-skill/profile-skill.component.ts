import { Component, OnInit } from '@angular/core';
import { ProfilesService } from 'src/app/profile/services/profiles.service';
import { SkillService } from 'src/app/service/skill.service';
import { ProfileDto } from 'src/app/models/ProfileSkill/ProfileDto'
import {Skill} from 'src/app/models/skill'
import { AddProfileSkillDto } from 'src/app/models/ProfileSkill/AddProfileSkillDto'
import {MatDialog} from '@angular/material/dialog';

import { ResponseDto } from 'src/app/Response/responseDto';

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
  displayedColumns: string[] = ['Id', 'Skill','Acciones'];

  listProfileSkill:Skill[] = [];

  listaProfile: ProfileDto[] = [];
  skills: number[] = [];
  response?: ResponseDto;
  constructor(private profileService:ProfilesService,
    private skillService: SkillService,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    //this.GetSkills();
   // this.dataSource = this.listSkills;
    this.GetProfileSkill(13);
  }

  FilterById(skills:number[]){
    skills = skills.filter((s,index)=>{
      return skills.indexOf(s)=== index;
    })
    this.profileService.FilterBySkills(skills).subscribe({
      next: (dataResponse: ResponseDto) => {
        if (dataResponse.isSuccess) {
          console.log(dataResponse.result)
          this.listaProfile = dataResponse.result;
        }else
          console.error(this.response?.message);
      }, error: (e) => {
        console.log('ocurrio un error inesperado')
      }
      }
      // // res => {
      //   // this.listaProfile = res.Result.map(p => ({
      //   //   name: p.name,
      //   //   lastName: p.lastName,
      //   //   email : p.email
      //   // }));
      //   // this.listaProfile = res.Result.map(p => p)
      //   this.response = res;
      // }
    )
  }
  //metodo de prueba
  AgregarSkills(id:number){
    this.skills.push(id);
  }


  GetSkills(){
      this.skillService.getSkill().subscribe({
        next: (dataResponse: ResponseDto) => {
          console.log(dataResponse)
          console.log(dataResponse.result.profile)
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
          console.log('agregado');
        },
        error:(e) => console.error('error')
      }
      
    )
  }

  DeleteSkillToProfile(){
    //obtener idProfile, de la url; obtener idSkill
    this.profileService.deleteEmploye(13,1).subscribe(
      {
        next:(res)=> {
          console.log(res.message);
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
          console.log('respondio',dataResponse.result);
        }else
          console.error(this.response?.message);
      }, error: (e) => {
        console.log('ocurrio un error inesperado')
      }
      }
    )
  }
}
