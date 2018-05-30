import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild } from "@angular/core";
import { TopicData } from "../../models/data.interface";
import { TopicSchema } from "../../models/schema.interface";
import * as _ from 'underscore';

@Component({
  selector: "diu-data-view",
  templateUrl: "./data-view.component.html",
  styleUrls: ["./data-view.component.css"]
})
export class DataViewComponent implements OnInit, OnChanges {

  topicName: string;
  @Input() topicSchema: TopicSchema;
  @Input() topicData: Array<TopicData>;
  private topicInstances: Array<TopicData> = [];

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.topicSchema) {
      this.topicName = this.topicSchema.topicName;
      const primaryKey: any = this.topicSchema.schema.primary;
      let primaryKeys: Array<any> = [];
      this.topicData.forEach((data: TopicData) => {
        const tmpKey = data.data[primaryKey];
        if(!primaryKeys.includes(tmpKey)) {
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
}