import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-charts-map',
  templateUrl: './charts-map.component.html',
  styleUrls: ['./charts-map.component.less'],
})
export class ChartsMapComponent implements OnInit {
  @HostBinding('class.router-flex') isFlex = true;
  constructor() { }

  ngOnInit(): void {
  }

}
