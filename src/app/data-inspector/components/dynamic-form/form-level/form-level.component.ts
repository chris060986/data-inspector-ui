import { Component, OnInit, Input} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';


@Component({
  selector: 'diu-form-level',
  templateUrl: './form-level.component.html',
  styleUrls: ['./form-level.component.css']
})
export class FormLevelComponent implements OnInit {

  @Input() localFormGroup : FormGroup;
  @Input() data : Array<any>;
  objects = [];
  arrays = [];

  constructor() { }

  ngOnInit() {
    this.extractObjects(this.data, this.objects, this.arrays);

    this.localFormGroup = new FormGroup({});
    this.localFormGroup.addControl('fields', new FormArray([]))
    this.objects.forEach(object => {
      (<FormArray>this.localFormGroup.get('fields')).push((new FormControl(object.value)));
    });

    this.arrays.forEach((array, index) => {
      this.localFormGroup.addControl(index.toString(),new FormGroup({}))
    });

    // this.controls.forEach(control => {
    //   (<FormArray>this.localFormGroup.get('unterArray')).push(new FormControl(control.name));
    // })
    // this.localFormGroup.addControl('unterGroup', new FormGroup({
    //   'unterArray' : new FormArray([])
    // }));
  }

  extractObjects(input: Array<any>, objects: Array<any>, arrays: Array<any>){
    input.forEach(element => {
      if(Array.isArray(element)){
        arrays.push(element);
      } else {
        objects.push(element);
      }
    })
  }

}
