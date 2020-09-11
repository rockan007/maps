import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { SkyMapService } from "../sky-map.service"
import { last } from 'rxjs/operators';
declare let T: any;
@Component({
  selector: 'app-map-shower',
  templateUrl: './map-shower.component.html',
  styleUrls: ['./map-shower.component.less']
})
export class MapShowerComponent implements OnInit, OnDestroy {

  map;
  constructor(private skyMapService: SkyMapService, private el: ElementRef) { }

  ngOnInit(): void {
    this.initMap();
    this.skyMapService.newCurrentMapPointerSubjectInstance().subscribe((lnglat) => {
      const _centerPointer=new T.LngLat(lnglat.lng, lnglat.lat)
      this.map.panTo(_centerPointer);
      this.setIconInMap(_centerPointer);
    })
  }
  setIconInMap(_centerPointer: any) {
    this.map.clearOverLays()
    let marker = new T.Marker(_centerPointer);
    //向地图上添加标注
    this.map.addOverLay(marker);
  }
  ngOnDestroy(): void {
    this.skyMapService.newCurrentMapPointerSubjectInstance().unsubscribe();
  }
  initMap() {
    let dom = this.el.nativeElement.querySelector('.map');
    this.setMap(dom);
  }
  setMap(dom) {
    //初始化地图对象
    this.map = new T.Map(dom, { datasourcesControl: true });
    //设置显示地图的中心点和级别
    this.map.centerAndZoom(new T.LngLat(116.40969, 39.89945), 12);
    //创建对象
    const ctrl = new T.Control.MapType();
    //添加控件
    this.map.addControl(ctrl);
    var cp = new T.CoordinatePickup(this.map, { callback: this.getLngLat.bind(this) })
    cp.addEvent();
    this.skyMapService.newMapSubjectInstance().next(this.map);
    this.skyMapService.map = this.map;
  }
  getLngLat(lnglat) {
    this.skyMapService.newCurrentMapPointerSubjectInstance().next(lnglat);
  }

}
