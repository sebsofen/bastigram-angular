import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Post, PostImages } from "app/rest/rest.service";
@Component({
  selector: 'imagesentry',
  templateUrl: './images.entry.html',
  
})
export class ImagesEntry {
    @Input() postImages : PostImages;

    @Output()
    imageLoadedEvent = new EventEmitter();

    constructor() {
      console.log("MOOOOIN");
    }

    imageloaded(event: Event) {
      console.log("image loaded");
      this.imageLoadedEvent.emit();
    }
    
}