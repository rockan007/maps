import { Component, OnInit, ElementRef } from '@angular/core';
declare let T:any;
@Component({
  selector: 'app-map-shower',
  templateUrl: './map-shower.component.html',
  styleUrls: ['./map-shower.component.less']
})
export class MapShowerComponent implements OnInit {

  map;
  constructor( private el:ElementRef) { }


  ngOnInit(): void {
    this.initMap();
  }
  initMap() {
    //初始化地图对象
    this.map = new T.Map( this.el.nativeElement.querySelector('.map'), { datasourcesControl: true });
    //设置显示地图的中心点和级别
    this.map.centerAndZoom(new T.LngLat(116.40969, 39.89945), 12);
    //创建对象
    const ctrl = new T.Control.MapType();
    //添加控件
    this.map.addControl(ctrl);
  }
}
