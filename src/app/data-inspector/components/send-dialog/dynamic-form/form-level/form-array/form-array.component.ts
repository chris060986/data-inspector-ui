import { Component, OnInit, Input } from "@angular/core";
import { FormArray, FormGroup, FormControl } from "@angular/forms";
import { DuiValidators } from "../../diu-validators";

@Component({
  selector: "diu-form-array",
  templateUrl: "./form-array.component.html",
  styleUrls: ["./form-array.component.css"]
})
export class FormArrayComponent implements OnInit {
  @Input() structureObject: any;
  @Input() localFormArray: FormArray;
  @Input() dataObject: Array<any>;
  @Input() inspectOnly: boolean;
  private fixedArray: boolean;

  constructor() {}

  //Import Error-Message-Function
  private getErrorMessage = DuiValidators.getErrorMessage;

  ngOnInit() {
    if (this.structureObject && this.structureObject.items) {
      if (Array.isArray(this.structureObject.items)) {
        this.fixedArray = true;
        let index: number = -1;
        this.structureObject.items.forEach(item => {
          index++;
          let tmpFormControl: FormControl;
          let currentValidators: Array<any> = [];
          if (item.type == "integer")
            currentValidators.push(DuiValidators.integerValidator);
          if (item.type == "number")
            currentValidators.push(DuiValidators.numberValidator);
          switch (item.type) {
            case "string":
            case "integer":
            case "number":
            case "boolean":
              let value: any;
              if (this.dataObject && this.dataObject[index]) {
                value = this.dataObject[index];
              } else {
                value = undefined;
              }
              if (item.enum && value && !item.enum.includes(value)) {
                value = undefined;
              }
              if (item.type == "boolean" && !value) {
                value = false;
              }
              tmpFormControl = new FormControl(value, currentValidators);
              if(this.inspectOnly) {
                tmpFormControl.disable();
              }
              this.localFormArray.push(tmpFormControl);
              break;

            case "object":
              this.localFormArray.push(new FormGroup({}));
              break;

            default:
              break;
          }
        });
      } else {
        this.fixedArray = false;
        if (this.structureObject.items.type && this.dataObject) {
          this.dataObject.forEach(value => {
            this.addObjectToForm(value);
          });
        }
      }
    }
  }

  deleteObjectFromForm(index: number) {
    this.localFormArray.removeAt(index);
  }

  addObjectToForm(value: any) {
    let currentValidators: Array<any> = [];
    if (this.structureObject.items.type == "integer")
      currentValidators.push(DuiValidators.integerValidator);
    if (this.structureObject.items.type == "number")
      currentValidators.push(DuiValidators.numberValidator);
    switch (this.structureObject.items.type) {
      case "string":
      case "integer":
      case "number":
      case "boolean":
        if (
          this.structureObject.items.enum &&
          !this.structureObject.items.enum.includes(value)
        ) {
          value = undefined;
        }
        if (this.structureObject.items.type == "boolean" && !value) {
          value = false;
        }
        let tmpFormControl: FormControl = new FormControl(
          value,
          currentValidators
        );
        this.localFormArray.push(tmpFormControl);
        break;

      case "object":
        this.localFormArray.push(new FormGroup({}));
        break;

      default:
        break;
    }
  }

  addEmtpyObjectToForm() {
    this.addObjectToForm(undefined);
  }

  getArrayData(data: Array<any>, index: number): any {
    if (data) {
      return data[index];
    } else {
      return undefined;
    }
  }
}
