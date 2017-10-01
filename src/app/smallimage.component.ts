import { Component, Input } from '@angular/core';
import { Post, PostImages } from "./rest/rest.service";

@Component({
  selector: '[smallimage]',
  templateUrl: './smallimage.component.html',
})
export class SmallImageComponent {
    
    @Input() postImage : PostImages

}