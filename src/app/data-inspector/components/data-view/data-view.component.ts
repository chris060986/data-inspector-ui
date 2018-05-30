import { Component, OnInit, Input, OnChanges, SimpleChanges } from "@angular/core";
import { TopicData } from "../../models/data.interface";
import { TopicSchema } from "../../models/schema.interface";

@Component({
  selector: "diu-data-view",
  templateUrl: "./data-view.component.html",
  styleUrls: ["./data-view.component.css"]
})
export class DataViewComponent implements OnInit, OnChanges {

  @Input() topicSchema: TopicSchema;
  @Input() topicData: Array<TopicData>;

  ngOnInit() {
    console.log(this.topicSchema, this.topicData);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.topicSchema, this.topicData);
  }
}