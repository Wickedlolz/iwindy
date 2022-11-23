import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHideNotification]',
})
export class HideNotificationDirective {
  @HostListener('click', ['$event']) closeClickHandler($event: PointerEvent) {
    this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'none');
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {}
}
