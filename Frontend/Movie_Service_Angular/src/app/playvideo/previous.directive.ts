import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPrevious]'
})
export class PreviousDirective {

  constructor(private element:ElementRef) { }

  @HostListener('click')
  previousFunc(){
    var a = this.element.nativeElement.parentElement.parentElement.children[0];
    var item = a.getElementsByClassName('card');
    a.prepend(item[item.length-1]);
  }

}
