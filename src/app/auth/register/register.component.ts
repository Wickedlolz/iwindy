import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { emailValidator, passwordMath } from '../util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, AfterViewInit {
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

  constructor(private titleService: Title, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.titleService.setTitle('Register | iWindy');
  }

  ngAfterViewInit(): void {
    console.log(this.registerFormGroup);
  }

  handleOnSubmit(): void {
    console.log(this.registerFormGroup.value);
  }
}
