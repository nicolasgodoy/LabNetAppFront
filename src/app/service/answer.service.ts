import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseDto } from '../Response/responseDto';
import { AuthService } from './auth.service';
import { questionAnswerDto } from '../models/Answer/QuestionAnswerDto';

@Injectable({
  providedIn: 'root'
})

export class AnswerService {

  public apiUrl: string = environment.apiLab;
  public endpoint: string = 'Answer';

  constructor(private http: HttpClient, private _authService : AuthService) { }

  public GetAllAnswer(): Observable<ResponseDto> {
    const userToken = `Bearer ${this._authService.readToken()}`;
    const headers = new HttpHeaders({ 'Authorization': userToken });
    const options = { headers: headers };
    let url = `${this.apiUrl}${this.endpoint}/Get`;
    return this.http.get<ResponseDto>(url,options);
  }

  public InsertInQuestion(data : questionAnswerDto) : Observable<ResponseDto> {
    const userToken = `Bearer ${this._authService.readToken()}`;
    const headers = new HttpHeaders({ 'Authorization': userToken });
    const options = { headers: headers };
    let url = `${this.apiUrl}${this.endpoint}/InsertInQuestion`;
    return this.http.post<ResponseDto>(url,data,options);
  }

  
  public InsertAnswer(addAnswer: FormData): Observable<ResponseDto>{
    const userToken = `Bearer ${this._authService.readToken()}`;
    const headers = new HttpHeaders({ 'Authorization': userToken });
    const options = { headers: headers };
    let url = `${this.apiUrl}${this.endpoint}/Insert`;
    return this.http.post<ResponseDto>(url, addAnswer,options);
  }
  public DeleteAnswer(id: number): Observable<ResponseDto>{
    const userToken = `Bearer ${this._authService.readToken()}`;
    const headers = new HttpHeaders({ 'Authorization': userToken });
    const options = { headers: headers };
    let url = `${this.apiUrl}${this.endpoint}/Delete/${id}`;
    return this.http.delete<ResponseDto>(url,options);
  }

  DeleteAnswerToQuestion(idAnswer: number, idQuestion: number): Observable<ResponseDto>{
    const userToken = `Bearer ${this._authService.readToken()}`;
    const headers = new HttpHeaders({ 'Authorization': userToken });
    const options = { headers: headers };
    let url = `${this.apiUrl}${this.endpoint}/DeleteAnswerToQuestion/${idQuestion}/${idAnswer}`;
    return this.http.delete<ResponseDto>(url,options);
  }
  

}