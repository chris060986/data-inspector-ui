import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'diu-form-element',
  templateUrl: './form-element.component.html',
  styleUrls: ['./form-element.component.css']
})
export class FormElementComponent implements OnInit {

  @Input() propName: string;
  @Input() type: string;
  @Input() parentFormGroup: FormGroup;
  @Input() options: Array<any>;
  @Input() errorMessage: string;
  @Input() required: boolean = false;

  constructor() { }

  ngOnInit() { 
  }

  getAppearance(): string {
    return this.required ? "outline" : "fill";
  }

  getLabel(): string {
    return this.required ? this.propName+ " *" : this.propName;
  }
}
