import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  hide = true;
  loginForm!: FormGroup;
  error: any;
  user = sessionStorage.getItem('user');

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private titleService: Title,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    this.titleService.setTitle('Login');

    if (this.user) {
      this.router.navigateByUrl("/home");

    }
  }

  async onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.auth
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigateByUrl("/home");
        },
        error: (error) => {
          this.error = error.error.error;
        },
      });
  }

  get f() {
    return this.loginForm.controls;
  }

}
