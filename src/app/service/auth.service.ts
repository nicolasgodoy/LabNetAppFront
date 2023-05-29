import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { map } from 'rxjs/operators';
import { ResponseDto } from '../models/response';
import { Observable } from "rxjs";
import { Login } from "../models/login";
import { Token } from "../models/token";


@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor(private http: HttpClient) {
    }
    url:string = "https://localhost:7059/api/login";

    login(login:Login): Observable<Login>{
        return this.http.post<Login>(this.url + '/Login',login);
    }



}

