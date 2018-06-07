import {
  Component,
  OnInit,
  Input,
  AfterViewChecked,
  AfterContentInit,
  AfterContentChecked,
  Output,
  EventEmitter
} from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "diu-form-level",
  templateUrl: "./form-level.component.html",
  styleUrls: ["./form-level.component.css"]
})
export class FormLevelComponent implements OnInit {
  @Input() localFormGroup: FormGroup;
  @Input() structureObject: Object;
  @Input() dataObject: Object;
  @Input() requiredFields: Array<string>;
  @Input() selfRequired: boolean = true;
  @Input() propName: string;
  @Output() remove: EventEmitter<string> = new EventEmitter();
  @Output() add: EventEmitter<string> = new EventEmitter();

  private allPropertyKeys: Array<string> = [];
  private actLevelForms: Array<string> = [];
  private nextLevelForms: Array<string> = [];
  private arrayForms: Array<string> = [];
  private hiddenProperties: Array<string> = [];

  constructor() {}

  ngOnInit() {
    this.buildComponent();
  }

  buildComponent() {
    Promise.resolve().then(() => {
      if (this.structureObject) {
        Object.entries(this.structureObject).forEach(([key, val]) => {
          this.allPropertyKeys.push(key);
          let tmpFormControl: FormControl;
          let currentValidators: Array<any> = [];
          if (val.type == "integer")
            currentValidators.push(this.integerValidator);
          if (val.type == "number")
            currentValidators.push(this.numberValidator);
          switch (val.type) {
            case "string":
            case "integer":
            case "number":
            case "boolean":
              if (this.requiredFields && this.requiredFields.includes(key)) {
                currentValidators.push(Validators.required);
              }
              if (
                val.enum &&
                this.dataObject[key] &&
                !val.enum.includes(this.dataObject[key])
              ) {
                this.dataObject[key] = undefined;
              }
              if (this.dataObject && this.dataObject[key]) {
                tmpFormControl = new FormControl(
                  this.dataObject[key],
                  currentValidators
                );
              } else {
                tmpFormControl = new FormControl(undefined, currentValidators);
              }
              this.localFormGroup.addControl(key, tmpFormControl);
              this.actLevelForms.push(key);
              break;

            case "object":
              this.localFormGroup.addControl(key, new FormGroup({}));
              this.nextLevelForms.push(key);
              break;

            case "array":
              let tmpFormArray: FormArray = new FormArray([]);
              let i = 0;
              val.items.forEach(items => {
                if (items.type == "object") {
                  tmpFormArray.push(new FormGroup({}));
                }
              });
              this.localFormGroup.addControl(key, tmpFormArray);
              this.arrayForms.push(key);
              break;

            default:
              break;
          }
        });
      }
    });
  }

  getData(data: any, prop: string) {
    if (data && data[prop]) {
      return data[prop];
    } else {
      return undefined;
    }
  }

  getArrayData(data: any, prop: string, index: number): any {
    if (data && data[prop]) {
      return data[prop][index];
    } else {
      return undefined;
    }
  }

  deleteObjectFromForm(prop: string) {
    if (!this.hiddenProperties.includes(prop)) {
      this.hiddenProperties.push(prop);
      this.localFormGroup.removeControl(prop);
    }
  }

  addObjectToForm(prop: string) {
    this.hiddenProperties = this.hiddenProperties.filter(
      element => element != prop
    );
    if (!this.localFormGroup.contains(prop)) {
      this.localFormGroup.addControl(prop, new FormGroup({}));
      this.nextLevelForms.push(prop);
    }
  }

  integerValidator(control: FormControl): { [s: string]: boolean } {
    let reg = new RegExp("^[-+]?\\d*$");
    if (control.value != null && !reg.test(control.value)) {
      return { integer: false };
    }
    return null;
  }

  integerWithoutZeroValidator(control: FormControl): { [s: string]: boolean } {
    let reg = new RegExp("^[-+]?\\d*$");
    if (
      (control.value != null && !reg.test(control.value)) ||
      control.value === "0"
    ) {
      return { integerWithoutZero: false };
    }
    return null;
  }

  numberValidator(control: FormControl): { [s: string]: boolean } {
    let reg = new RegExp("^[-+]?([0-9]+([.,][0-9]+)?|[.,][0-9]+)$");
    if (control.value != null && !reg.test(control.value)) {
      return { number: false };
    }
    return null;
  }

  numberWithoutZeroValidator(control: FormControl): { [s: string]: boolean } {
    let reg = new RegExp("^[-+]?([0-9]+(.[0-9]+)?|.[0-9]+)$");
    if (
      (control.value != null && !reg.test(control.value)) ||
      control.value === "0"
    ) {
      return { numberWithoutZero: false };
    }
    return null;
  }

  getErrorMessage(field: FormControl) {
    if (field.errors == null) return undefined;
    return field.hasError("required")
      ? "You have to enter a value!"
      : field.hasError("maxlength")
        ? "The entered value is too long!"
        : field.hasError("minlength")
          ? "The entered value is too short!"
          : field.hasError("max")
            ? "The entered value greater than the maximum value!"
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

  test(object: any): string {
    return JSON.stringify(object);
  }
}
