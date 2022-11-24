import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/user.service';
import { AuthService } from '../auth.service';
import { emailValidator } from '../util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.formBuilder.group({
    email: new FormControl('', [Validators.required, emailValidator]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });

  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private titleService: Title,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Login | iWindy');
  }

  handleLogin(): void {
    const body = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.authService.login$(body.email, body.password).subscribe({
      next: (user) => {
        this.router.navigate(['/home']);
      },
      error: (error) => (this.errorMessage = error.error.message),
    });
  }
}
