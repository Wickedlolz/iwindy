import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import {
  MessageBusService,
  MessageType,
} from 'src/app/core/message-bus.service';
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
    private formBuilder: FormBuilder,
    private messageBus: MessageBusService
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

        this.messageBus.notifyForMessage({
          text: 'Successfully logged in.',
          type: MessageType.Success,
        });
      },
    });
  }
}
