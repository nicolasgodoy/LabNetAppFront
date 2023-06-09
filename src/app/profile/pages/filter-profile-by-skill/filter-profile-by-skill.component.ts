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
import { Alert } from 'src/app/helpers/alert';

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
    this.loadView();
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
          this.listaProfile = dataResponse.result;
          console.log(dataResponse.result)
          localStorage.setItem("filterProfile", JSON.stringify(this.listaProfile));
        }else
          Alert.mensajeSinExitoToast(dataResponse.message);
      }, error: (e) => Alert.mensajeSinExitoToast('No se pudo cargar los perfiles')
      }
    )
  }

  loadSkills() {
    this.skillService.getSkill().subscribe({
      next: (dataResponse: ResponseDto) => {
        if (dataResponse.isSuccess) {
          this.listSkills = dataResponse.result;
        }else
          console.error(dataResponse.message);
      }, error: (e) => Alert.mensajeSinExitoToast('Error al cargar skills.')
      }
    )
  }

  AgregarSkills(skill:Skill){
    if(!this.skills.find(sk => sk.id === skill.id)){
      this.skills.push(skill);
      localStorage.setItem("listSkills",JSON.stringify(this.skills));
    }
  }

  removeSkill(skill: Skill) {
    localStorage.removeItem("listSkills");
    localStorage.removeItem("filterProfile");
    this.skills = this.skills.filter(s => s !== skill);
    if (this.skills != null && this.skills.length > 0) {
      localStorage.setItem("listSkills",JSON.stringify(this.skills));
      this.FilterById(this.skills);
    } else {
      localStorage.removeItem("listSkills");
      this.listaProfile = [];
    }
  }

  displayFn(): string {
    return '';
  }

  private _filter(name: string): Skill[] {
    const filterValue = name.toLowerCase();
    return this.listSkills.filter(listSkills => listSkills.description.toLowerCase().includes(filterValue));
  }
  loadView(){
  if (localStorage.getItem("filterProfile")) {
    this.listaProfile = JSON.parse(localStorage.getItem("filterProfile"));
  }
  if (localStorage.getItem("listSkills")) {
    this.skills = JSON.parse(localStorage.getItem("listSkills"));
  }
}

}
