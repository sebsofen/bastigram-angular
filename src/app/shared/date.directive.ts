import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'basti-date',
  templateUrl: './date.directive.html',
}) 
export class DateDirective  implements OnChanges{
    
    @Input() timestamp : number

    datestring : string = "";

    public toDateString() : string {
        console.log(this.timestamp);
        var d = new Date(this.timestamp);
        return (d.getUTCDate() + 1)  + "." + (d.getUTCMonth() + 1) + "." + d.getUTCFullYear();
    }

    ngOnChanges(changes: SimpleChanges) {
        if(changes.timestamp && changes.timestamp.currentValue){
            this.datestring = this.toDateString();
        }
      }

}