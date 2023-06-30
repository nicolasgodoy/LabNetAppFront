import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseDto } from "../models/response";
import { AuthService } from "./auth.service";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: 'root'
})
export class DifficultyService {

    apiUrl: string = environment.apiLab;
    endPoint: string = 'Difficulty';

    constructor(private http: HttpClient, private _authservice: AuthService) { }

    getAllDifficulty() {
        const userToken = `Bearer ${this._authservice.readToken()}`;
        const headers = new HttpHeaders({ 'Authorization': userToken });
        let url = `${this.apiUrl}${this.endPoint}/GetAll`;
        const options = { headers: headers };
        return this.http.get<ResponseDto>(url, options);
    }
}