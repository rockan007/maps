import { Component, OnInit, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { KeywordsType } from '../enums/keywords-type.enum';
import { KeywordsInfo } from '../../interfaces/keywords-info';
import { SkyMapService } from '../sky-map.service';
import { MatTooltip } from '@angular/material/tooltip';
import MapPointer from 'src/app/interfaces/map-pointer';
declare let T: any;
@Component({
  selector: 'app-map-selector',
  templateUrl: './map-selector.component.html',
  styleUrls: ['./map-selector.component.less']
})
export class MapSelectorComponent implements OnInit, OnDestroy {
  search: any;
  msg: string;
  @ViewChild('tooltip') toolTip: MatTooltip;
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
      this.pickedCoordinate = lnglat;
    });
    this.skyMapService.newMapSubjectInstance().subscribe(map => {
    });
  }
  ngOnDestroy(): void {
    this.skyMapService.newCurrentMapPointerSubjectInstance().unsubscribe();
    this.skyMapService.newMapSubjectInstance().unsubscribe();
  }
  subscribeControls(): void {
    this.inputTypeControl.valueChanges.subscribe((type) => {
      this.keywordsInfo.type = type;
    });
    this.inputValueControl.valueChanges.subscribe((value) => {
      this.keywordsInfo.keywords = value;
    });
  }
  searchListener(): void {
    switch (this.keywordsInfo.type) {
      case this.keywordsType.LngLat:
        this.pickedCoordinate = this.skyMapService.changeStrToPoint(this.keywordsInfo.keywords, false);
        this.skyMapService.newCurrentMapPointerSubjectInstance().next(this.pickedCoordinate);
        break;
      case this.keywordsType.Text:
        this.skyMapService.getSearchResult(this.keywordsInfo.keywords).subscribe((res) => {
          this.pickedCoordinate = this.skyMapService.changeStrToPoint(res.pois[0].location, true);
          this.skyMapService.newCurrentMapPointerSubjectInstance().next(this.pickedCoordinate);
        });
        break;
      default: break;
    }
  }

  startSearch(keywordInfo: KeywordsInfo): void {
    if (keywordInfo.type === KeywordsType.Text) {
      this.search.search(keywordInfo.keywords, 7);
    }
  }
  copyCoordinate(): void {
    const resultInput = this.el.nativeElement.querySelector('.result-input');
    resultInput.select();

    if (document.execCommand('copy', false, null)) {
      this.msg = '复制成功';
      console.log(this.toolTip);
      this.toolTip.message = '复制成功!';
      console.log(this.toolTip.message);
      this.toolTip.show();
      setTimeout(() => {
        this.toolTip.hide();
        this.toolTip.message = '';
        this.msg = '';
      }, 5000);
    }
  }
}
