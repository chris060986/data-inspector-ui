import { Subscription } from 'rxjs';
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { MAT_CHECKBOX_CLICK_ACTION, MatSnackBar } from "@angular/material";
import { TopicSchema } from "../../models/schema.interface";
import { TopicData } from "../../models/data.interface";

@Component({
  selector: "diu-dynamic-form",
  templateUrl: "./dynamic-form.component.html",
  styleUrls: ["./dynamic-form.component.css"],
  providers: [{ provide: MAT_CHECKBOX_CLICK_ACTION, useValue: "check" }]
})
export class DynamicFormComponent implements OnInit, OnDestroy {

  @Input() structureObject: any;
  @Input() dataObject: any;
  @Input() requiredFields: Array<string>;
  @Input() submitEmitter: EventEmitter<any>;
  @Output() dataSubmitted: EventEmitter<any> = new EventEmitter();
  private topLevelForm: FormGroup;
  private subscription: Subscription;

  constructor(public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.subscription = this.submitEmitter.subscribe(() => {
      this.onSubmit();
    });
    this.topLevelForm = new FormGroup({});
  }

  onSubmit() {
    if(this.topLevelForm.valid) {
      this.dataSubmitted.emit(this.topLevelForm.value);
    } else {
      this.dataSubmitted.emit(undefined);
      this.snackBar.open('Form not valid ...', '',{
        duration: 1000
      });
    }
  }

  
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
