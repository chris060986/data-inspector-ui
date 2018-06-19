import { FormControl, Validators } from "@angular/forms";

export class DuiValidators {
  static integerValidator(control: FormControl): { [s: string]: boolean } {
    let reg = new RegExp("^[-+]?\\d*$");
    if (control.value != null && !reg.test(control.value)) {
      return { integer: false };
    }
    return null;
  }

  static integerWithoutZeroValidator(control: FormControl): { [s: string]: boolean } {
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

  static numberWithoutZeroValidator(control: FormControl): { [s: string]: boolean } {
    let reg = new RegExp("^[-+]?([0-9]+(.[0-9]+)?|.[0-9]+)$");
    if (
      (control.value != null && !reg.test(control.value)) ||
      control.value === "0"
    ) {
      return { numberWithoutZero: false };
    }
    return null;
  }

  static extractAndReturnValidators(object: any): Array<any> {
    let tmpValidators: Array<any> = [];
    if (object.max) {
      tmpValidators.push(Validators.max(object.max));
    }
    if (object.min) {
      tmpValidators.push(Validators.min(object.min));
    }
    if (object.maxLength) {
      tmpValidators.push(Validators.maxLength(object.maxLength));
    }
    if (object.minLength) {
      tmpValidators.push(Validators.minLength(object.minLength));
    }
    if (object.pattern) {
      tmpValidators.push(Validators.pattern(object.pattern));
    }
    return tmpValidators;
  }

  static getErrorMessage(field: FormControl) {
    if (field.errors == null) return undefined;
    return field.hasError("required")
      ? "You have to enter a value!"
      : field.hasError("maxlength")
        ? "The entered value is too long!"
        : field.hasError("minlength")
          ? "The entered value is too short!"
          : field.hasError("max")
            ? "Maximum value exceeded!"
            : field.hasError("min")
              ? "The value is below the minimum!"
              : field.hasError("pattern")
                ? "Defined pattern not matched!"
                : field.errors["integer"] != undefined
                  ? "Only integers are valid!"
                  : field.errors["integerWithoutZero"] != undefined
                    ? "Only integers are valid (not 0)!"
                    : field.errors["number"] != undefined
                      ? "Only numbers are valid!"
                      : field.errors["numberWithoutZero"] != undefined
                        ? "Only numbers are valid (not 0)!"
                        : undefined;
  }
}