import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  hide: boolean = true;
  send: boolean = false;
  login_failed: boolean = false;
  fail_message: string = '';
  message = ``;
  constructor(private authService: AuthService, private router: Router) { }

  async login() {
    let resp: any;
    this.send = true;
    try {
      resp = await this.authService.loginWithEmailandPassword(this.email, this.password);
      localStorage.setItem('token', resp['token']);
      this.router.navigateByUrl('/site/videos');
      console.log(resp);
    } catch (e) {
      let error: any = e;
      if (error.status == 403) {
        this.setErrorMessage(' Bitte bestätige zuerst deine Emailadresse.', error);
      }
      else if (error.status == 401) {
        this.setErrorMessage(' Benutzername oder Password ist nicht korrekt.', error);
        
      }
    }
  }

  resetErrorMessage() {
    setTimeout(() => {

      this.login_failed = false;
      this.fail_message = '';
      this.message = '';
      this.send = false;
      const passwordField = document.getElementById('passwordField') as HTMLInputElement;
      passwordField.value = '';
    }, 3000);

  }

  setErrorMessage(message: string, error: any) {
    this.login_failed = true;
    this.fail_message = error.error;
    this.message = message;
    this.resetErrorMessage();
  }

  togglePWField(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    this.hide = !this.hide;
  }
}
