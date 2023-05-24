import { Component, OnInit } from '@angular/core';
import { ResponseDto } from 'src/app/Response/responseDto';
import { Skill } from 'src/app/models/skill';
import { SkillService } from 'src/app/service/skill.service';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ProfilesService } from 'src/app/profile/services/profiles.service';
import { AddProfileSkillDto } from 'src/app/models/ProfileSkill/AddProfileSkillDto';


// Falta obtener el id de usuario del localStorage.

@Component({
  selector: 'app-dialog-add-skill',
  templateUrl: './dialog-add-skill.component.html',
  styleUrls: ['./dialog-add-skill.component.css']
})
export class DialogAddSkillComponent implements OnInit {

  myControl = new FormControl<string | Skill>('');
  filteredOptions?: Observable<Skill[]>;

  inputValue?:Skill;

  listSkill:Skill[] = [
    {id:1,description:'.NET'},
    {id:2,description:'JS'},
    {id:3,description:'CORRER'}
  ];

  constructor(private skillService:SkillService,
    private profileService:ProfilesService) { }

  ngOnInit(): void {
    this.GetSkills();

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.description;
        return name ? this._filter(name as string) : this.listSkill.slice();
      })
    );
  }

  GetSkills(){
    this.skillService.getSkill().subscribe({
      next: (dataResponse: ResponseDto) => {
        this.listSkill = dataResponse.result;
      }, error: (e) => {
        console.log('ocurrio un error inesperado')
      }
    })
  }
  displayFn(user: Skill): string {
    return user && user.description ? user.description : '';
  }

  private _filter(name: string): Skill[] {
    const filterValue = name.toLowerCase();

    return this.listSkill.filter((skill) =>
      skill.description.toLowerCase().includes(filterValue)
    );
  }

  addSkillToProfile(){
    event?.preventDefault()

    // obtener el id de profile.
    const data: AddProfileSkillDto = { IdProfile:1, IdSkill:this.inputValue?.id}

    console.log(data)
  
    // this.profileService.AddSkillToProfile(data).subscribe({
    //   next: (dataResponse: ResponseDto) => {

    //     let message = dataResponse.message;    
    //   }, error: (e) => {
    //     console.log('ocurrio un error inesperado')
    //   }
    // })
  }
}
