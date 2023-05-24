import { Component, OnInit } from '@angular/core';
import { ProfilesService } from '../../services/profiles.service';
import { ResponseDto } from 'src/app/Response/responseDto';
import { ProfileDto } from 'src/app/models/ProfileSkill/ProfileDto';
import { Skill } from 'src/app/models/skill';
import { SkillService } from 'src/app/service/skill.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-filter-profile-by-skill',
  templateUrl: './filter-profile-by-skill.component.html',
  styleUrls: ['./filter-profile-by-skill.component.css']
})
export class FilterProfileBySkillComponent implements OnInit {

  listaProfile: ProfileDto[] = [];
  // ids skills
  skills: number[] = [];

  isExpanded = true;
  isShowing = false;
  myControl = new FormControl();
  filteredOptions: Observable<Skill[]> = new Observable<Skill[]>();

  listSkills:Skill[] = [
    {id:1,description:'.NET'},
    {id:2,description:'JS'},
    {id:3,description:'CORRER'}
  ];

  constructor(private profileService:ProfilesService,private skillService: SkillService,) { }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter(name) : this.listSkills.slice())),
    );
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
    )
  }

  AgregarSkills(id:number){
    this.skills.push(id);
  }

  displayFn(skill: Skill): string {
    return skill && skill.description ? skill.description : '';
  }

  private _filter(name: string): Skill[] {
    const filterValue = name.toLowerCase();

    return this.listSkills.filter(listSkills => listSkills.description.toLowerCase().includes(filterValue));
  }

}
