import { Component, OnInit, OnDestroy } from '@angular/core';
import { AreaSelectorService } from '../services/area-selector.service';
import { AreaInfo } from '../../interfaces/area-info';

@Component({
  selector: 'app-area-selector',
  templateUrl: './area-selector.component.html',
  styleUrls: ['./area-selector.component.less']
})
export class AreaSelectorComponent implements OnInit, OnDestroy {
  isSelected = false;
  private areaList: Array<AreaInfo>;
  selectAreaInfo: AreaInfo;
  relationAreaInfoList: Array<AreaInfo> = [];
  constructor(private areaSelectorService: AreaSelectorService) {
    this.areaSelectorService.newSubjectInstance().subscribe((res) => {
      console.log('newsubscribe', res);
      this.isSelected = true;
      this.selectAreaInfo = res;
    });
  }
  ngOnDestroy(): void {
    this.areaSelectorService.newSubjectInstance().unsubscribe();
  }
  ngOnInit(): void {
    this.getAreaInfoList();
  }
  getAreaInfoList(): void {
    this.areaSelectorService.getAreaCodes().subscribe((res) => {
      console.log('订阅消息:', res);
      if (res.status === '1') {
        this.areaList = res.districts;
        console.log(this.areaList);
        this.areaSelectorService.newSubjectInstance().next(res.districts[0]);
      }
    });
  }
  onclick(areaInfo: AreaInfo): void {
    this.areaSelectorService.newSubjectInstance().next(areaInfo);
  }
  onkey(event: any): void {
    this.isSelected = false;
    const inputValue = event.target.value.trim();
    this.relationAreaInfoList = this.findInputRelationList(inputValue);
  }

  findInputRelationList(inputValue: string): Array<AreaInfo> {
    const relationInfoList: Array<AreaInfo> = [];
    for (const areaInfo of this.areaList) {
      this.addRelationItem(inputValue, areaInfo, relationInfoList);
    }
    return relationInfoList;
  }
  addRelationItem(inputValue: string, areaInfo: AreaInfo, relationInfoList: AreaInfo[]): void {
    if (this.isRelationItem(inputValue, areaInfo)) {
      relationInfoList.push(areaInfo);
    }
    if (areaInfo.districts && areaInfo.districts.length > 0) {
      for (const district of areaInfo.districts) {
        this.addRelationItem(inputValue, district, relationInfoList);
      }
    }
  }
  isRelationItem(inputValue: string, areaInfo: AreaInfo): boolean {
    if (areaInfo.name.indexOf(inputValue) >= 0 || areaInfo.adcode.indexOf(inputValue) >= 0) {
      return true;
    }
    return false;
  }
}
