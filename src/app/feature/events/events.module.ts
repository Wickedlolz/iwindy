import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetItSnowComponent } from './let-it-snow/let-it-snow.component';

@NgModule({
  declarations: [LetItSnowComponent],
  imports: [CommonModule],
  exports: [LetItSnowComponent],
})
export class EventsModule {}
