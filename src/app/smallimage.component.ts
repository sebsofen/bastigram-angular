import { Component, Input } from '@angular/core';
import { Post, PostImage } from "./rest/rest.service";

@Component({
  selector: '[smallimage]',
  templateUrl: './smallimage.component.html',
})
export class SmallImageComponent {
    
    @Input() postImage : PostImage

}