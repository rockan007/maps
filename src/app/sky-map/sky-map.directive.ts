
export function allowInputValidator(type: KeywordsType): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    let allow = false;
    switch (type) {
      case KeywordsType.Text:
        allow = control.value.trim().length > 0;
        break;
      case KeywordsType.LngLat:
        allow = isLnglatInput(control.value.trim())
      default:
        break;
    }
    return allow ? null : { 'forbiddenName': { value: control.value } };
  };
}
function isLnglatInput(str: string) {
  if (str.length == 0) {
    return false;
  }
  const lnglatArr = str.split(",");
  if (lnglatArr.length != 2) {
    return false;
  }
  return lnglatArr.every((lnglat) => {
    return !isNaN(parseFloat(lnglat));
  })
}
import { Directive, Input } from '@angular/core';
import { ValidatorFn, AbstractControl, NG_VALIDATORS, Validator, ValidationErrors } from '@angular/forms';
import { KeywordsType } from './enums/keywords-type.enum';


@Directive({
  selector: '[appSkyMap]',
  providers: [{ provide: NG_VALIDATORS, useExisting: SkyMapDirective, multi: true }]
})
export class SkyMapDirective implements Validator {
  @Input('appSkyMap') allowInputValue: string;
  @Input('appSkyMap') keywordsType: KeywordsType;

  constructor() { }
  validate(control: AbstractControl): { [key: string]: any } | null {
    return this.allowInputValue ? allowInputValidator(this.keywordsType)(control)
      : null;
  }
  registerOnValidatorChange?(fn: () => void): void {
    throw new Error("Method not implemented.");
  }

}