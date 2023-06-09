import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { ResponseDto } from '../Response/responseDto';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})


export class TipoEmpleoService {

    apiUrl: string = environment.apiLab;
    endPoint: string = 'WorkType';

    constructor(private http: HttpClient) { }

    getTipoEmpleo(): Observable<ResponseDto> {
        let url = `${this.apiUrl}${this.endPoint}/GetAll`
        return this.http.get<ResponseDto>(url);
    }
}