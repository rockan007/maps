import { Injectable } from '@angular/core';
import { AreaInfo } from '../../interfaces/area-info'

import { HttpClient } from "@angular/common/http";
import { AreaInfoResponse } from '../../interfaces/area-info-response'
import { Observable, Subject } from 'rxjs';
@Injectable()
export class AreaSelectorService {
  private selectAreaInfoSubject: Subject<AreaInfo> = null;
  areaList: Array<AreaInfo>
  private areaRequUrl = "https://restapi.amap.com/v3/config/district?key=187fbc40fe82283aad8012fa25bcda8a&keywords=中国&subdistrict=3&extensions=base";
  constructor(private http: HttpClient) {
  }

  getAreaCodes(): Observable<AreaInfoResponse> {
    const areaInfo = this.http.get<AreaInfoResponse>(this.areaRequUrl);
    return areaInfo;
  }
  newSubjectInstance(): Subject<AreaInfo> {
    if (this.selectAreaInfoSubject == null) {
      this.selectAreaInfoSubject = new Subject<AreaInfo>();
    }
    return this.selectAreaInfoSubject;
  }
}
