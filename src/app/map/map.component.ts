import { Component, Input } from '@angular/core';
import { Post, PostContent, PostDate, RestService } from "../rest/rest.service";
import { OnChanges, SimpleChanges, OnInit, AfterViewInit } from '@angular/core';
import {Router} from '@angular/router';
declare let L: any;


@Component({
  selector: 'mapview',
  templateUrl: './map.component.html',
  
})
export class MapComponent implements AfterViewInit{
    
    
    guidGenerator() {
        var S4 = function() {
           return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }

    uniqueID = this.guidGenerator();
    ngAfterViewInit(): void {
        var mthis = this;
        var mymap = L.map(this.uniqueID).setView([51.505, -0.09], 13);
        
        L.tileLayer('http://a.tile.openstreetmap.org/{id}/{z}/{x}/{y}.png', {
          attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
          maxZoom: 18,
          id: '',
      }).addTo(mymap);

      this.rest.getAllLocations().subscribe(locations => {
        var markers = locations.map(location => {
          return   L.marker([location.latLon.lat, location.latLon.lon], {location: location}).on('click', e => {
            var clickedLocation = e.target.options.location;
            console.log(e.target.options.location);
            this.router.navigate(['/row/location/', clickedLocation.name]);
          });
        });
        var group = L.featureGroup(markers).addTo(mymap);
        mymap.fitBounds(group.getBounds());
      });
    }
    
    
    constructor(private rest: RestService,private router: Router) {
       
    }
 

 
}