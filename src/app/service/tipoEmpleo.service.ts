import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { ResponseDto } from '../Response/responseDto';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})


export class TipoEmpleoService {

    apiUrl: string = environment.apiLab;
    endPoint: string = 'WorkType';

    constructor(private http: HttpClient,
        private _authservice: AuthService) { }

    getTipoEmpleo(): Observable<ResponseDto> {
        const userToken = `Bearer ${this._authservice.readToken()}`;
        const headers = new HttpHeaders({ 'Authorization': userToken });
        const options = { headers: headers };
        let url = `${this.apiUrl}${this.endPoint}/GetAll`
        return this.http.get<ResponseDto>(url,options);
    }
}