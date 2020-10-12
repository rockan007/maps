import { Injectable } from '@angular/core';
import { GUI } from 'dat.gui';
import { Observable, of, Subject } from 'rxjs';

@Injectable()
export class DatGuiService {
  public configSubject: Subject<any>;
  private gui: GUI;
  public config: any = {
    backcolor: {
      start: '#90caf9',
      end: '#1565c0',
      direction: ''
    },
    shadow: {
      color: '#0c0a3e',
      offsetX: -15,
      offsetY: 20,
      blurRadius: 5
    },
    border: {
      outer: {
        width: 1,
        color: '#ffffff'
      },
      inner: {
        width: 1,
        color: '#ffffff'
      }
    },
    effectScatter: {
      isShow: true,
      symbolSize: 20,
      color: '#ff8f00',
      label: {
        isShow: true,
        position: 'right',
        color: '#fff176',
        fontSize: 16
      },
      shadow: {
        color: '#ff8f00',
        blurRadius: 10
      }
    }
  };

  constructor() {

  }
  initDatGui(dom: HTMLElement): Observable<any> {
    this.gui = new GUI({
      autoPlace: false
    });
    dom.append(this.gui.domElement);
    this.setBackConfig();
    this.setBorderConfig();
    this.setEffectScatter();
    return of(this.config);
  }
  finishChange(): void {
    this.configSubjectNewInstance();
    this.configSubject.next(this.config);
  }
  getConfigSubject(): Observable<any> {
    return this.configSubjectNewInstance();
  }
  configSubjectNewInstance(): Observable<any> {
    if (!this.configSubject) {
      this.configSubject = new Subject();
    }
    return this.configSubject;
  }

  setEffectScatter(): void {
    const effectScatterFolder = this.gui.addFolder('散点');
    effectScatterFolder.add(this.config.effectScatter, 'symbolSize', 0, 100, 1).onFinishChange(this.finishChange.bind(this));
    effectScatterFolder.addColor(this.config.effectScatter, 'color').onFinishChange(this.finishChange.bind(this));
    const effectScatterLabelFolder = effectScatterFolder.addFolder('标注');
    effectScatterLabelFolder.add(this.config.effectScatter.label, 'position', ['left', 'right', 'bottom', 'top'])
      .onFinishChange(this.finishChange.bind(this));
    effectScatterLabelFolder.add(this.config.effectScatter.label, 'fontSize', 12, 32, 1).onFinishChange(this.finishChange.bind(this));
    effectScatterLabelFolder.addColor(this.config.effectScatter.label, 'color').onFinishChange(this.finishChange.bind(this));
    const scatterShadowFolder = effectScatterFolder.addFolder('阴影');
    scatterShadowFolder.addColor(this.config.effectScatter.shadow, 'color').onFinishChange(this.finishChange.bind(this));
    scatterShadowFolder.add(this.config.effectScatter.shadow, 'blurRadius').onFinishChange(this.finishChange.bind(this));
  }

  setBackConfig(): void {
    const backFolder = this.gui.addFolder('背景');

    this.setShadowConfig(backFolder);
    this.setBackColorConfig(backFolder);
  }
  setBorderConfig(): void {
    const borderFolder = this.gui.addFolder('边框');
    const outerBorderFolder = borderFolder.addFolder('外边框');
    const innerBorderFolder = borderFolder.addFolder('内边框');
    outerBorderFolder.add(this.config.border.outer, 'width', 0, 10, 1).onFinishChange(this.finishChange.bind(this));
    outerBorderFolder.addColor(this.config.border.outer, 'color').onFinishChange(this.finishChange.bind(this));
    innerBorderFolder.add(this.config.border.inner, 'width', 0, 10, 1).onFinishChange(this.finishChange.bind(this));
    innerBorderFolder.addColor(this.config.border.inner, 'color').onFinishChange(this.finishChange.bind(this));
  }
  setBackColorConfig(backFolder: GUI): void {
    const backColorFolder = backFolder.addFolder('颜色');
    backColorFolder.addColor(this.config.backcolor, 'start').onFinishChange(this.finishChange.bind(this));
    backColorFolder.addColor(this.config.backcolor, 'end').onFinishChange(this.finishChange.bind(this));
    backColorFolder.addFolder('方向');
  }
  setShadowConfig(backFolder: GUI): void {
    const backShadowFolder = backFolder.addFolder('阴影');
    backShadowFolder.addColor(this.config.shadow, 'color').onFinishChange(this.finishChange.bind(this));
    backShadowFolder.add(this.config.shadow, 'offsetX', -100, 100, 1).onFinishChange(this.finishChange.bind(this));
    backShadowFolder.add(this.config.shadow, 'offsetY', -100, 100, 1).onFinishChange(this.finishChange.bind(this));
    backShadowFolder.add(this.config.shadow, 'blurRadius', 0, 200, 1).onFinishChange(this.finishChange.bind(this));
  }
}
