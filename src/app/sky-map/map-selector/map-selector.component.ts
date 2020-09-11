import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { KeywordsType } from '../enums/keywords-type.enum';
import { KeywordsInfo } from "../../interfaces/keywords-info";
import { SkyMapService } from '../sky-map.service';
import MapPointer from 'src/app/interfaces/map-pointer';
declare let T: any;
@Component({
  selector: 'app-map-selector',
  templateUrl: './map-selector.component.html',
  styleUrls: ['./map-selector.component.less']
})
export class MapSelectorComponent implements OnInit, OnDestroy {
  search: any;
  pickedCoordinate: MapPointer;
  keywordsType = KeywordsType;
  keywordsInfo: KeywordsInfo = {
    type: this.keywordsType.Text,
    keywords: ''
  };
  inputTypeControl = new FormControl(this.keywordsType.Text);
  inputValueControl = new FormControl();
  constructor(private skyMapService: SkyMapService, private el: ElementRef) {

  }


  ngOnInit(): void {
    this.subscribeControls();
    this.skyMapService.newCurrentMapPointerSubjectInstance().subscribe((lnglat) => {
      console.log("selector获取的坐标：", lnglat);
      this.pickedCoordinate = lnglat;
    });
    this.skyMapService.newMapSubjectInstance().subscribe(map => {
      console.log("加载监听:", map);

    })
  }
  ngOnDestroy(): void {
    this.skyMapService.newCurrentMapPointerSubjectInstance().unsubscribe();
    this.skyMapService.newMapSubjectInstance().unsubscribe();
  }
  subscribeControls() {
    this.inputTypeControl.valueChanges.subscribe((type) => {
      console.log("type", type);
      this.keywordsInfo.type = type;
    });
    this.inputValueControl.valueChanges.subscribe((value) => {
      console.log("value", value);
      this.keywordsInfo.keywords = value;
    });
  }
  searchListener() {
    switch (this.keywordsInfo.type) {
      case this.keywordsType.LngLat:
        this.pickedCoordinate = this.skyMapService.changeStrToPoint(this.keywordsInfo.keywords, false);
        this.skyMapService.newCurrentMapPointerSubjectInstance().next(this.pickedCoordinate)
        break;
      case this.keywordsType.Text:
        this.skyMapService.getSearchResult(this.keywordsInfo.keywords).subscribe((res) => {
          console.log("res", res);
          this.pickedCoordinate = this.skyMapService.changeStrToPoint(res.pois[0].location, true)
          this.skyMapService.newCurrentMapPointerSubjectInstance().next(this.pickedCoordinate)
        })
        break;
      default: break;
    }


  }

  startSearch(keywordInfo: KeywordsInfo) {
    if (keywordInfo.type == KeywordsType.Text) {
      this.search.search(keywordInfo.keywords, 7);
    } else {

    }
  }
  copyCoordinate() {
    let resultInput = this.el.nativeElement.querySelector(".result-input");
    resultInput.select();

    if (document.execCommand('copy', false, null)) {
      alert("复制成功！")
    }
  }
}
