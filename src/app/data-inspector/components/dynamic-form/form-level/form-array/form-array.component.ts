import { Component, OnInit, Input } from "@angular/core";
import { FormArray, FormGroup } from "@angular/forms";

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

  ngOnInit() {
    console.log(this.structureObject, this.localFormArray, this.dataObject);
    if (this.structureObject && this.structureObject.items) {
      if (Array.isArray(this.structureObject.items)) {
        this.fixedArray = true;
        this.structureObject.items.forEach(items => {
          switch (items.type) {
            case "string":
            case "integer":
            case "number":
            case "boolean":
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
  }

  getArrayData(data: Array<any>, index: number): any {
    if (data) {
      return data[index];
    } else {
      return undefined;
    }
  }
}
