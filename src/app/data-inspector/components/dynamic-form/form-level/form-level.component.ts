import { Component, OnInit, Input } from "@angular/core";
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
  @Input() requiredFields: Array<String>;
  @Input() propName: String;

  private allPropertyKeys: Array<String> = [];
  private actLevelForms: Array<String> = [];
  private nextLevelForms: Array<String> = [];
  private arrayForms: Array<String> = [];

  constructor() {}

  ngOnInit() {
    if (this.structureObject) {
      Object.entries(this.structureObject).forEach(([key, val]) => {
        this.allPropertyKeys.push(key);
        switch (val.type) {
          case "string":
          case "integer":
          case "number":
          case "boolean":
            let tmpFormControl: FormControl;
            let currentValidators: Array<any> = [];
            if (
              val.enum &&
              this.dataObject[key] &&
              !val.enum.includes(this.dataObject[key])
            ) {
              this.dataObject[key] = undefined;
            }
            if (this.requiredFields && this.requiredFields.includes(key)) {
              currentValidators.push(Validators.required);
            }
            if (this.dataObject && this.dataObject[key]) {
                tmpFormControl = new FormControl(this.dataObject[key], currentValidators);
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
            console.log(val);
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
  }

  getErrorMessage(field: FormControl) {
    if(field.errors == null) return undefined;
    return field.hasError('required')
      ? 'You have to enter a value!'
      : field.hasError('maxlength')
        ? 'The entered value is too long!'
        : field.hasError('minlength')
          ? 'The entered value is too short!'
          : field.hasError('max')
            ? 'The entered value greater than the maximum value!'
            : field.errors['number'] != undefined
              ? 'Only numbers are valid (not 0)!'
              : undefined;
  }
}
