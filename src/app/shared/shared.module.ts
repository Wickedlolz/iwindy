import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from './loading/loading.component';
import { NotificationComponent } from './notification/notification.component';
import { ThumbnailComponent } from './thumbnail/thumbnail.component';

@NgModule({
  declarations: [LoadingComponent, NotificationComponent, ThumbnailComponent],
  imports: [CommonModule, RouterModule],
  exports: [LoadingComponent, NotificationComponent, ThumbnailComponent],
})
export class SharedModule {}
