import { Component, Input, OnChanges, SimpleChanges, OnInit} from '@angular/core';
import { Post, RestService, PostImages } from "./rest/rest.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Config } from "app/config/config";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'singleimage',
  templateUrl: './singleimage.component.html',
})
export class SingleimageComponent implements OnInit{
    //add some config stuff
    @Input() post:  Post 


    constructor(private router: Router,
                private route: ActivatedRoute, 
                private config: Config, 
                private rest: RestService) {}

    ngOnInit() {
      let _mthis = this;
      // Capture the token  if available
      this.route.params
      .flatMap(f => this.rest.getPost(f['post']))
      .do(f => _mthis.post = f)
      .catch (f => { 
          _mthis.router.navigateByUrl("/notFound")  
          return Observable.empty()  
      }).subscribe()
      
  }

}