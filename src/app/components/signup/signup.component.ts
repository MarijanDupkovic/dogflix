import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  email: string = '';
  password: string = '';
  password2: string = '';
  username: string = '';
  hide: boolean = true;
  hide2: boolean = true;
  send: boolean = false;
  fail_message: string = '';
  message = ``;
  success: boolean = false;
  signup_failed: boolean = false;
  constructor(private authService: AuthService, private router: Router) { }

  async signup() {
    try {
      this.send = true;
      let resp: any = await this.authService.signUp(this.email, this.password, this.password2, this.username);
      this.success = true;
      setTimeout(() => this.router.navigateByUrl('/login'), 5000);
    } catch (e) {
      let error: any = e;
      if (error.status == 405) {
        this.setErrorMessage('Email oder username bereits in Verwendung', error);
      }
      
    }
  }
  resetErrorMessage() {
    setTimeout(() => {

      this.signup_failed = false;
      this.fail_message = '';
      this.message = '';
      this.send = false;
      const passwordField = document.getElementById('passwordField') as HTMLInputElement;
      const emailField = document.getElementById('emailField') as HTMLInputElement;
      const usernameField = document.getElementById('usernameField') as HTMLInputElement;
      const passwordField2 = document.getElementById('passwordField2') as HTMLInputElement;
      passwordField.value = '';
      passwordField2.value = '';
      emailField.value = '';
      usernameField.value = '';
    }, 3000);

  }

  setErrorMessage(message: string, error: any) {
    this.signup_failed = true;
    this.fail_message = error.error;
    this.message = message;
    this.resetErrorMessage();
  }
  togglePWField(e: Event){
    e.preventDefault();
    e.stopPropagation();
    this.hide = !this.hide;
  }
  togglePWField2(e: Event){
    e.preventDefault();
    e.stopPropagation();
    this.hide2 = !this.hide2;
  }
}
