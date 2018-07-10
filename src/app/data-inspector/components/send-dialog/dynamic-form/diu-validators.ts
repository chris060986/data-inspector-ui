import { FormControl, Validators } from "@angular/forms";

export class DuiValidators {
  static integerValidator(control: FormControl): { [s: string]: boolean } {
    let reg = new RegExp("^[-+]?\\d*$");
    if (control.value != null && !reg.test(control.value)) {
      return { integer: false };
    }
    return null;
  }

  static integerWithoutZeroValidator(
    control: FormControl
  ): { [s: string]: boolean } {
    let reg = new RegExp("^[-+]?\\d*$");
    if (
      (control.value != null && !reg.test(control.value)) ||
      control.value === "0"
    ) {
      return { integerWithoutZero: false };
    }
    return null;
  }

  static numberValidator(control: FormControl): { [s: string]: boolean } {
    let reg = new RegExp("^[-+]?([0-9]+([.,][0-9]+)?|[.,][0-9]+)$");
    if (control.value != null && !reg.test(control.value)) {
      return { number: false };
    }
    return null;
  }

  static numberWithoutZeroValidator(
    control: FormControl
  ): { [s: string]: boolean } {
    let reg = new RegExp("^[-+]?([0-9]+(.[0-9]+)?|.[0-9]+)$");
    if (
      (control.value != null && !reg.test(control.value)) ||
      control.value === "0"
    ) {
      return { numberWithoutZero: false };
    }
    return null;
  }

  static getValidatorValues(object: any): any {
    let validatorValues: any = new Object();
    if (object.max != undefined) {
      validatorValues["max"] = object.max;
    }
    if (object.min != undefined) {
      validatorValues["min"] = object.min;
    }
    if (object.maxLength != undefined) {
      validatorValues["maxLength"] = object.maxLength;
    }
    if (object.minLength != undefined) {
      validatorValues["minLength"] = object.minLength;
    }
    if (object.pattern != undefined) {
      validatorValues["pattern"] = object.pattern;
    }
    return validatorValues;
  }

  static extractAndReturnValidators(object: any): Array<any> {
    let tmpValidators: Array<any> = [];
    if (object.max != undefined) {
      tmpValidators.push(Validators.max(object.max));
    }
    if (object.min != undefined) {
      tmpValidators.push(Validators.min(object.min));
    }
    if (object.maxLength != undefined) {
      tmpValidators.push(Validators.maxLength(object.maxLength));
    }
    if (object.minLength != undefined) {
      tmpValidators.push(Validators.minLength(object.minLength));
    }
    if (object.pattern != undefined) {
      tmpValidators.push(Validators.pattern(object.pattern));
    }
    return tmpValidators;
  }

  static getErrorMessage(field: FormControl) {
    if (field.errors == null) return undefined;
    return field.hasError("required")
      ? "enter a value"
      : field.hasError("maxlength")
        ? "maximum of " + field['validatorValues'].maxLength + " characters exceeded"
        : field.hasError("minlength")
          ? "enter at least " + field['validatorValues'].minLength + " characters"
          : field.hasError("max")
            ? "the maximum value is " + field['validatorValues'].max
            : field.hasError("min")
              ? "the minimum value is " + field['validatorValues'].min
              : field.hasError("pattern")
                ? "match the following pattern: " + field['validatorValues'].pattern
                : field.errors["integer"] != undefined
                  ? "enter an integer"
                  : field.errors["integerWithoutZero"] != undefined
                    ? "enter an integer (not 0)"
                    : field.errors["number"] != undefined
                      ? "enter a number"
                      : field.errors["numberWithoutZero"] != undefined
                        ? "enter a number (not 0)"
                        : undefined;
  }
}
