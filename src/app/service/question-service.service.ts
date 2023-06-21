import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { QuestionDto } from '../models/Question/questionDto';
import { ResponseDto } from '../Response/responseDto';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

//https://localhost:7059/api/Question/Delete/2

export class QuestionServiceService {

  public urlApi: string = environment.apiLab;
  public endpoint: string = 'Question';
  public userToken: string = '';

  constructor(
    private http: HttpClient,
    private authservice: AuthService
  ) { }

  public GetAllQuestion(): Observable<ResponseDto>{

    let url = `${this.urlApi}${this.endpoint}/Get`;
    return this.http.get<ResponseDto>(url);
  }

  public AddQuestion(addQuestion: QuestionDto): Observable<ResponseDto> {
    // this.userToken = `Bearer ${this.authservice.readToken()}`;
    // const headers = new HttpHeaders({ 'Authorization': this.userToken });
    let url = `${this.urlApi}${this.endpoint}/Insert`;
    console.log(url)
    return this.http.post<ResponseDto>(url, addQuestion);
  }

  public DeleteQuestion(id: number): Observable<ResponseDto>{

    let url = `${this.urlApi}${this.endpoint}/Delete/${id}`;
    return this.http.delete<ResponseDto>(url);
  }
}