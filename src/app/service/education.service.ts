import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseDto } from '../Response/responseDto';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { profileEducationDto } from '../models/Profile/profileEducation';
import { addEducationDto } from '../models/Education/addEducationDto';
import { updateEducation } from '../models/Education/updateEducation';
import { InstitutionType } from '../models/Education/InstitutionTypeDto';


@Injectable({
    providedIn: 'root'
})


export class EducationService {

    apiUrl: string = environment.apiLab;
    endPoint: string = 'Educacion';

    constructor(private http: HttpClient, private _authservice: AuthService) { }

    public Delete(id: number) : Observable<ResponseDto> {
        const userToken = `Bearer ${this._authservice.readToken()}`;
        const headers = new HttpHeaders({ 'Authorization': userToken });
        const options = { headers: headers };
        return this.http.delete<ResponseDto>(this.apiUrl + this.endPoint + `/Delete/${id}`, options)
    }

    public Insert(education: addEducationDto): Observable<ResponseDto>{
        const userToken = `Bearer ${this._authservice.readToken()}`;
        const headers = new HttpHeaders({ 'Authorization': userToken });
        const options = { headers: headers };
        return this.http.post<ResponseDto>(this.apiUrl + this.endPoint + "/Insert", education,options);
    }

    public Update(education : updateEducation) : Observable<ResponseDto> {
        const userToken = `Bearer ${this._authservice.readToken()}`;
        const headers = new HttpHeaders({ 'Authorization': userToken });
        const options = { headers: headers };
        return this.http.put<ResponseDto>(this.apiUrl + this.endPoint +"/Update", education, options)
    }

    public GetAllInstitutionType() : Observable<ResponseDto> {
        const userToken = `Bearer ${this._authservice.readToken()}`;
        const headers = new HttpHeaders({ 'Authorization': userToken });
        const options = { headers: headers };
        return this.http.get<ResponseDto>(this.apiUrl + 'InstitutionType/GetAll', options)
    }

}