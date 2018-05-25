import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'diu-form-element',
  templateUrl: './form-element.component.html',
  styleUrls: ['./form-element.component.css']
})
export class FormElementComponent implements OnInit {

  @Input() propName: String;
  @Input() type: String;
  @Input() parentFormGroup: FormGroup;
  @Input() options: Array<any>;
  @Input() errorMessage: String;

  constructor() { }

  ngOnInit() { 
  }

}
