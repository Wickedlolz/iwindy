import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome/welcome.component';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [WelcomeComponent, LoadingComponent],
  imports: [CommonModule, RouterModule],
  exports: [WelcomeComponent, LoadingComponent],
})
export class SharedModule {}
