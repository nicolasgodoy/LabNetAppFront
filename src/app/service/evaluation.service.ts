import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseDto } from '../Response/responseDto';
import { AuthService } from './auth.service';
import { AssessmentUserDto } from '../models/Evaluation/assessmentUserDto';


@Injectable({
  providedIn: 'root'
})
//https://localhost:7059/api/AssessmentUser/Insert
export class AssessmentService {

  public apiUrl: string = environment.apiLab;
  public endpoint: string = 'AssessmentUser';

  constructor(private http: HttpClient, private _authService : AuthService) { }

                           
  public InsertAssessment(data: AssessmentUserDto) : Observable<ResponseDto> {
    const userToken = `Bearer ${this._authService.readToken()}`;
    const headers = new HttpHeaders({ 'Authorization': userToken });
    const options = { headers: headers };
    let url = `${this.apiUrl}${this.endpoint}/Insert`;

    return this.http.post<ResponseDto>(url,data,options);
    
  }

}