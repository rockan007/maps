import { Injectable } from '@angular/core';
import { GUI } from 'dat.gui'
import { Observable, of, Subject } from 'rxjs';

@Injectable()
export class DatGuiService {
  public configSubject: Subject<any>;
  private gui: GUI;
  public config: any = {
    backcolor: {
      start: "#90caf9",
      end: "#1565c0",
      direction: ""
    },
    shadow: {
      color: "#0c0a3e",
      offsetX: -15,
      offsetY: 20,
      blurRadius: 5
    },
    border: {
      outer: {
        width: 1,
        color: "#ffffff"
      },
      inner: {
        width: 1,
        color: "#ffffff"
      }
    },
    effectScatter: {
      isShow: true,
      symbolSize: 20,

      color: "#ff8f00",
      label: {
        isShow: true,
        position: "right",
        color: "#fff176",
        fontSize: 16
      }, 
      shadow: {
        color:"#ff8f00",
        blurRadius:10,
      
      }
    }
  };

  constructor() {

  }
  initDatGui(dom:HTMLElement): Observable<any> {
    this.gui = new GUI({
       autoPlace: false 
    });
    dom.append(this.gui.domElement);
    this.setBackConfig();
    this.setBorderConfig();
    this.setEffectScatter();
    return of(this.config);
  }
  finishChange(value) {
    this.configSubjectNewInstance();
    this.configSubject.next(this.config);
  }
  getConfigSubject(): Observable<any> {
    return this.configSubjectNewInstance();
  }
  configSubjectNewInstance() {
    if (!this.configSubject) {
      this.configSubject = new Subject();
    }
    return this.configSubject;
  }

  setEffectScatter() {
    let effectScatterFolder = this.gui.addFolder("散点");
    let isShowScatter = effectScatterFolder.add(this.config.effectScatter, "isShow").onFinishChange(this.finishChange.bind(this));;
    let scatterSize = effectScatterFolder.add(this.config.effectScatter, "symbolSize", 0, 100, 1).onFinishChange(this.finishChange.bind(this));;
    let scatterColor = effectScatterFolder.addColor(this.config.effectScatter, "color").onFinishChange(this.finishChange.bind(this));;
    let effectScatterLabelFolder = effectScatterFolder.addFolder("标注");
    let scatterLabelPosition = effectScatterLabelFolder.add(this.config.effectScatter.label, "position", ["left", "right", "bottom", "top"]).onFinishChange(this.finishChange.bind(this));;
    let scatterLabelSize = effectScatterLabelFolder.add(this.config.effectScatter.label, "fontSize", 12, 32, 1).onFinishChange(this.finishChange.bind(this));;
    let scatterLabelColor = effectScatterLabelFolder.addColor(this.config.effectScatter.label, "color").onFinishChange(this.finishChange.bind(this));
    let scatterShadowFolder=effectScatterFolder.addFolder("阴影");
    let scatterShadowColor=scatterShadowFolder.addColor(this.config.effectScatter.shadow,'color').onFinishChange(this.finishChange.bind(this));
    let scatterShadowBlur=scatterShadowFolder.add(this.config.effectScatter.shadow,"blurRadius").onFinishChange(this.finishChange.bind(this));
  }

  setBackConfig() {
    let backFolder = this.gui.addFolder("背景");

    this.setShadowConfig(backFolder);
    this.setBackColorConfig(backFolder);
  }
  setBorderConfig() {
    let borderFolder = this.gui.addFolder("边框");
    let outerBorderFolder = borderFolder.addFolder("外边框");
    let innerBorderFolder = borderFolder.addFolder("内边框");
    let outerBoderWidth = outerBorderFolder.add(this.config.border.outer, "width", 0, 10, 1).onFinishChange(this.finishChange.bind(this));
    let outerBoderColor = outerBorderFolder.addColor(this.config.border.outer, "color").onFinishChange(this.finishChange.bind(this));;
    let innerBoderWidth = innerBorderFolder.add(this.config.border.inner, "width", 0, 10, 1).onFinishChange(this.finishChange.bind(this));
    let innerBorderColor = innerBorderFolder.addColor(this.config.border.inner, "color").onFinishChange(this.finishChange.bind(this));;
  }
  setBackColorConfig(backFolder: GUI) {
    let backColorFolder = backFolder.addFolder("颜色");
    let backColorStart = backColorFolder.addColor(this.config.backcolor, "start").onFinishChange(this.finishChange.bind(this));;
    let backColorEnd = backColorFolder.addColor(this.config.backcolor, 'end').onFinishChange(this.finishChange.bind(this));;
    let backColorDirectionFolder = backColorFolder.addFolder("方向");

  }
  setShadowConfig(backFolder: GUI) {
    let backShadowFolder = backFolder.addFolder("阴影");
    let shadowColor = backShadowFolder.addColor(this.config.shadow, 'color').onFinishChange(this.finishChange.bind(this));;
    let shadowOffsetX = backShadowFolder.add(this.config.shadow, 'offsetX', -100, 100, 1).onFinishChange(this.finishChange.bind(this));
    let shadowOffsetY = backShadowFolder.add(this.config.shadow, "offsetY", -100, 100, 1).onFinishChange(this.finishChange.bind(this));
    let shadowBlurRadius = backShadowFolder.add(this.config.shadow, "blurRadius", 0, 200, 1).onFinishChange(this.finishChange.bind(this));
  }
}
