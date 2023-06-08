import { Injectable } from "@angular/core";
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from "rxjs";
import { Sector } from "../models/sector";
import { Token } from "../models/token";
import { ResponseDto } from "../models/response";
import { AuthService } from "./auth.service";


@Injectable({
    providedIn: 'root'
})
export class sectorService {

    userToken: string='';
    url: string = "https://localhost:7059/api/sector";

    constructor(private http: HttpClient,
                private _authservice:AuthService){ }

    getAllSector() {
        const userToken = `Bearer ${this._authservice.readToken()}`;
        const headers = new HttpHeaders({ 'Authorization': userToken });
        const options = { headers: headers };
        console.log(userToken);

        return this.http.get<ResponseDto>(this.url + '/GetAll', options);
    }

    addSector(sector:Sector): Observable<Sector>{
        this.userToken =`Bearer ${this._authservice.readToken()}`;  
        const headers = new HttpHeaders({'Authorization': this.userToken});

        return this.http.post<Sector>(`${this.url}/Insert`,sector,{headers:headers});
    }
   
    deleteSector(id: number){
        const userToken = `Bearer ${this._authservice.readToken()}`;
        const headers = new HttpHeaders({ 'Authorization': userToken });
        const options = { headers: headers };
        return this.http.delete<Sector>(this.url + `/Delete/${id}`, {headers:headers});
    }
}