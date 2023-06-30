import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { ResponseDto } from "../models/response";
import { AuthService } from "./auth.service";


@Injectable({
    providedIn: 'root'
})
export class requestService {

    userToken: string = '';
    url: string = "https://localhost:7059/api/Request";

    constructor(private http: HttpClient,
        private _authservice: AuthService) { }

    getAllRequest() {
        const userToken = `Bearer ${this._authservice.readToken()}`;
        const headers = new HttpHeaders({ 'Authorization': userToken });
        const options = { headers: headers };

        return this.http.get<ResponseDto>(this.url + '/GetAll', options);
    }

    addRequest(request: Request): Observable<Request> {
        this.userToken = `Bearer ${this._authservice.readToken()}`;
        const headers = new HttpHeaders({ 'Authorization': this.userToken });

        return this.http.post<Request>(`${this.url}/Insert`, request, { headers: headers });
    }

    deleteRequest(id: number) {
        const userToken = `Bearer ${this._authservice.readToken()}`;
        const headers = new HttpHeaders({ 'Authorization': userToken });
        const options = { headers: headers };
        return this.http.delete<Request>(this.url + `/Delete/${id}`, { headers: headers });
    }

   
}