import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  idUser:number
  constructor(private auth:AuthService) { 
  const token = this.auth.readToken();

  
      
  const Object = this.auth.DecodeJWT(token);
    
    this.idUser= this.auth.getValueByKey(Object,'IdUser');
  }

  ngOnInit(): void {
  }

}
