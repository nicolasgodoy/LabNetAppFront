import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseDto } from '../Response/responseDto';

@Injectable({
  providedIn: 'root'
})

export class AnswerService {

  public apiUrl: string = environment.apiLab;
  public endpoint: string = 'Answer';

  constructor(private http: HttpClient) { }

  public GetAllAnswer(): Observable<ResponseDto> {

    let url = `${this.apiUrl}${this.endpoint}/Get`;
    return this.http.get<ResponseDto>(url);
  }
}