import { TopicData } from './../../../models/data.interface';
import { Component, OnInit, Input, OnChanges, ViewChild } from "@angular/core";
import { TopicSchema } from "../../../models/schema.interface";
import * as _ from 'underscore';
import { MatDialog } from "@angular/material";
import { SendDialogComponent } from "../../send-dialog/send-dialog.component";

@Component({
  selector: "diu-data-view",
  templateUrl: "./data-view.component.html",
  styleUrls: ["./data-view.component.css"]
})
export class DataViewComponent implements OnInit, OnChanges {

  @Input() topicSchema: TopicSchema;
  @Input() topicData: Array<TopicData>;
  @Input() inspectOnly: boolean = false;
  private topicName: string;
  private topicInstances: Array<TopicData> = [];

  constructor(public dialog: MatDialog) {

  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.topicSchema) {
      this.topicName = this.topicSchema.topicName;
      const primaryKey: any = this.topicSchema.schema.primary;
      let primaryKeys: Array<any> = [];
      this.topicData.forEach((data: TopicData) => {
        const tmpKey = data.data[primaryKey];
        if (!primaryKeys.includes(tmpKey)) {
          primaryKeys.push(tmpKey);
        }
      });
      this.topicInstances = [];
      primaryKeys.forEach((key) => {
        this.topicInstances.push(_.sortBy(this.topicData.filter(element => element.data[primaryKey] == key), 'timestamp').pop());
      });
    } else {
      this.topicName = undefined;
    }
  }

  sendWithData(data: any) {
    const topicData = JSON.parse(JSON.stringify(data));
    if (this.topicSchema) {
      let dialogRef = this.dialog.open(SendDialogComponent, {
        width: '60vw',
        data: {
          topicSchema: Object.create(this.topicSchema),
          topicData: {
            topicName: '',
            data: topicData
          },
          inspectOnly: this.inspectOnly
        }
      });
    }
  }
}