import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from './loading/loading.component';
import { NotificationComponent } from './notification/notification.component';
import { ThumbnailComponent } from './thumbnail/thumbnail.component';
import { ShortenPipe } from './shorten.pipe';

@NgModule({
  declarations: [
    LoadingComponent,
    NotificationComponent,
    ThumbnailComponent,
    ShortenPipe,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    LoadingComponent,
    NotificationComponent,
    ThumbnailComponent,
    ShortenPipe,
  ],
})
export class SharedModule {}
