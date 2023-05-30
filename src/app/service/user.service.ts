import { Injectable } from "@angular/core";
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from "rxjs";
import { User } from "../models/user";
import { Token } from "../models/token";
import { ResponseDto } from "../models/response";
import { AuthService } from "./auth.service";


@Injectable({
    providedIn: 'root'
})
export class UserService {

    userToken: string='';

    constructor(private http: HttpClient,
                private _authservice:AuthService){ }

    url: string = "https://localhost:7059/api/user";

    getAll(){
        return this.http.get<ResponseDto>(this.url + '/GetAll');
    }

    addUser(user:User): Observable<User>{
        this.userToken =`Bearer ${this._authservice.readToken()}`;  
        const headers = new HttpHeaders({'Authorization': this.userToken});

        return this.http.post<User>(`${this.url}'/Insert'`, user,{headers:headers});
    }

    updateUser(token: Token, password:string){
        return this.http.delete<User>(this.url + `/${password}`);
    }

    deleteUser(id: number){
        return this.http.delete<User>(this.url + `/${id}`);
    }

}