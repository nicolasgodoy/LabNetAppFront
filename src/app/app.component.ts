import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'LabNetAppFront';
  token: string = '';
  idUser: number;

  constructor(private auth: AuthService){
    this.token = this.auth.readToken();
    const Object = this.auth.DecodeJWT(this.token);
    this.idUser= this.auth.getValueByKey(Object,'IdUser');
    console.log('ID log user:' +this.idUser)
  }
}
