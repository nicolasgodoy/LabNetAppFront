import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseDto } from '../Response/responseDto';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})


export class JobPositionService {

  apiUrl: string = environment.apiLab;
  endPoint: string = 'JobPosition';

  constructor(private http: HttpClient) { }

  public GetAllPosition() : Observable<ResponseDto>{

    let url = this.apiUrl + this.endPoint;
    return this.http.get<ResponseDto>(url + '/GetAllJob');
  }

  public GetByIdPosition(id : number) : Observable<ResponseDto>{

    let url = `${this.apiUrl}/${this.endPoint}/GetByIdJob/${id}`;
    return this.http.get<ResponseDto>(url);
  }
}