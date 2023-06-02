import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProfilesDto } from 'src/app/models/ProfileSkill/ProfilesDto';
import { ProfileDto } from 'src/app/models/ProfileSkill/ProfileDto';
import { profileDto } from 'src/app/models/Profile/profileDto';

import { ResponseDto } from 'src/app/Response/responseDto';
import { AddProfileSkillDto } from 'src/app/models/ProfileSkill/AddProfileSkillDto';
import { profileEditDto } from 'src/app/models/Profile/profileEditDto';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {
  apiUrl: string = environment.apiLab;
  endPoint: string = 'Profile';

  constructor(private http: HttpClient,
    private authService: AuthService) { }

  public FilterBySkills(ListId: number[]): Observable<ResponseDto> {
    const userToken = `Bearer ${this.authService.readToken()}`;
    const headers = new HttpHeaders({ 'Authorization': userToken });
    const options = { headers: headers };
    let url = this.apiUrl + this.endPoint + "/FilterSkills?";
    ListId.forEach(id => url += `skills=${id}&`)

    return this.http.get<ResponseDto>(url,options);
  }

  public AddSkillToProfile(ProfileSkill: AddProfileSkillDto): Observable<ResponseDto> {
    const userToken = `Bearer ${this.authService.readToken()}`;
    const headers = new HttpHeaders({ 'Authorization': userToken });
    const options = { headers: headers };
    let url = this.apiUrl + this.endPoint + "/AddSkillToProfile";
    return this.http.post<ResponseDto>(url, ProfileSkill,options);
  }


  public deleteEmploye(idProfile: number, idSkill: number): Observable<ResponseDto> {
    const userToken = `Bearer ${this.authService.readToken()}`;
    const headers = new HttpHeaders({ 'Authorization': userToken });
    const options = { headers: headers };
    let url = this.apiUrl + this.endPoint + `/DeleteSkillToProfile/${idProfile}/${idSkill}`;
    return this.http.delete<ResponseDto>(url,options);
  }

  public GetProfileSkill(id: number): Observable<ResponseDto> {
    const userToken = `Bearer ${this.authService.readToken()}`;
    const headers = new HttpHeaders({ 'Authorization': userToken });
    const options = { headers: headers };
    let url = this.apiUrl + this.endPoint + `/GetProfileSkill/${id}`;
    return this.http.get<ResponseDto>(url,options);
  }


  //PROFILE

  public InsertProfile(Profile: profileDto): Observable<ResponseDto> {
    const userToken = `Bearer ${this.authService.readToken()}`;
    const headers = new HttpHeaders({ 'Authorization': userToken });
    const options = { headers: headers };
    let url = this.apiUrl + this.endPoint + "/Insert"
    return this.http.post<ResponseDto>(url, Profile, options);
  }

  public GetById(id: number): Observable<ResponseDto> {

    const userToken = `Bearer ${this.authService.readToken()}`;
    const headers = new HttpHeaders({ 'Authorization': userToken });
    const options = { headers: headers };
    let url = `${this.apiUrl}${this.endPoint}${"/Get/"}${id}`;
    return this.http.get<ResponseDto>(url, options);
  }

  public EditProfile(Profile: profileEditDto): Observable<ResponseDto> {
    const userToken = `Bearer ${this.authService.readToken()}`;
    const headers = new HttpHeaders({ 'Authorization': userToken });
    const options = { headers: headers };
    let url = this.apiUrl + this.endPoint + "/Update";
    return this.http.put<ResponseDto>(url, Profile, options);
  }

  public HasProfile(id: number): Observable<ResponseDto> {
    const userToken = `Bearer ${this.authService.readToken()}`;
    const headers = new HttpHeaders({ 'Authorization': userToken });
    const options = { headers: headers };
    let url = this.apiUrl + this.endPoint + "/HasProfile?idUser=" + id;
    return this.http.get<ResponseDto>(url, options);
  }
}
