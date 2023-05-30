import { Component, Inject, OnInit,OnChanges } from '@angular/core';
import { ResponseDto } from 'src/app/Response/responseDto';
import { Skill } from 'src/app/models/skill';
import { SkillService } from 'src/app/service/skill.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ProfilesService } from 'src/app/profile/services/profiles.service';
import { AddProfileSkillDto } from 'src/app/models/ProfileSkill/AddProfileSkillDto';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-skill',
  templateUrl: './dialog-add-skill.component.html',
  styleUrls: ['./dialog-add-skill.component.css']
})
export class DialogAddSkillComponent implements OnInit,OnChanges {

  myControl = new FormControl<string | Skill>('');
  filteredOptions?: Observable<Skill[]>;
  inputValue?:Skill;
  isValid:boolean = false;
  listSkill:Skill[] = [];

  constructor(private skillService:SkillService,
    private profileService:ProfilesService,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private dialogRef: MatDialogRef<DialogAddSkillComponent>
    ) { }

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
  ngOnChanges(){
    this.validBtn();
  }
 
  GetSkills(){
    this.skillService.getSkill().subscribe({
      next: (dataResponse: ResponseDto) => {
        this.listSkill = dataResponse.result;
        this.filterRepeated();
      }, error: () => console.error('ocurrio un error inesperado')
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
    const data: AddProfileSkillDto = { IdProfile:this.data.id, IdSkill:this.inputValue?.id}
  
    this.profileService.AddSkillToProfile(data).subscribe({
      next: (dataResponse: ResponseDto) => {
        this.dialogRef.close(dataResponse.message);
      }, error: () => console.error('ocurrio un error inesperado')
    })
  }

  validBtn(){
    this.listSkill.find(s => s.description == this.inputValue?.description) ?
      this.isValid = true : this.isValid = false; 
  }

  filterRepeated(){
    let list:Skill[] = this.data.list;
    this.listSkill = this.listSkill.filter(s => !list.find(p => p.id === s.id));
  }
}
