import { Component, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Post, PostImage } from "app/rest/rest.service";
@Component({
  selector: 'imageentry',
  templateUrl: './image.entry.html',
  
})
export class ImageEntry implements AfterViewInit {
  
  ngAfterViewInit(): void {
    //broadcast that view is done
    this.afterViewInitCallback.emit();
  }
  
  @Input() postImage: PostImage;
  @Output() afterViewInitCallback = new EventEmitter();

    
}