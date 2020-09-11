import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { MapStyle } from '../../interfaces/map-style';

@Injectable()
export class MapStyleSelectorService {

  private mapStyleSubject: Subject<MapStyle> = null;
  constructor() { }

  newSubjectInstance() {
    if (this.mapStyleSubject == null) {
      this.mapStyleSubject = new Subject();
    }
    return this.mapStyleSubject;
  }
}
