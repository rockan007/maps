import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-map-selector',
  templateUrl: './map-selector.component.html',
  styleUrls: ['./map-selector.component.less']
})
export class MapSelectorComponent implements OnInit {
  inputTypeControl = new FormControl('words');
  constructor() { }

  ngOnInit(): void {
  }

}
