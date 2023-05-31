import { Component, OnInit } from '@angular/core';
import { ProfilesService } from 'src/app/service/profiles.service';
import { ResponseDto } from 'src/app/Response/responseDto';
import { ProfilesDto } from 'src/app/models/ProfileSkill/ProfilesDto';
import { Skill } from 'src/app/models/skill';
import { SkillService } from 'src/app/service/skill.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ProfilesFilterDto } from 'src/app/models/ProfileSkill/ProfilesFilterDto';

@Component({
  selector: 'app-filter-profile-by-skill',
  templateUrl: './filter-profile-by-skill.component.html',
  styleUrls: ['./filter-profile-by-skill.component.css']
})
export class FilterProfileBySkillComponent implements OnInit {

  listaProfile: ProfilesFilterDto[] = [];

  skills: Skill[] = [];

  isExpanded = true;
  isShowing = false;
  myControl = new FormControl();
  filteredOptions: Observable<Skill[]> = new Observable<Skill[]>();

  listSkills:Skill[] = [];

  constructor(private profileService:ProfilesService,private skillService: SkillService,) {
  }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter(name) : this.listSkills.slice())),
    );
    this.loadSkills();
  }

  FilterById(skills:Skill[]){
    const idSkills: number [] = []
    skills.forEach((s)=>{
      idSkills.push(s.id)
    })
    skills = skills.filter((s,index)=>{
      return skills.indexOf(s)=== index;
    })
    this.profileService.FilterBySkills(idSkills).subscribe({
      next: (dataResponse: ResponseDto) => {
        if (dataResponse.isSuccess) {
          console.log(dataResponse.result)
          this.listaProfile = dataResponse.result;
        }else
          console.error(dataResponse.message);
      }, error: (e) => {
        console.log('No se pudo cargar los perfiles')
        }
      }
    )
  }

  loadSkills() {
    this.skillService.getSkill().subscribe({
      next: (dataResponse: ResponseDto) => {
        if (dataResponse.isSuccess) {
          console.log(dataResponse.result)
          this.listSkills = dataResponse.result;
        }else
          console.error(dataResponse.message);
      }, error: (e) => {
        console.log('Error al cargar skills.')
        }
      }
    )
  }

  AgregarSkills(skill:Skill){
    if(!this.skills.find(sk => sk.id === skill.id)){
      this.skills.push(skill);
    }
  }

  removeSkill(skill: Skill) {
    this.skills = this.skills.filter(s => s !== skill);
  }

  displayFn(): string {
    return '';
  }

  private _filter(name: string): Skill[] {
    const filterValue = name.toLowerCase();
    return this.listSkills.filter(listSkills => listSkills.description.toLowerCase().includes(filterValue));
  }

}
