import { Component, OnInit, Input } from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";

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
    // console.log(this.dataFields);
    // this.localFormGroup.addControl('fields', new FormArray([]))
    console.log(this.dataObject)
    if (this.structureObject) {
      Object.entries(this.structureObject).forEach(([key, val]) => {
        this.allPropertyKeys.push(key);
        switch (val.type) {
          case "string":
          case "integer":
          case "number":
          case "boolean":
            if(this.dataObject && this.dataObject[key]) {
              this.localFormGroup.addControl(key, new FormControl(this.dataObject[key]));
            } else {
              this.localFormGroup.addControl(key, new FormControl());
            }
            this.actLevelForms.push(key);
            break;

          case "object":
            this.localFormGroup.addControl(key, new FormGroup({}));
            this.nextLevelForms.push(key);
            break;

          case "array":
            let tmpFormArray: FormArray = new FormArray([]);
            Object.entries(val).forEach(([key, val]) => {
                tmpFormArray.push(new FormGroup({}));
            });
            this.localFormGroup.addControl(key, tmpFormArray);
            this.arrayForms.push(key);
            break;

          default:
            break;
        }
      });
    }
    // console.log(this.localFormGroup.get('fields').controls);

    //this.extractObjects(this.data, this.objects, this.arrays);

    // this.localFormGroup;
    // this.localFormGroup.addControl('fields', new FormArray([]))
    // this.objects.forEach(object => {
    //   (<FormArray>this.localFormGroup.get('fields')).push((new FormControl(object.value)));
    // });

    // this.arrays.forEach((array, index) => {
    //   this.localFormGroup.addControl(index.toString(),new FormGroup({}))
    // });

    // this.controls.forEach(control => {
    //   (<FormArray>this.localFormGroup.get('unterArray')).push(new FormControl(control.name));
    // })
    // this.localFormGroup.addControl('unterGroup', new FormGroup({
    //   'unterArray' : new FormArray([])
    // }));
  }

  // extractObjects(input: Array<any>, objects: Array<any>, arrays: Array<any>){
  //   input.forEach(element => {
  //     if(Array.isArray(element)){
  //       arrays.push(element);
  //     } else {
  //       objects.push(element);
  //     }
  //   })
  // }
}
