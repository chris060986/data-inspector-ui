import { Injectable, EventEmitter } from "@angular/core";
import { Subject, Observable, Subscription } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { WebsocketService } from "../websocket/websocket.service";
import { ServerURL } from "../urls";
import * as _ from "underscore";
import { TopicSchema } from "../models/schema.interface";
import { TopicData } from "../models/data.interface";

@Injectable({
  providedIn: "root"
})
export class DataService {
  private socket: Subject<any>;
  private subscriptions: Array<Subscription> = [];
  public shouldBeConnected: boolean = false;
  public allTopics: Array<string> = [];
  public allTopicsEmitter: EventEmitter<Array<string>> = new EventEmitter();
  public topicSchemas: Array<TopicSchema> = [];
  public topicSchemasEmitter: EventEmitter<
    Array<TopicSchema>
  > = new EventEmitter();
  public subscribedTopics: Array<string> = [];
  public subscribedTopicsEmitter: EventEmitter<
    Array<string>
  > = new EventEmitter();
  public publishingTopics: Array<string> = [];
  public publishingTopicsEmitter: EventEmitter<
    Array<string>
  > = new EventEmitter();
  public registeredTopics: Array<string> = [];
  public registeredTopicsEmitter: EventEmitter<
    Array<string>
  > = new EventEmitter();
  public topicData: Array<TopicData> = [];
  public topicDataEmitter: EventEmitter<Array<TopicData>> = new EventEmitter();

  constructor(
    private http: HttpClient,
    private websocketService: WebsocketService
  ) {
    this.getDatatypesHTTP().subscribe(
      (response: Array<string>) => {
        this.allTopics = _.sortBy(response);
        this.allTopicsEmitter.emit(this.allTopics);
      },
      err => {
        this.allTopics = [];
        this.allTopicsEmitter.emit(this.allTopics);
      }
    );
  }

  getDatatypesHTTP(): Observable<any> {
    return this.http.get(ServerURL.datatypes);
  }

  getDataStructureHTTP(name: string): Observable<any> {
    return this.http.get(ServerURL.datastructure + "/" + name);
  }

  checkSchemaAvailable(topic: string) {
    if (
      this.topicSchemas.filter(element => element.topicName == topic).length ==
      0
    ) {
      this.getDataStructureHTTP(topic).subscribe(
        response => {
          this.topicSchemas.push({
            topicName: topic,
            schema: response
          });
          this.topicSchemasEmitter.emit(this.topicSchemas);
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  subscribeTopicWS(name: string) {
    this.checkOpenWS();
    this.checkSchemaAvailable(name);
    setTimeout(() => {
      if (!this.subscribedTopics.includes(name)) {
        this.socket.next({
          type: "SUBSCRIBE",
          topicName: name
        });

        this.subscribedTopics.push(name);
        this.mergeRegisteredTopics();
        this.emitAll();
      }
    }, 400);
  }

  publishTopicWS(name: string) {
    this.checkOpenWS();
    this.checkSchemaAvailable(name);
    setTimeout(() => {
      if (!this.publishingTopics.includes(name)) {
        this.socket.next({
          type: "PUBLISH",
          topicName: name
        });
  
        this.publishingTopics.push(name);
        this.emitAll();
      }
    }, 400);
  }

  unsubscribeTopicWS(name: string) {
    this.subscribedTopics = this.subscribedTopics.filter(
      element => element != name
    );
    this.socket.next({
      type: "UNSUBSCRIBE",
      topicName: name
    });
    this.topicData = this.topicData.filter(element => element.topicName != name);
    this.emitAll();
    this.checkCloseWS();
  }

  unpublishTopicWS(name: string) {
    this.publishingTopics = this.publishingTopics.filter(
      element => element != name
    );
    this.socket.next({
      type: "UNPUBLISH",
      topicName: name
    });
    this.emitAll();
    this.checkCloseWS();
  }

  sendDataToWS(name: string, topicData: any) {
    this.socket.next({
      type: 'NEWDATA',
      topicName: name,
      data: topicData
    });
  }

  mergeRegisteredTopics() {
    this.registeredTopics = _.union(
      this.subscribedTopics,
      this.publishingTopics
    );
    this.registeredTopics = _.sortBy(this.registeredTopics);
  }

  emitAll(): any {
    this.mergeRegisteredTopics();
    this.subscribedTopicsEmitter.emit(this.subscribedTopics);
    this.publishingTopicsEmitter.emit(this.publishingTopics);
    this.registeredTopicsEmitter.emit(this.registeredTopics);
    this.topicDataEmitter.emit(this.topicData);
  }

  checkOpenWS() {
    if (this.registeredTopics.length == 0 && !this.shouldBeConnected) {
      this.shouldBeConnected = true;
      this.socket = this.websocketService.createWebsocket();
      this.subscriptions.push(
        this.socket.subscribe(message => {
          try {
            this.procceedMessage(JSON.parse(message.data));
          } catch (error) {}
        })
      );
      console.log("Websocket connected ...");
    }
  }

  checkCloseWS() {
    if (this.registeredTopics.length == 0 && this.shouldBeConnected) {
      this.shouldBeConnected = false;
      this.socket = undefined;
      this.subscriptions.forEach((subscription: Subscription) => {
        subscription.unsubscribe();
      });
      console.log("Websocket disconnected ...");
    }
  }

  procceedMessage(message: any) {
    if (message.topicName && message.data) {
      this.topicData.push({
        topicName: message.topicName,
        data: message.data
      });
      this.topicDataEmitter.emit(this.topicData);
    }
  }
}
