import { Component, OnInit } from '@angular/core';
import { ListViewService } from './list-view.service';
import * as _ from 'underscore';

@Component({
  selector: 'diu-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {
  private allTopics: Array<String> = [];
  private subscribedTopics: Array<String> = [];
  private publishingTopics: Array<String> = [];
  private registeredTopics: Array<String> = [];
  private topicSchemas: Array<any> = [];
  private currentTopic: String;

  constructor(private listViewService: ListViewService) { }

  ngOnInit() {
    this.listViewService.allTopicsEmitter.subscribe((data: Array<String>) => {
      this.allTopics = data;
    });
    this.listViewService.subscribedTopicsEmitter.subscribe((data: Array<String>) => {
      this.subscribedTopics = data;
    });
    this.listViewService.publishingTopicsEmitter.subscribe((data: Array<String>) => {
      this.publishingTopics = data;
    });
    this.listViewService.registeredTopicsEmitter.subscribe((data: Array<String>) => {
      this.registeredTopics = data;
    });
    this.listViewService.topicSchemasEmitter.subscribe((data: Array<any>) => {
      this.topicSchemas = data;
      console.log(this.topicSchemas);
    });
  }

  subscribeTopic(topic: String) {
    this.listViewService.subscribeTopicWS(topic);
  }

  unsubscribeTopic(topic: String) {
    this.listViewService.unsubscribeTopicWS(topic);

  }

  publishTopic(topic: String) {
    this.listViewService.publishTopicWS(topic);
  }

  unpublishTopic(topic: String) {
    this.listViewService.unpublishTopicWS(topic);
  }

  listData(topic: String) {
    if(!this.currentTopic || this.currentTopic != topic) {
      this.currentTopic = topic;
    } else if(this.currentTopic && this.currentTopic == topic) {
      this.currentTopic = undefined;
    }
  }

  getSelectedClass(topic: String): any {
    return {
      'isSelected': this.currentTopic == topic ? true : false
    };
  }

  // openDialog(item): void {
  //   let dialogRef = this.dialog.open(InspectDialogComponent, {
  //     width: '90vw',
  //     data: {
  //       name: item
  //     }
  //   });
  // }
}
