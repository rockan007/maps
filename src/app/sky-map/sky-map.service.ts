import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import MapPointer from "../interfaces/map-pointer"
import { Subject, Observable } from 'rxjs';
const PI = 3.14159265358979324;
@Injectable()
export class SkyMapService {

  map: any;
  search: any;
  currentMapPointerSubject: Subject<MapPointer> = null;
  mapSubject = null;
  private searchUrl = "https://restapi.amap.com/v3/place/text";
  constructor(private http: HttpClient) {

  }
  getSearchResult(keywords: string): Observable<any> {
    let params = new HttpParams()
      .set("key", "187fbc40fe82283aad8012fa25bcda8a")
      .set("keywords", keywords)
      .set("offset", "10");

    const result = this.http.get(this.searchUrl, { params: params });
    console.log("searchResult:", result);
    return result;
  }
  //点击地点的变化监听
  newCurrentMapPointerSubjectInstance() {
    if (this.currentMapPointerSubject == null) {
      this.currentMapPointerSubject = new Subject<MapPointer>();
    }
    return this.currentMapPointerSubject;
  }
  //地图变化监听
  newMapSubjectInstance() {
    if (this.mapSubject == null) {
      this.mapSubject = new Subject();
    }
    return this.mapSubject;
  }

  changeStrToPoint(str: string, isTrans: boolean): MapPointer {
    const strArr = str.split(",");
    if (isTrans) {
      return this.transformGCJ2WGS(parseFloat(strArr[1]), parseFloat(strArr[0]));
    }
    return {
      lng: parseFloat(strArr[0]),
      lat: parseFloat(strArr[1])
    }

  }

  transformGCJ2WGS(gcjLat, gcjLon) {

    let d = this.delta(gcjLat, gcjLon)
    return {
      lat: gcjLat - d.lat,
      lng: gcjLon - d.lon
    }
  }

  delta(lat, lon) {

    let a = 6378245.0 //  a: 卫星椭球坐标投影到平面地图坐标系的投影因子。
    let ee = 0.00669342162296594323 //  ee: 椭球的偏心率。
    let dLat = this.transformLat(lon - 105.0, lat - 35.0)
    let dLon = this.transformLon(lon - 105.0, lat - 35.0)
    let radLat = lat / 180.0 * PI
    let magic = Math.sin(radLat)
    magic = 1 - ee * magic * magic
    let sqrtMagic = Math.sqrt(magic)
    dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * PI)
    dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * PI)
    return {
      'lat': dLat,
      'lon': dLon
    }
  }
  transformLat(x, y) {
    let ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x))
    ret += (20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0 / 3.0
    ret += (20.0 * Math.sin(y * PI) + 40.0 * Math.sin(y / 3.0 * PI)) * 2.0 / 3.0
    ret += (160.0 * Math.sin(y / 12.0 * PI) + 320 * Math.sin(y * PI / 30.0)) * 2.0 / 3.0
    return ret
  }
  transformLon(x, y) {
    let ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x))
    ret += (20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0 / 3.0
    ret += (20.0 * Math.sin(x * PI) + 40.0 * Math.sin(x / 3.0 * PI)) * 2.0 / 3.0
    ret += (150.0 * Math.sin(x / 12.0 * PI) + 300.0 * Math.sin(x / 30.0 * PI)) * 2.0 / 3.0
    return ret
  }



}
