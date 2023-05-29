import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProfilesDto } from 'src/app/models/ProfileSkill/ProfilesDto';
import { ProfileDto } from 'src/app/models/ProfileSkill/ProfileDto';
import { profileDto } from 'src/app/models/Profile/profileDto';

import { ResponseDto } from 'src/app/Response/responseDto';
import { AddProfileSkillDto } from 'src/app/models/ProfileSkill/AddProfileSkillDto';
import { profileEditDto } from 'src/app/models/Profile/profileEditDto';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {
  apiUrl: string = environment.apiLab;
  endPoint: string = 'Profile';

  constructor(private http: HttpClient) { }

  public FilterBySkills(ListId:number[]): Observable<ResponseDto>{
    let url = this.apiUrl + this.endPoint + "/FilterSkills?";

    ListId.forEach(id => url += `skills=${id}&`)
    console.log(url);

    return this.http.get<ResponseDto>(url);
  }

  public AddSkillToProfile(ProfileSkill:AddProfileSkillDto):Observable<ResponseDto>{
    let url = this.apiUrl + this.endPoint + "/AddSkillToProfile";
    return this.http.post<ResponseDto>(url,ProfileSkill);
  }


  // public deleteEmploye(ProfileSkill:AddProfileSkillDto): Observable<ResponseDto>{
  //   let url = this.apiUrl + this.endPoint + "/DeleteSkillToProfile";
  //   return this.http.delete<ResponseDto>(url,ProfileSkill);
  // }

  public GetProfileSkill(id:number):Observable<number[]>{
    let url = this.apiUrl + this.endPoint + `/${id}`;
    return this.http.get<number[]>(url);
  }


  //PROFILE

  public InsertProfile(Profile: profileDto):Observable<ResponseDto>{
    let url = this.apiUrl + this.endPoint + "/Insert"
    return this.http.post<ResponseDto>(url,Profile);
  }

  public GetById(id: number) : Observable<ResponseDto>{

    let url = `${this.apiUrl} ${id}`;
    return this.http.get<ResponseDto>(url);
  }

  public EditProfile(Profile : profileEditDto) : Observable<ResponseDto>{

    let url = this.apiUrl + this.endPoint + "/Update";
    return this.http.put<ResponseDto>(url, Profile);
  }

  public HasProfile(id:number):Observable<ResponseDto>{
    let url = this.apiUrl + this.endPoint + "/HasProfile?idUser=" + id;
    return this.http.get<ResponseDto>(url);
  }
}