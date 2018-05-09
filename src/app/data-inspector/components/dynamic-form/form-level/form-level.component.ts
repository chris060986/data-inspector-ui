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
            if(this.dataObject && this.dataObject[key]) {
              if(this.requiredFields && this.requiredFields.includes(key)) {
                tmpFormControl = new FormControl(this.dataObject[key], [Validators.required]);
              } else {
                tmpFormControl = new FormControl(this.dataObject[key]);
              }
            } else {
              tmpFormControl = new FormControl();
            }
            this.localFormGroup.addControl(key, tmpFormControl);
            this.actLevelForms.push(key);
            break;

          case "object":
            this.localFormGroup.addControl(key, new FormGroup({}));
            this.nextLevelForms.push(key);
            break;

          case "array":
            console.log(val)
            let tmpFormArray: FormArray = new FormArray([]);
            let i = 0;
            val.items.forEach((items) => {
              if(items.type == 'object'){
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

}
