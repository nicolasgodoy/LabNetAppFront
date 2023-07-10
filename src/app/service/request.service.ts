import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { ResponseDto } from "../models/response";
import { AuthService } from "./auth.service";
import { Request } from "../models/request";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: 'root'
})

//https://localhost:7059/api/Request/GetAllQuestion?id=42
export class requestService {

    public url: string = environment.apiLab + "Request";
    

    userToken: string = '';
    

    constructor(private http: HttpClient,
        private _authservice: AuthService) { }

    getAllRequest() {
        const userToken = `Bearer ${this._authservice.readToken()}`;
        const headers = new HttpHeaders({ 'Authorization': userToken });
        const options = { headers: headers };

        return this.http.get<ResponseDto>(this.url + '/GetAll', options);
    }

    getAllQuestion(id: number) {
        const userToken = `Bearer ${this._authservice.readToken()}`;
        const headers = new HttpHeaders({ 'Authorization': userToken });
        const options = { headers: headers };

        return this.http.get<ResponseDto>(this.url + `/GetAllQuestion/${id}`, options);
    }

    addRequest(request: Request): Observable<ResponseDto> {
        this.userToken = `Bearer ${this._authservice.readToken()}`;
        const headers = new HttpHeaders({ 'Authorization': this.userToken });

        return this.http.post<ResponseDto>(`${this.url}/Insert`, request, { headers: headers });
    }
    
    UpdateRequest(request: Request): Observable<ResponseDto> {
        this.userToken = `Bearer ${this._authservice.readToken()}`;
        const headers = new HttpHeaders({ 'Authorization': this.userToken });

        return this.http.put<ResponseDto>(`${this.url}/Update`, request, { headers: headers });
    }

    deleteRequest(id: number) {
        const userToken = `Bearer ${this._authservice.readToken()}`;
        const headers = new HttpHeaders({ 'Authorization': userToken });
        const options = { headers: headers };
        return this.http.delete<Request>(this.url + `/Delete/${id}`, { headers: headers });
    }

    deleteToQuestionRequired(idRequest: number, idQuestion: number): Observable<ResponseDto> {
        const userToken = `Bearer ${this._authservice.readToken()}`;
        const headers = new HttpHeaders({ 'Authorization': userToken });
        const options = { headers: headers };
        return this.http.delete<ResponseDto>(`${this.url}/DeleteToQuestionRequired/${idRequest}/${idQuestion}`, options);
        
    }


   
}