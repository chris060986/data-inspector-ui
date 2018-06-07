import { WarnSnackComponent } from './../snackbars/warn-snack/warn-snack.component';
import { Subscription } from 'rxjs';
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, OnChanges, AfterViewChecked } from "@angular/core";
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
export class DynamicFormComponent implements OnInit, AfterViewChecked {
  @Input() structureObject: any;
  @Input() dataObject: any;
  @Input() requiredFields: Array<string>;
  @Input() submitEmitter: EventEmitter<any>;
  @Output() dataSubmitted: EventEmitter<any> = new EventEmitter();
  private topLevelForm: FormGroup = new FormGroup({});
  private subscription: Subscription;

  constructor(public snackBar: MatSnackBar) { }

  ngOnInit() {

  }

  ngAfterViewChecked() {
     this.subscription = this.submitEmitter.subscribe(() => {
      this.onSubmit();
    });
  }

  onSubmit() {
    if(this.topLevelForm.valid) {
      this.dataSubmitted.emit(this.topLevelForm.value);
      this.snackBar.open('Data submitted ...','',{
        duration: 1000
      });
    } else {
      this.dataSubmitted.emit(undefined);
      this.snackBar.openFromComponent(WarnSnackComponent,{
        duration: 1000
      });
    }
  }

  
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
