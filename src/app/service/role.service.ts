import { ResponseDto } from "../models/response";
import { Injectable } from "@angular/core";
import {HttpClient} from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class RoleService {
    
    constructor(private http: HttpClient){ }

    url: string = "https://localhost:7059/api/role";

    getRole(){
        return this.http.get<ResponseDto>(this.url + '/GetAll');
    }

  
}