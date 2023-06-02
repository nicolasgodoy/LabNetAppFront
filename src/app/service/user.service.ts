import { Injectable } from "@angular/core";
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from "rxjs";
import { User } from "../models/user";
import { Token } from "../models/token";
import { ResponseDto } from "../models/response";
import { AuthService } from "./auth.service";
import { UpdatePassword } from "../models/updatePassword";


@Injectable({
    providedIn: 'root'
})
export class UserService {

    userToken: string='';
    url: string = "https://localhost:7059/api/user";

    constructor(private http: HttpClient,
                private _authservice:AuthService){ }

    getAll() {
        const userToken = `Bearer ${this._authservice.readToken()}`;
        const headers = new HttpHeaders({ 'Authorization': userToken });
        const options = { headers: headers };
        console.log(userToken);

        return this.http.get<ResponseDto>(this.url + '/GetAll', options);
      }

    addUser(user:User): Observable<User>{
        this.userToken =`Bearer ${this._authservice.readToken()}`;  
        const headers = new HttpHeaders({'Authorization': this.userToken});

        return this.http.post<User>(`${this.url}/Insert`, user,{headers:headers});
    }

    updateUserPassword(password:UpdatePassword){
        this.userToken =`Bearer ${this._authservice.readToken()}`;  
        const headers = new HttpHeaders({'Authorization': this.userToken});

        return this.http.put<UpdatePassword>(this.url + `/UpdatePassword`, password, { headers: headers });    }

    deleteUser(id: number){
        this.userToken =`Bearer ${this._authservice.readToken()}`;  
        const headers = new HttpHeaders({'Authorization': this.userToken});

        return this.http.delete<User>(this.url +`/Delete/${id}`,{headers:headers});
    }
}