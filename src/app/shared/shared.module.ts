import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from './loading/loading.component';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  declarations: [LoadingComponent, NotificationComponent],
  imports: [CommonModule, RouterModule],
  exports: [LoadingComponent, NotificationComponent],
})
export class SharedModule {}
