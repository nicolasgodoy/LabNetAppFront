import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { Observable } from "rxjs";
import { User } from "../models/user";
import { Token } from "../models/token";
import { ResponseDto } from "../models/response";


@Injectable({
    providedIn: 'root'
})
export class UserService {
    
    constructor(private http: HttpClient){ }

    url: string = "https://localhost:7059/api/user";

    getAll(){
        return this.http.get<ResponseDto>(this.url + '/GetAll');
    }

    addUser(user:User): Observable<User>{
        return this.http.post<User>(this.url+ '/Insert', user);
    }

    updateUser(token: Token, password:string){
        return this.http.delete<User>(this.url + `/${password}`);
    }

    deleteUser(id: number){
        return this.http.delete<User>(this.url + `/${id}`);
    }


}