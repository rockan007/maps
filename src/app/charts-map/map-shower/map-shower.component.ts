import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChartsMapService } from '../services/charts-map.service'
import { EChartOption } from 'echarts';
import { AreaSelectorService } from '../services/area-selector.service';
import { AreaInfo } from '../../interfaces/area-info';
import { MapStyle } from '../../interfaces/map-style';
import { Observable, } from 'rxjs';
import * as echarts from "echarts";
import { DatGuiService } from "../dat-gui.service";
import { debounceTime } from 'rxjs/operators';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-map-shower',
  templateUrl: './map-shower.component.html',
  styleUrls: ['./map-shower.component.less']
})
export class MapShowerComponent implements OnInit, OnDestroy {

  private jsonList: Array<any>;
  private mapStyle: MapStyle;
  private areaInfo: AreaInfo;
  // 创建表格对象
  chartOption: EChartOption = {

  };
  echartsIntance: any;
  mapConfig: any;
  constructor(private chartsMapService: ChartsMapService,
    private areaSelectorService: AreaSelectorService,
    private datGuiService: DatGuiService,
    private _elementRef : ElementRef) {

  }
  ngOnDestroy(): void {
    this.datGuiService.configSubjectNewInstance().unsubscribe();
    this.areaSelectorService.newSubjectInstance().unsubscribe();
  }

  ngOnInit(): void {
    this.mapConfig = this.datGuiService.config;

    this.getMapJson();

    this.datGuiService.initDatGui( this._elementRef.nativeElement.querySelector('.dat-gui-container'));

    this.datGuiService.getConfigSubject().pipe(
      debounceTime(3000),
    ).subscribe((config) => {
      console.log("config", config);
      this.mapConfig = config;
      this.showCharts(this.jsonList);
    })
  }
  onChartInit(ec) {
    this.echartsIntance = ec;
  }
  getMapJson() {
    this.areaSelectorService.newSubjectInstance().subscribe((areaInfo: AreaInfo) => {
      this.areaInfo = areaInfo;
      this.requestJsonList().subscribe((jsonList) => {
        this.jsonList = jsonList;
        this.showCharts(jsonList);
      });
    });
  }
  showCharts(jsonList: any[]) {
    this.echartsIntance.clear();
    echarts.registerMap(this.areaInfo.name, jsonList[1]);
    echarts.registerMap(`${this.areaInfo.name}border`, jsonList[0]);
    this.chartOption = {
      tooltip: {
        trigger: "item",
        formatter: "{b}",
      },
      geo: [
        {
          map: `${this.areaInfo.name}border`,
          name: `${this.areaInfo.name}border`,
          type: "map",
          mapType: `${this.areaInfo.name}border`, // 自定义扩展图表类型
          zoom: 1.25,
          cursor: "default",
          markPoint: {
            symbol: "circle",
          },
          label: {
            normal: {
              show: false,
            },
            emphasis: {
              show: false,
            },
          },
          itemStyle: {
            normal: {
              label: {
                show: false,
                position: "left",
                fontSize: 14,
                color: "gold",
              },
              areaColor: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: this.mapConfig.backcolor.start, // 100% 处的颜色

                  },
                  {
                    offset: 1,
                    color: this.mapConfig.backcolor.end, // 0% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
                globalCoord: false, // 缺省为 false
              },
              borderColor: this.mapConfig.border.outer.color,
              shadowBlur: this.mapConfig.shadow.blurRadius,
              shadowColor: this.mapConfig.shadow.color,
              shadowOffsetX: this.mapConfig.shadow.offsetX,
              shadowOffsetY: this.mapConfig.shadow.offsetY,
            },

            emphasis: {
              areaColor: "rgb(44,80,208)",
            },
            silent: true,
          },
          // silent: true
        },
        {
          map: this.areaInfo.name,
          name: this.areaInfo.name,
          // type: "map",
          mapType: this.areaInfo.name, // 自定义扩展图表类型
          zIndex: 1,
          zoom: 1.25,
          cursor: "default",
          markPoint: {
            symbol: "circle",
          },
          label: {
            normal: {
              show: false,
            },
            emphasis: {
              show: false,
            },
          },
          itemStyle: {
            normal: {
              label: {
                show: false,
              },
              areaColor: "rgba(0,0,0,0)",
              borderColor: this.mapConfig.border.inner.color,
            },
            emphasis: {
              areaColor: "rgb(44,80,208)",
            },
            silent: true,
          },
          // silent: true
        },
      ],
      series: [
        this.mapConfig.effectScatter.isShow ? {
          name: "涟漪散点",
          type: "effectScatter",
          coordinateSystem: "geo",
          symbolSize: this.mapConfig.effectScatter.symbolSize,
          data: this.convertData(jsonList[1]),
          rippleEffect: {
            color: this.mapConfig.effectScatter.shadow.color
          },
          markPoint: {
            size: this.mapConfig.effectScatter.size
          },
          label: {
            normal: {
              show: this.mapConfig.effectScatter.label.isShow,
              formatter: "{b}",
              position: this.mapConfig.effectScatter.label.position,
              color: this.mapConfig.effectScatter.label.color
            },
          },
          itemStyle: {
            color: this.mapConfig.effectScatter.color,
            shadowBlur: this.mapConfig.effectScatter.blurRadius,
            shadowColor: this.mapConfig.effectScatter.shadow.color,
          },
        } : {},
      ],
    };
  }
  convertData(fullJson) {
    var res = [];
    for (let index in fullJson.features) {
      res.push({
        name: fullJson.features[index].properties.name,
        value: fullJson.features[index].properties.center,
      });
    }
    console.log(JSON.stringify(res));
    return res;
  }
  requestJsonList(): Observable<Array<any>> {
    return this.chartsMapService.requestMapJson(this.areaInfo, this.mapStyle);

  }
  setCharts(jsonList: Array<any>) {
    this.initCharts();
    this.setOptions(jsonList)
  }
  setOptions(jsonList: any[]) {
    throw new Error("Method not implemented.");
  }
  //加载echarts
  initCharts(): void {

  }


}
