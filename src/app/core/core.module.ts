import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { ProductService } from './product.service';
import { UserService } from './user.service';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [HeaderComponent, WelcomeComponent, FooterComponent],
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent, WelcomeComponent, FooterComponent],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [ProductService, UserService],
    };
  }
}
