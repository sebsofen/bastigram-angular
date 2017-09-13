import { Component, Input } from '@angular/core';
import { Post, PostImages } from "app/rest/rest.service";
@Component({
  selector: 'imagesentry',
  templateUrl: './images.entry.html',
  
})
export class ImagesEntry {
    @Input() postImages : PostImages;
    
}