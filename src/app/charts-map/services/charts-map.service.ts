import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, forkJoin } from 'rxjs';
import { AreaInfo } from "../../interfaces/area-info"
import { MapStyle } from "../../interfaces/map-style";

@Injectable()
export class ChartsMapService {
  constructor(private http: HttpClient) {

  }
  requestMapJson(areaInfo: AreaInfo, mapStyle: MapStyle): Observable<Array<any>> {
    let isLinearGriadientColor = [true, false][Math.round(Math.random())];

    let reqArr = [];
    // if(isLinearGriadientColor){
    reqArr = [this.requestMapBoundJson(areaInfo), this.requestMapFullJson(areaInfo)];
    // }else{
    //   reqArr=[this.requestMapFullJson(areaInfo)];
    // }
    return forkJoin(reqArr);

  }
  requestMapBoundJson(areaInfo: AreaInfo): Observable<any> {

    return this.http.get(`https://tools-server.lostbug.com/map?url=https://geo.datav.aliyun.com/areas_v2/bound/${areaInfo.adcode}.json`);
  }
  requestMapFullJson(areaInfo: AreaInfo): Observable<any> {
    return this.http.get(`https://tools-server.lostbug.com/map?url=https://geo.datav.aliyun.com/areas_v2/bound/${areaInfo.adcode}_full.json`);
  }
}
