import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { AreaInfo } from '../../interfaces/area-info';

@Injectable()
export class ChartsMapService {
  constructor(private http: HttpClient) {

  }
  requestMapJson(areaInfo: AreaInfo): Observable<Array<any>> {
    const hasDetailJSON = this.isHaveDetailJson(areaInfo);
    let reqArr = [];
    if (hasDetailJSON) {
      reqArr = [ this.requestMapBoundJson(areaInfo), this.requestMapFullJson(areaInfo)];
    } else {
      reqArr = [this.requestMapBoundJson(areaInfo)];
    }
    return forkJoin(reqArr);
  }

  isHaveDetailJson(areaInfo: AreaInfo): boolean {
    return !(parseInt(areaInfo.adcode.slice(4), 10) > 0);
  }

  requestMapBoundJson(areaInfo: AreaInfo): Observable<any> {

    return this.http.get(`https://tools-server.lostbug.com/map?url=https://geo.datav.aliyun.com/areas_v2/bound/${areaInfo.adcode}.json`);
  }
  requestMapFullJson(areaInfo: AreaInfo): Observable<any> {
    return this.http.get(
      `https://tools-server.lostbug.com/map?url=https://geo.datav.aliyun.com/areas_v2/bound/${areaInfo.adcode}_full.json`);
  }
}
