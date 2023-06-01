import { Component } from '@angular/core';

interface Position  {
  xPosition : number;
  yPosition : number;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'circle';

  coordinates: Position[] = []


  getCoordinates($event: MouseEvent) {
    this.coordinates.push({
      xPosition: $event.clientX,
      yPosition: $event.clientY
    })
  }

  reset() {
    this.coordinates = []
  }

  resetLast() {
    this.coordinates.pop()
  }
}
