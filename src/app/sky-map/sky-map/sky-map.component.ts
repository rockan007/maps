import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-sky-map',
  templateUrl: './sky-map.component.html',
  styleUrls: ['./sky-map.component.less'],


})
export class SkyMapComponent implements OnInit {
  @HostBinding('class.router-flex') isFlex = true;
  constructor() { }

  ngOnInit(): void {
  }

}
