import { Component, OnInit, Input } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { DuiValidators } from "../diu-validators";
import { DefinitionsService } from "../definitions.service";

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
  @Input() firstLevel: boolean = false;
  @Input() inspectOnly: boolean;

  private allPropertyKeys: Array<string> = [];
  private actLevelForms: Array<string> = [];
  private nextLevelForms: Array<string> = [];
  private arrayForms: Array<string> = [];
  private hiddenProperties: Array<string> = [];

  constructor(private definitionsService: DefinitionsService) {}

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
              // get prefill value for form
              let value: any;
              if (this.dataObject && this.dataObject[key]) {
                value = this.dataObject[key];
              } else {
                value = undefined;
              }
              if (val.type == "boolean" && !value) {
                value = false;
              }
              if (val.enum && value && !val.enum.includes(value)) {
                value = undefined;
              }
              //set validators
              if (this.requiredFields && this.requiredFields.includes(key)) {
                currentValidators.push(Validators.required);
              }
              tmpFormControl = new FormControl(value, [...currentValidators, ...DuiValidators.extractAndReturnValidators(val)]);
              tmpFormControl['validatorValues'] = DuiValidators.getValidatorValues(val);
              if(this.inspectOnly) {
                tmpFormControl.disable();
              }
              this.localFormGroup.addControl(key, tmpFormControl);
              this.actLevelForms.push(key);
              break;

            case "object":
              this.nextLevelForms.push(key);
              this.localFormGroup.addControl(key, new FormGroup({}));
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

  getOneOfArray(oneOfArray: any): Array<string> {
    let tmpArray: Array<string> = [];
    if (Array.isArray(oneOfArray)) {
      oneOfArray.forEach(item => {
        Object.keys(item).forEach(key => {
          tmpArray.push(key);
        });
      });
    }
    return tmpArray;
  }

  setOneOf(prop: string, choice: string) {
    Object.keys(this.structureObject[prop]).forEach(key => {
      if (key == "properties" || key == "required" || key == "enum") {
        delete this.structureObject[prop][key];
      }
    });
    setTimeout(() => {
      this.localFormGroup.removeControl(prop);
      this.localFormGroup.addControl(prop, new FormGroup({}));
      this.structureObject[prop].oneOf.forEach(item => {
        if (item[choice]) {
          Object.keys(item[choice]).forEach(key => {
            this.structureObject[prop][key] = item[choice][key];
          });
        }
      });
    }, 1);
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
    if (checked) {
      this.addObjectToForm(prop);
    } else {
      this.deleteObjectFromForm(prop);
    }
  }

  toggleArray(checked: boolean, prop: string) {
    if (checked) {
      this.addArrayToForm(prop);
    } else {
      this.deleteArrayFromForm(prop);
    }
  }

  getLevelClasses(): any {
    return {
      levelContainer: true, 
      levelBrace: !this.firstLevel
    };
  }
}
