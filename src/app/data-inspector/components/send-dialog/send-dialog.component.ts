import { TopicData } from './../../models/data.interface';
import { TopicSchema } from './../../models/schema.interface';
import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

@Component({
  selector: 'diu-send-dialog',
  templateUrl: './send-dialog.component.html',
  styleUrls: ['./send-dialog.component.css']
})
export class SendDialogComponent implements OnInit {

  private topicSchema: TopicSchema;
  private topicData: TopicData;
  private structureObject: any = undefined;
  private dataObject: any = undefined;
  private requiredFields: Array<string>;
  private submitEmitter: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<SendDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.topicSchema = data.topicSchema;
    this.topicData = data.topicData;
  }

  ngOnInit() {
    if (this.topicSchema.schema && this.topicSchema.schema.properties) {
      this.structureObject = this.topicSchema.schema.properties;
      this.requiredFields = this.topicSchema.schema.required;
      if (this.dataObject) {
        this.dataObject = this.topicData.data;
      }
    }
  }

  sendNewData() {
    this.submitEmitter.emit();
    console.log("SEND");
  }

  onSubmit(event: any) {
    console.log(event);
  }
}