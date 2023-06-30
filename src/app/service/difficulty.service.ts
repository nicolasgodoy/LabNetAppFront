import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { Difficulty } from "../models/difficulty";
import { ResponseDto } from "../models/response";
import { AuthService } from "./auth.service";


@Injectable({
    providedIn: 'root'
})
export class DifficultyService {

    userToken: string = '';
    url: string = "https://localhost:7059/api/difficulty";

    constructor(private http: HttpClient,
        private _authservice: AuthService) { }

    getAllDifficulty() {
        const userToken = `Bearer ${this._authservice.readToken()}`;
        const headers = new HttpHeaders({ 'Authorization': userToken });
        const options = { headers: headers };

        return this.http.get<ResponseDto>(this.url + '/GetAll', options);
    }

   
}