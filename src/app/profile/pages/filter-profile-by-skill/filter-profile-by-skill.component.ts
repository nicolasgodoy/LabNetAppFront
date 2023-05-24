import { Component, OnInit } from '@angular/core';
import { ProfilesService } from '../../services/profiles.service';
import { ResponseDto } from 'src/app/Response/responseDto';
import { ProfileDto } from 'src/app/models/ProfileSkill/ProfileDto';
import { Skill } from 'src/app/models/skill';
import { SkillService } from 'src/app/service/skill.service';

@Component({
  selector: 'app-filter-profile-by-skill',
  templateUrl: './filter-profile-by-skill.component.html',
  styleUrls: ['./filter-profile-by-skill.component.css']
})
export class FilterProfileBySkillComponent implements OnInit {

  listaProfile: ProfileDto[] = [];
  // ids skills
  skills: number[] = [];

  listSkills:Skill[] = [
    {id:1,description:'.NET'},
    {id:2,description:'JS'},
    {id:3,description:'CORRER'}
  ];

  constructor(private profileService:ProfilesService,private skillService: SkillService,) { }

  ngOnInit(): void {
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
          console.error(dataResponse.message);
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

  AgregarSkills(id:number){
    this.skills.push(id);
  }
}
