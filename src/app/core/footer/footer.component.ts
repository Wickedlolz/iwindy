import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
}
