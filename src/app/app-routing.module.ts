import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from './feature/pages/contact-us/contact-us.component';
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
    path: 'user',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./feature/products/products.module').then(
        (m) => m.ProductsModule
      ),
  },
  {
    path: 'contact-us',
    component: ContactUsComponent,
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];

export const AppRoutingModule = RouterModule.forRoot(routes, {
  preloadingStrategy: PreloadAllModules,
});
