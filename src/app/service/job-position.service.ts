import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseDto } from '../Response/responseDto';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})


export class JobPositionService {

  apiUrl: string = environment.apiLab;
  endPoint: string = 'JobPosition';

  constructor(private http: HttpClient,private _authservice: AuthService) { }

  public GetAllPosition() : Observable<ResponseDto>{
    const userToken = `Bearer ${this._authservice.readToken()}`;
    const headers = new HttpHeaders({ 'Authorization': userToken });
    const options = { headers: headers };

    let url = this.apiUrl + this.endPoint;
    return this.http.get<ResponseDto>(url + '/GetAllJob',options);
  }

  public GetByIdPosition(id : number) : Observable<ResponseDto>{
    const userToken = `Bearer ${this._authservice.readToken()}`;
    const headers = new HttpHeaders({ 'Authorization': userToken });
    const options = { headers: headers };

    let url = `${this.apiUrl}/${this.endPoint}/GetByIdJob/${id}`;
    return this.http.get<ResponseDto>(url,options);
  }
}