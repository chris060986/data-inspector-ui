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
import { DuiValidators } from "../diu-validators";

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
  @Input() propName: string;

  private allPropertyKeys: Array<string> = [];
  private actLevelForms: Array<string> = [];
  private nextLevelForms: Array<string> = [];
  private arrayForms: Array<string> = [];
  private hiddenProperties: Array<string> = [];

  constructor() {}

  //Import Error-Message-Function
  private getErrorMessage = DuiValidators.getErrorMessage;

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
            currentValidators.push(DuiValidators.integerValidator);
          if (val.type == "number")
            currentValidators.push(DuiValidators.numberValidator);
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
    }
  }

  deleteArrayFromForm(prop: string) {
    if (!this.hiddenProperties.includes(prop)) {
      this.hiddenProperties.push(prop);
      this.localFormGroup.removeControl(prop);
    }
  }

  addArrayToForm(prop: string) {
    this.hiddenProperties = this.hiddenProperties.filter(
      element => element != prop
    );
    if (!this.localFormGroup.contains(prop)) {
      this.localFormGroup.addControl(prop, new FormArray([]));
    }
  }

  toggleObject(checked: boolean, prop: string) {
    if(checked) {
      this.addObjectToForm(prop);
    } else {
      this.deleteObjectFromForm(prop);
    }
  }

  toggleArray(checked: boolean, prop: string) {
    if(checked) {
      this.addArrayToForm(prop);
    } else {
      this.deleteArrayFromForm(prop);
    }
  }
}
