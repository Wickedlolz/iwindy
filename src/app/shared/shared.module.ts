import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from './loading/loading.component';
import { NotificationComponent } from './notification/notification.component';
import { HideNotificationDirective } from './hide-notification.directive';

@NgModule({
  declarations: [
    LoadingComponent,
    NotificationComponent,
    HideNotificationDirective,
  ],
  imports: [CommonModule, RouterModule],
  exports: [LoadingComponent, NotificationComponent],
})
export class SharedModule {}
