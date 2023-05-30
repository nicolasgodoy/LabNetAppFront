import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";
import { Login } from "../models/login";
import { Token } from "../models/token";
import { ResponseDto } from '../models/response';



@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor(private http: HttpClient) {
        this.readToken()
    }
    url:string = "https://localhost:7059/api/login";
    userToken: string = '';
 
    login(user: Login) {
        return this.http.post<ResponseDto>(`${this.url}/login`, user)
          .pipe(
            map(resp => {
              this.saveToken(resp["result"].token, resp["result"].expiration);
              return resp;
            })
          );
      }

      private saveToken(idToken: string, expiresIn: number) {
        this.userToken = idToken;
        localStorage.setItem('token', idToken);
    
    
        localStorage.setItem('expiresIn' , expiresIn.toString());
      }

      readToken() {
        if (localStorage.getItem('token')) {
          this.userToken = localStorage.getItem('token') || '';
        } else {
          this.userToken = '';
        }
        return this.userToken;
      }



      isAuthenticated(): boolean {
        let response: boolean = false;
        if (this.userToken.length < 2 ) {
          response = false;
        } else {
          const expiraIn = Number(localStorage.getItem('expiresIn'));
          const todayExpira = new Date();
    
          todayExpira.setTime(expiraIn);
          if (todayExpira > new Date()) {
            response = true;
          }
        }
        return response;
    }   
}


