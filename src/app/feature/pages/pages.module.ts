import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { IvyCarouselModule } from 'angular14-responsive-carousel';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';

@NgModule({
  declarations: [HomePageComponent, NotFoundPageComponent],
  imports: [CommonModule, RouterModule, IvyCarouselModule, SharedModule],
})
export class PagesModule {}
