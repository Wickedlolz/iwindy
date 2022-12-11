import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { EventsModule } from '../events/events.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomePageComponent, NotFoundPageComponent, ContactUsComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    EventsModule,
    FormsModule,
  ],
})
export class PagesModule {}
