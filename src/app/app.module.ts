import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';


// Load SharedModule
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { ImageRowsComponent } from './imagerows.component';


import { HeaderMenuComponent } from './headermenu.component';
import { SearchComponent } from "./search.component";
import { BigImageComponent } from "app/bigimage.component";
import { ImagesstreamComponent } from "app/imagesstream.component";


import { MarkdownModule } from 'angular2-markdown';

import { RouterModule }   from '@angular/router';
import { NotFoundComponent } from "app/notfound.component";
import { SingleimageComponent } from "app/singleimage.component";
import { SmallImageComponent } from "app/smallimage.component";
import { ImagesEntry } from "app/postentries/images.entry";
import { DateDirective } from "app/shared/date.directive";
import { MapEntry } from "app/postentries/map.entry";
import { MapComponent } from "app/map/map.component";
import { ImageEntry } from "app/postentries/image.entry";

@NgModule({
  declarations: [
    AppComponent,
    ImageRowsComponent,
    HeaderMenuComponent,
    SearchComponent ,
    BigImageComponent,           
    ImagesstreamComponent,
    NotFoundComponent,
    SingleimageComponent,
    ImageRowsComponent,
    SmallImageComponent,
    DateDirective,
    MapEntry,
    MapComponent,
    ImagesEntry,
    ImageEntry
                
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SharedModule,
    InfiniteScrollModule,

    MarkdownModule.forRoot(),
    RouterModule.forRoot([
      {path: '', component: ImagesstreamComponent, pathMatch: 'full'},
      {path:'map', component: MapComponent},
      {path: 'single/:post', component: SingleimageComponent},
      {path: 'row/:filtertype/:filterstring', component: ImageRowsComponent},
      {path: '**', component: NotFoundComponent},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
