import { Component, OnInit } from '@angular/core';
import { ProfilesService } from 'src/app/profile/services/profiles.service';
import { ProfileDto } from 'src/app/models/ProfileSkill/ProfileDto'
import { ResponseDto } from 'src/app/Response/responseDto';

// remplazar cuando se tenga la skill real
interface Skill {
  id: number;
  name: string;
}

@Component({
  selector: 'app-profile-skill',
  templateUrl: './profile-skill.component.html',
  styleUrls: ['./profile-skill.component.css']
})
export class ProfileSkillComponent implements OnInit {

  listSkills:Skill[] = [
    {id:1,name:'.NET'},
    {id:2,name:'JS'},
    {id:3,name:'CORRER'}];

  listaProfile: ProfileDto[] = [];
  skills: number[] = [];
  response?: ResponseDto;
  constructor(private profileService:ProfilesService) { }

  ngOnInit(): void {
  }

  FilterById(skills:number[]){
    this.profileService.FilterBySkills(skills).subscribe(

      (response: ResponseDto) => {
        console.log(response);//que pasaaaa
       // console.log(response.IsSuccess);
       // console.log(response.Message);
       // console.log(response.Result);

        // if (response.IsSuccess) {
        //   const result: object = response.Result;
        //   console.log(response);
        //   console.log('Result:', result);
        // } else {
        //   console.error('Error:', response.Message);
        // }
      },
      error => {
        console.error('Error en la solicitud:', error);
      }

      // res => {
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


  AddSkillToProfile(){
    //obtener idProfile, de la url; obtener idSkill
    // crear AddProfileSkillDto
    //this.profileService.AddSkillToProfile().subscribe()
  }
  
  GetProfileSkill(id:number){
    this.profileService.GetProfileSkill(id).subscribe(res=>{
      //this.listSkills = res;
    })
  }
}
