import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { Observable } from "rxjs";
import { ResponseDto } from "../Response/responseDto";
import { Skill } from "../models/skill";
import { AddSkillDto } from "../Response/addSkillDto";

@Injectable({
    providedIn: 'root'
})
export class SkillService {

    constructor(private http: HttpClient){ }

    url: string = "https://localhost:7059/api/skill";

    getSkill(){
        return this.http.get<ResponseDto>(this.url + "/GetAll");
    }

    AddSkill(addskillDto: AddSkillDto): Observable<AddSkillDto>{
        return this.http.post<AddSkillDto>(this.url, addskillDto);
    }

    deleteSkill(id: number){
        return this.http.delete<Skill>(this.url + `/${id}`);
    }
}
