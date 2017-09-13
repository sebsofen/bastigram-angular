// ./app/shared/hidden.directive.ts
import { Directive, ElementRef, Renderer } from '@angular/core';
declare var jquery:any;
declare var $ :any;

// Directive decorator
@Directive({ selector: '[glidejs]' })
// Directive class
export class GlidejsDirective {
    el: ElementRef
    constructor(el: ElementRef, renderer: Renderer) {
        this.el = el
        console.log(el);
        console.log(el.nativeElement.id);
     // Use renderer to render the element with styles
      $(function() {

        $(el.nativeElement)

      });
    }
    $carousel:  any;

      ngAfterViewInit() {
    this.$carousel = $(this.el.nativeElement).glide({
            type: "carousel",
            autoplay: false
        });;
  }
}