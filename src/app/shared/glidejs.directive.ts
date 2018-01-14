// ./app/shared/hidden.directive.ts
import { Directive, ElementRef, Renderer, Input, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
declare var jquery:any;
declare var $ :any;

// Directive decorator
@Directive({ selector: '[glidejs]' })
// Directive class
export class GlidejsDirective implements AfterViewInit {


    el: ElementRef
    $carousel:  any;
    gallery_api: any;

    constructor(el: ElementRef, renderer: Renderer) {
        this.el = el
        console.log(el);
        console.log(el.nativeElement.id);
        $(() => $(el.nativeElement));
    
    }

    public update() {
      console.log("update called from outside");
      //
      this.gallery_api .refresh()
      
    }

      ngAfterViewInit() {
        // Use renderer to render the element with styles
        

         this.$carousel = $(this.el.nativeElement).glide({
                type: "slider",
                autoplay: false,
                dragDistance: false,
                autoheight: true,
                startAt: 1,
                keyboard: true //TODO: disable
            });

            this.gallery_api = this.$carousel.data('glide_api');
            var a = this.gallery_api;
            //TODO: this is lame and stupid
            //setInterval( () => this.gallery_api .refresh(), 10000);
            
  }


  

}