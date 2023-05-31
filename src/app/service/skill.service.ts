import { Injectable } from "@angular/core";
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from "rxjs";
import { ResponseDto } from "../Response/responseDto";
import { Skill } from "../models/skill";
import { AddSkillDto } from "../Response/addSkillDto";
import { AuthService } from "./auth.service";


@Injectable({
    providedIn: 'root'
})
export class SkillService {
    
    constructor(private http: HttpClient,
        private _authservice:AuthService){ }

    url: string = "https://localhost:7059/api/skill";

    getSkill(){
        const userToken = `Bearer ${this._authservice.readToken()}`;
        const headers = new HttpHeaders({ 'Authorization': userToken });
        const options = { headers: headers };
        return this.http.get<ResponseDto>(this.url + "/GetAll", options);
    }

    AddSkill(addskillDto: AddSkillDto): Observable<AddSkillDto>{
        const userToken = `Bearer ${this._authservice.readToken()}`;
        const headers = new HttpHeaders({ 'Authorization': userToken });
        const options = { headers: headers };
        return this.http.post<AddSkillDto>(this.url + "/Insert", addskillDto,{headers:headers});
    }

    deleteSkill(id: number){
        const userToken = `Bearer ${this._authservice.readToken()}`;
        const headers = new HttpHeaders({ 'Authorization': userToken });
        const options = { headers: headers };
        return this.http.delete<Skill>(this.url + `/Delete/${id}`, {headers:headers});
    }
}