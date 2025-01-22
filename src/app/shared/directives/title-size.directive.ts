import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appTitleSize]',
  standalone: false
})
export class TitleSizeDirective {

  constructor(private elementRef : ElementRef) {
    this.elementRef.nativeElement.style.fontSize = '20px';
   }

}
