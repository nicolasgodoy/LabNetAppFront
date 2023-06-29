import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { QuestionDto } from 'src/app/models/Question/questionDto';
import { ResponseDto } from 'src/app/models/response';
import { Skill } from 'src/app/models/skill';
import { QuestionServiceService } from 'src/app/service/question-service.service';
import { SkillService } from 'src/app/service/skill.service';

@Component({
  selector: 'app-filter-skill',
  templateUrl: './filter-skill.component.html',
  styleUrls: ['./filter-skill.component.css']
})
export class FilterSkillComponent implements OnInit, OnChanges {

  @Input()
  question: QuestionDto;

  @Input()
  modify: boolean;

  @Output()
  questionModified: EventEmitter<QuestionDto> = new EventEmitter<QuestionDto>();

  myControl = new FormControl<string | Skill>('');
  filteredOptions?: Observable<Skill[]>;
  inputValue?: Skill;
  isValid: boolean = false;
  listSkill: Skill[] = [];

  constructor(private skillService: SkillService,
    private questionService: QuestionServiceService,
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
  ngOnChanges() {
    this.validBtn();
    this.questionModified.emit(this.question);
  }

  GetSkills() {
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

  removeSkill(id: number) {
    const skillIndex = this.question.skillList.findIndex((skill) => skill.id === id);

    if (skillIndex !== -1) {
      const removedSkill = this.question.skillList.splice(skillIndex, 1)[0];
      this.listSkill.push(removedSkill);
    }

    this.inputValue = undefined;
    this.questionModified.emit(this.question);

    this.validBtn();
  }

  addSkillToQuestion() {
    event?.preventDefault();
    const selectedSkill: Skill = {
      description: this.inputValue.description,
      id: this.inputValue.id
    }

    this.question.skillList.push(selectedSkill);

    this.listSkill = this.listSkill.filter((skill) => skill.id !== selectedSkill.id);
    this.questionModified.emit(this.question);

    this.inputValue = undefined;
    this.validBtn();

  }

  validBtn() {

    this.listSkill.find(s => s.description == this.inputValue?.description) ?
      this.isValid = true : this.isValid = false;
  }

  filterRepeated() {
    let list: Skill[] = this.question.skillList;
    this.listSkill = this.listSkill.filter(s => !list.find(p => p.description.toString() === s.description.toString()));
  }
}