import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from '../config/api.service';
import { Router } from '@angular/router';
import { SharedService } from '../../shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router, private apiservice: ApiService, private restapi: SharedService) { }


  // Getlogin(): Observable<any> {
  //   return this.http.get(this.restapi.loginUrl + '/googlelogin');
  // }
  signup(user: any): Observable<any> {
    return this.http.post(this.restapi.Apigateway + '/desktop/signup', user);
  }

  googlelogin(googleresponse: any): Observable<any> {
    return this.http.post(this.restapi.Apigateway + '/desktop/googlesignin', googleresponse);
  }
  Login(user: any): Observable<any> {
    return this.http.post(this.restapi.Apigateway + '/desktop/login', user);
  }

  Logout(user: any): Observable<any> {
    return this.http.post(this.restapi.Apigateway + '/desktop/logout', user);
  }

  Consent(consent: any): Observable<any> {
    return this.http.put(this.restapi.Apigateway + '/desktop/consent', consent);
  }

}
