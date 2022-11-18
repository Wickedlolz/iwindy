import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Login | iWindy');
  }

  handleLogin($event: SubmitEvent): void {
    $event.preventDefault();
    const formData = new FormData($event.target as HTMLFormElement);
    const email = formData.get('email')?.toString() || '';
    const password = formData.get('password')?.toString() || '';

    this.userService.login$(email, password).subscribe({
      next: (user) => {
        this.userService.user = user;
        this.router.navigate(['/home']);
      },
      error: (error) => alert(error),
    });
  }
}
