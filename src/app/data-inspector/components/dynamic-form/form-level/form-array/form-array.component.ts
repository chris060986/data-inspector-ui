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
  private fixedArray: boolean;

  constructor() {}

  //Import Error-Message-Function
  private getErrorMessage = DuiValidators.getErrorMessage;

  ngOnInit() {
    if (this.structureObject && this.structureObject.items) {
      if (Array.isArray(this.structureObject.items)) {
        this.fixedArray = true;
        let index: number = -1
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
              if (
                item.enum &&
                this.dataObject[index] &&
                !item.enum.includes(this.dataObject[index])
              ) {
                this.dataObject[index] = undefined;
              }
              if (this.dataObject && this.dataObject[index]) {
                tmpFormControl = new FormControl(
                  this.dataObject[index],
                  currentValidators
                );
              } else {
                tmpFormControl = new FormControl(undefined, currentValidators);
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
        if (this.structureObject.items.type) {
          switch (this.structureObject.items.type) {
            case "string":
            case "integer":
            case "number":
            case "boolean":
              break;

            case "object":
              break;

            default:
              break;
          }
        }
      }
    }
    console.log(this.structureObject, this.localFormArray, this.dataObject);

  }

  getArrayData(data: Array<any>, index: number): any {
    if (data) {
      return data[index];
    } else {
      return undefined;
    }
  }
}
