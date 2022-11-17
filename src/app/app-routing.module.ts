import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './feature/pages/home-page/home-page.component';
import { NotFoundPageComponent } from './feature/pages/not-found-page/not-found-page.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: HomePageComponent,
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];

export const AppRoutingModule = RouterModule.forRoot(routes);
