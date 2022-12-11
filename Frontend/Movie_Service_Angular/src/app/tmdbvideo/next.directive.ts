import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNext]'
})
export class NextDirective {
  
  constructor(private element:ElementRef) { }

  @HostListener('click')
  nextFunc(){
    var a = this.element.nativeElement.parentElement.parentElement.children[0];
    var item = a.getElementsByClassName('card');
    a.append(item[0]);
  }

}
