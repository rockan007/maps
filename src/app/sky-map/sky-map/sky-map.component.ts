import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sky-map',
  templateUrl: './sky-map.component.html',
  styleUrls: ['./sky-map.component.less'],
  host: {
    'class': 'router-flex'
  }
})
export class SkyMapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
