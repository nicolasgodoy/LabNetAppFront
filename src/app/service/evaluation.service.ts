import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseDto } from '../Response/responseDto';
import { AuthService } from './auth.service';
import { assessmentUserDto } from '../models/Evaluation/assessmentUserDto';


@Injectable({
  providedIn: 'root'
})

export class AssessmentService {

  public apiUrl: string = environment.apiLab;
  public endpoint: string = 'Assessment';

  constructor(private http: HttpClient, private _authService : AuthService) { }

                           
  public InsertAssessment(data: assessmentUserDto) : Observable<ResponseDto> {
    const userToken = `Bearer ${this._authService.readToken()}`;
    const headers = new HttpHeaders({ 'Authorization': userToken });
    const options = { headers: headers };
    let url = `${this.apiUrl}${this.endpoint}/InsertAssessment`;

    return this.http.post<ResponseDto>(url,data,options);
    
  }

}