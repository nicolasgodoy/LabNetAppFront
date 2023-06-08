import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { ResponseDto } from '../Response/responseDto';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

// https://localhost:7059/api/Ubication/GetAll

export class UbicacionService {

  apiUrl: string = environment.apiLab;
  endPoint: string = 'Ubication';

  constructor(private http: HttpClient) { }

  getUbicacion(): Observable<ResponseDto>{
    let url =  `${this.apiUrl}${this.endPoint}/GetAll`
    return this.http.get<ResponseDto>(url);
}
}