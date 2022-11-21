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
import { emailValidator, passwordMath } from '../util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  passwordControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
  ]);

  get passwordsGroup(): FormGroup {
    return this.registerFormGroup.controls['passwords'] as FormGroup;
  }

  registerFormGroup: FormGroup = this.formBuilder.group({
    email: new FormControl('', [Validators.required, emailValidator]),
    passwords: new FormGroup({
      password: this.passwordControl,
      rePassword: new FormControl('', [
        Validators.required,
        passwordMath(this.passwordControl),
      ]),
    }),
  });

  constructor(
    private titleService: Title,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Register | iWindy');
  }

  handleOnSubmit(): void {
    const body = {
      email: this.registerFormGroup.value.email,
      password: this.registerFormGroup.value.passwords.password,
    };

    this.userService.register$(body.email, body.password).subscribe({
      next: (user) => {
        this.router.navigate(['/home']);
      },
      error: (error) => alert(error),
    });
  }
}
