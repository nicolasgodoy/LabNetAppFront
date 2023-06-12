import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from "rxjs";
import { ResponseDto } from '../Response/responseDto';
import { ModifyWorkDto } from '../models/Work/ModifyWorkDto';
import { WorkAddDto } from '../models/Work/WorkAddDto';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class WorkService {

  apiUrl: string = environment.apiLab;
  endPoint: string = 'Work';

  constructor( private http: HttpClient,
    private _authservice: AuthService) { }

  public AddWork(workDto: WorkAddDto) : Observable<ResponseDto>{
    const userToken = `Bearer ${this._authservice.readToken()}`;
    const headers = new HttpHeaders({ 'Authorization': userToken });
    const options = { headers: headers };

    let url = `${this.apiUrl}${this.endPoint}/Insert`;
    return this.http.post<ResponseDto>(url, workDto,options);
  }

  public ModifyWork(modifyWorkDto : ModifyWorkDto): Observable<ResponseDto>{
    const userToken = `Bearer ${this._authservice.readToken()}`;
    const headers = new HttpHeaders({ 'Authorization': userToken });
    const options = { headers: headers };

    let url = `${this.apiUrl}${this.endPoint}/Update`;
    return this.http.put<ResponseDto>(url, modifyWorkDto,options);
  }

  public DeleteWork(id: number) : Observable<ResponseDto>{
    const userToken = `Bearer ${this._authservice.readToken()}`;
    const headers = new HttpHeaders({ 'Authorization': userToken });
    const options = { headers: headers };

    let url = `${this.apiUrl}${this.endPoint}/Delete/${id}`;
    return this.http.delete<ResponseDto>(url,options);
  }
}