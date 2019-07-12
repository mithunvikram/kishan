import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from './loginservice.service';
import { AuthService, GoogleLoginProvider, FacebookLoginProvider } from 'angular-6-social-login';
import { Brodcastservice } from '../broadcast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  constructor(private route: Router, private router: ActivatedRoute, private loginservice: LoginService, private authservice: AuthService, public broadcast: Brodcastservice) {
    this.show = false;
  }

  public challenge: any;
  public loginchallenge: any;
  public login: any;
  public user = {
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  };
  public token: any;
  public href: any;
  public lastloggedintime: any;
  public userdetails: any;
  public errormessage: any;
  public id: any;
  public Userdetails: any;
  public tokenerror: any;
  public Accesslevel: any;
  public permission: any[] = [];
  public signup: boolean;
  public newUser: any = [];
  public isChecked: boolean;
  displayModel: String = 'none';
  public show: boolean;
  public openId: String = 'openid';


  ngOnInit() {
    // this.Queryparams();
    // this.authservice.authState.subscribe((user) => {
    //   this.googleuser = user;
    //   this.loggedIn = (user != null);
    // });

  }

  closeDeleteFModel() {
    this.displayModel = 'none';
    this.isChecked = false;
  }

  signInwithGoogle() {
    this.authservice.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  newuser(value) {

    if (value.checked) {
      this.signup = true;
      this.displayModel = 'block';
      this.isChecked = true;

    }
  }


  Queryparams() {
    this.router.queryParams.subscribe(params => {
      this.loginchallenge = params['login_challenge'];
      this.challenge = window.location.href;
      this.login = {
        'login_challenge': this.challenge
      };
      const splitvalue = this.challenge.split('?');
      this.login = splitvalue[1];
      // this.loginservice.Getlogin(this.login).subscribe(token => {
      //   this.token = token.csrftoken;
      // }, error => {
      //   console.error('error: ', error);
      // });
    });
  }


  newUserLogin() {
    this.loginservice.signup(this.user).subscribe(data => {
      this.Userdetails = data.Userdetails;
      console.log('userinfoo--->', this.Userdetails);
      this.displayModel = 'none';
      this.isChecked = false;
      this.user.firstName = '';
      this.user.lastName = '';
      if (this.Userdetails.body === 'Email is already exists') {
        console.log('-----------error message-------');
        this.errormessage = this.Userdetails.body;
      } else {
        if (this.Userdetails.body.Idtoken === null || this.Userdetails.body.Idtoken === '' || this.Userdetails.body.Idtoken === undefined) {
          this.route.navigate(['consent'], { queryParams: { id: this.Userdetails.body._id } });
        }

      }
    });
  }
  hideEye() {
    this.show = !this.show;
  }


  Login() {
    // this.user.challenge = this.loginchallenge;
    // this.user.csrftoken = this.token;
    this.permission = [];
    this.loginservice.Login(this.user).subscribe(logindetails => {
      if (logindetails.Access !== undefined) {
        console.log('-------ahdbakjvjakjak--------');
        this.Accesslevel = logindetails.Access[0];
        this.permission.push(this.Accesslevel);
        this.broadcast.sendmessage({ 'Access': this.permission });
        console.log('------------loginresponse-----', this.permission);
        // sessionStorage.setItem('Access', JSON.stringify(this.permission));
      }
      this.Userdetails = logindetails.Userdetails;
      this.tokenerror = logindetails.error;
      this.id = this.Userdetails.body._id;
      this.lastloggedintime = this.Userdetails.body.loggedinDate;
      // const redirecturi = logindetails.redirectUrl;
      // window.open(redirecturi, '_self');
      if (this.Userdetails.body === 'Incorrect Username or Password') {
        this.errormessage = this.Userdetails.body;
      } else {
        if (this.tokenerror !== undefined) {
          console.log('-------insideifconditioin-----');
          if (this.tokenerror.name === 'TokenExpiredError') {
            this.Consent();
          }
        } else {
          sessionStorage.setItem('Id', this.id);
          sessionStorage.setItem('lastloggedintime', this.lastloggedintime);
          sessionStorage.setItem('email', this.Userdetails.body.email);
          sessionStorage.setItem('JwtToken', this.Userdetails.body.Idtoken);
          if (this.Userdetails.body.Idtoken === null || this.Userdetails.body.Idtoken === '') {
            this.Consent();
          } else {
            this.route.navigate(['project']);
          }

        }
      }

    }, error => {
      console.error('error---------->>>>>', error);
    });

  }

  googlesigin(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    this.authservice.signIn(socialPlatformProvider).then((userdata => {
      console.log(socialPlatform + ' sign in data : ', userdata);
      const googleobject = {
        'email': userdata.email,
        'idtoken': userdata.idToken,
        'name': userdata.name,
        'provider': userdata.provider,
        'token': userdata.token,
      };
      this.loginservice.googlelogin(googleobject).subscribe(googleresponse => {
        console.log('sign in data : ', googleresponse);
        this.Userdetails = googleresponse.Userdetails;
        this.id = this.Userdetails.body._id;
        this.lastloggedintime = this.Userdetails.body.loggedinDate;
        if (googleresponse.Access !== undefined) {
          console.log('-------ahdbakjvjakjak--------');
          this.Accesslevel = googleresponse.Access[0];
          this.permission.push(this.Accesslevel);
          console.log('------------googleloginresponse-----', this.permission);
          sessionStorage.setItem('Access', JSON.stringify(this.permission));
        }
        sessionStorage.setItem('Id', this.id);
        sessionStorage.setItem('lastloggedintime', this.lastloggedintime);
        sessionStorage.setItem('email', this.Userdetails.body.email);
        sessionStorage.setItem('JwtToken', this.Userdetails.body.Idtoken);
        this.route.navigate(['project']);
      }, error => {
        console.error('error:', error);
      });
    }));

  }

  facebooksigin(socialPlatform: string) {
    let facebookPlatformProvider;
    if (socialPlatform === 'facebook') {
      facebookPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

  }

  Consent() {
    const consentbody = {
      submit: 'Allow access',
      scope: this.openId,
      id: this.id,
    };
    this.loginservice.Consent(consentbody).subscribe(consentvalue => {
      // window.open(consentvalue.redirectUrl, '_self');
      if (consentvalue.Access !== undefined) {
        console.log('-------ahdbakjvjakjak--------');
        this.Accesslevel = consentvalue.Access[0];
        this.permission.push(this.Accesslevel);
        console.log('------------loginresponse-----', this.permission);
        this.broadcast.sendmessage({ 'Access': this.permission });
        // sessionStorage.setItem('Access', JSON.stringify(this.permission));
      }
      this.Userdetails = consentvalue.Userdetails;
      this.id = this.Userdetails.body._id;
      this.lastloggedintime = this.Userdetails.body.loggedinDate;
      this.route.navigate(['project']);
      console.log('--------idtoken------>>>', this.Userdetails);
      sessionStorage.setItem('Id', this.id);
      sessionStorage.setItem('lastloggedintime', this.lastloggedintime);
      sessionStorage.setItem('email', this.Userdetails.body.email);
      sessionStorage.setItem('JwtToken', this.Userdetails.body.Idtoken);
    }, error => {
      console.error('error: ', error);
    });
  }
}
