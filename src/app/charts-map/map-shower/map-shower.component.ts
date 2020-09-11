import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChartsMapService } from '../services/charts-map.service'
import { EChartOption } from 'echarts';
import { AreaSelectorService } from '../services/area-selector.service';
import { AreaInfo } from '../../interfaces/area-info';
import { MapStyle } from '../../interfaces/map-style';
import { MapStyleSelectorService } from '../services/map-style-selector.service';
import { MapType } from '@angular/compiler';
import { Observable, from } from 'rxjs';
import * as echarts from "echarts";

@Component({
  selector: 'app-map-shower',
  templateUrl: './map-shower.component.html',
  styleUrls: ['./map-shower.component.less']
})
export class MapShowerComponent implements OnInit,OnDestroy {

  private jsonList: Array<any>;
  private mapStyle: MapStyle;
  private areaInfo: AreaInfo;
  // 创建表格对象
  chartOption: EChartOption = {

  };
  echartsIntance: any;
  constructor(private chartsMapService: ChartsMapService,
    private areaSelectorService: AreaSelectorService,
    private mapStyleSelectorService: MapStyleSelectorService) {

  }
  ngOnDestroy(): void {
    this.mapStyleSelectorService.newSubjectInstance().unsubscribe();
    this.areaSelectorService.newSubjectInstance().unsubscribe();
  }

  ngOnInit(): void {
    this.getMapJson();
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
    this.mapStyleSelectorService.newSubjectInstance().subscribe((mapStyle: MapType) => {
      console.log("订阅变更");
      this.mapStyle = mapStyle;
      this.showCharts(this.jsonList);

    })
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
                    color: "#002f6c", // 100% 处的颜色

                  },
                  {
                    offset: 0.5,
                    color: "#01579b", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#4fc3f7", // 0% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
                globalCoord: false, // 缺省为 false
              },
              borderColor: "rgba(255, 255, 255, 0.8)",
              shadowBlur: 5,
              shadowColor: "#0c0a3e",
              shadowOffsetX: -15,
              shadowOffsetY: 20,
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
                position: "left",
                fontSize: 14,
                color: "gold",
              },
              areaColor: "rgba(0,0,0,0)",
              borderColor: "rgba(255, 255, 255, 0.8)",
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
        {
          name: "涟漪散点",
          type: "effectScatter",
          coordinateSystem: "geo",
          symbolSize: 10,
          data: this.convertData(jsonList[1]),
          rippleEffect: {
            color: "#ff8f00",
          },
          markPoint: {
            size: 20,
          },
          label: {
            normal: {
              show: false,
              formatter: "{b}",
              position: "right",
            },
          },
          itemStyle: {
            color: "#ff8f00",
            shadowBlur: 10,
            shadowColor: "#333",
          },
        },
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
