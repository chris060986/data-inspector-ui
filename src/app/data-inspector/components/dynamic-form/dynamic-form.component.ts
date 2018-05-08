import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {MAT_CHECKBOX_CLICK_ACTION} from '@angular/material';

@Component({
  selector: 'diu-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
  providers: [
    {provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check'}
  ]
})
export class DynamicFormComponent implements OnInit {
  myForm: FormGroup;

  hobbies = [
    {
      name: 'Cooking',
      duration: 2
    },
    {
      name: 'Testing',
      duration: 2
    }
  ];

  jsonData = [
    {
      label: 'element1',
      type: 'checkbox',
      value: true
    },
    {
      label: 'element2',
      type: 'text',
      value: 'value2'
    },
    [
      {
        label: 'element3',
        type: 'text',
        value: 'value3'
      },
      {
        label: 'element4',
        type: 'text',
        value: 'value4'
      },
      [
        {
          label: 'element5',
          type: 'text',
          value: 'value5'
        },
        {
          label: 'element6',
          type: 'text',
          value: 'value6'
        },
      ]
    ]
  ];

  objects = [];
  arrays = [];

  constructor() {
  }

  logAttribute(objects : Array<any>) {
    objects.forEach(object => {
      if(Array.isArray(object)){
        this.logAttribute(object);
      } else {
        console.log(object);
      }
    })
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

  ngOnInit() {
    console.log(this.jsonData);
    console.log('-------------');
    this.logAttribute(this.jsonData);
    this.extractObjects(this.jsonData, this.objects, this.arrays);

    this.myForm = new FormGroup({});
    this.myForm.addControl('fields', new FormArray([]))
    this.objects.forEach(object => {
      (<FormArray>this.myForm.get('fields')).push((new FormControl(object.value)));
    });

    this.arrays.forEach((array, index) => {
      this.myForm.addControl(index.toString(),new FormGroup({}))
    });


    /*this.myForm = new FormGroup({
      'name': new FormControl('Andreas'),
      'hobbies': new FormArray([]),
      'unterGroup': new FormGroup({
        'unterArray': new FormArray([])
      })
    });
    this.hobbies.forEach(hobby => {
      (<FormArray>this.myForm.get('hobbies')).push(new FormControl(hobby.name));
    });*/

  }

  onSubmit() {
    console.log(this.myForm);
  }

  onNewHobby() {
    (<FormArray>this.myForm.get('hobbies')).push(new FormControl(''));
  }

}