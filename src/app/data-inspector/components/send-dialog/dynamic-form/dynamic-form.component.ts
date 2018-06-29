import { WarnSnackComponent } from './../../others/warn-snack/warn-snack.component';
import { Subscription } from 'rxjs';
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MAT_CHECKBOX_CLICK_ACTION, MatSnackBar } from "@angular/material";
import { DefinitionsService } from './definitions.service';

@Component({
  selector: "diu-dynamic-form",
  templateUrl: "./dynamic-form.component.html",
  styleUrls: ["./dynamic-form.component.css"],
  providers: [
    { provide: MAT_CHECKBOX_CLICK_ACTION, useValue: "check" },
    DefinitionsService
  ]
})
export class DynamicFormComponent implements OnInit {
  @Input() structureObject: any;
  @Input() dataObject: any;
  @Input() definitions: any;
  @Input() requiredFields: Array<string>;
  @Input() submitEmitter: EventEmitter<any>;
  @Input() inspectOnly: boolean;
  @Output() dataSubmitted: EventEmitter<any> = new EventEmitter();
  private topLevelForm: FormGroup = new FormGroup({});
  private subscription: Subscription;

  constructor(public snackBar: MatSnackBar, private definitionsService: DefinitionsService) { }

  ngOnInit() {
     this.subscription = this.submitEmitter.subscribe(() => {
      this.onSubmit();
    });
    if(this.definitions) {
      Object.keys(this.definitions).forEach(key => {
        if(this.definitions[key]) {
          this.definitionsService.addDefinition(key, this.definitions[key]);
        }
      })
    }
  }

  onSubmit() {
    if(this.inspectOnly){
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
  }

  
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
