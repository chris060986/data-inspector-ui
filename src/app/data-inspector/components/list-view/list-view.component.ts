import { Component, OnInit, OnDestroy } from '@angular/core';
import * as _ from 'underscore';
import { TopicSchema } from '../../models/schema.interface';
import { DataService } from './../../data/data.service';
import { Subscription } from 'rxjs';
import { TopicData } from '../../models/data.interface';
import { SendDialogComponent } from '../send-dialog/send-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'diu-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit, OnDestroy {
  private subscriptions: Array<Subscription> = [];
  private allTopics: Array<string> = [];
  private subscribedTopics: Array<string> = [];
  private publishingTopics: Array<string> = [];
  private registeredTopics: Array<string> = [];
  private topicSchemas: Array<TopicSchema> = [];
  private topicData: Array<TopicData> = [];
  private currentTopic: string;
  private currentTopicSchema: TopicSchema;
  private currentTopicData: Array<TopicData> = [];


  constructor(private dataService: DataService, public dialog: MatDialog) { }

  ngOnInit() {
    this.subscriptions.push(this.dataService.allTopicsEmitter.subscribe((data: Array<string>) => {
      this.allTopics = data;
    }));
    this.subscriptions.push(this.dataService.subscribedTopicsEmitter.subscribe((data: Array<string>) => {
      this.subscribedTopics = data;
    }));
    this.subscriptions.push(this.dataService.publishingTopicsEmitter.subscribe((data: Array<string>) => {
      this.publishingTopics = data;
    }));
    this.subscriptions.push(this.dataService.registeredTopicsEmitter.subscribe((data: Array<string>) => {
      this.registeredTopics = data;
    }));
    this.subscriptions.push(this.dataService.topicSchemasEmitter.subscribe((data: Array<TopicSchema>) => {
      this.topicSchemas = data;
    }));
    this.subscriptions.push(this.dataService.topicDataEmitter.subscribe((data: Array<TopicData>) => {
      this.topicData = data;
      if (this.currentTopic) {
        const tmpData: Array<TopicData> = this.topicData.filter(element => element.topicName == this.currentTopic);
        if (this.currentTopicData.length != tmpData.length) {
          this.currentTopicData = tmpData;
        }
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  subscribeTopic(topic: string) {
    this.dataService.subscribeTopicWS(topic);
  }

  unsubscribeTopic(topic: string) {
    this.dataService.unsubscribeTopicWS(topic);
    if (this.currentTopic && this.currentTopic == topic) {
      this.currentTopic = undefined;
      this.currentTopicSchema = undefined;
    }
  }

  publishTopic(topic: string) {
    this.dataService.publishTopicWS(topic);
  }

  unpublishTopic(topic: string) {
    this.dataService.unpublishTopicWS(topic);
  }

  listData(topic: string) {
    if (!this.currentTopic || this.currentTopic != topic) {
      this.currentTopic = topic;
      this.currentTopicSchema = this.topicSchemas.filter(element => element.topicName == this.currentTopic)[0];
      this.currentTopicData = this.topicData.filter(element => element.topicName == this.currentTopic);
    } else if (this.currentTopic && this.currentTopic == topic) {
      this.currentTopic = undefined;
      this.currentTopicSchema = undefined;
      this.currentTopicData = [];
    }
  }

  getSelectedClass(topic: string): any {
    return {
      'isSelected': this.currentTopic == topic ? true : false
    };
  }

  getDataToggleColor(topic): string {
    if (this.topicData.filter(element => element.topicName == topic).length % 2 == 1) {
      return 'primary';
    } else {
      return 'accent';
    }
  }

  sendWithoutData(topic: string) {
    const schema: TopicSchema = this.topicSchemas.filter(element => element.topicName == topic).pop();
    if(schema) {
      this.dialog.open(SendDialogComponent, {
        width: '60vw',
        data: {
          topicSchema: Object.create(schema),
          topicData: undefined
        }
      });
    }
  }
}
