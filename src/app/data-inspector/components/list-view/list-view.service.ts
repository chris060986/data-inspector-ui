import { Injectable, EventEmitter } from "@angular/core";
import { Subject, Observable, Subscription } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { WebsocketService } from "../../websocket/websocket.service";
import { ServerURL } from "../../urls";
import * as _ from "underscore";

@Injectable({
  providedIn: "root"
})
export class ListViewService {
  private socket: Subject<any>;
  private subscriptions: Array<Subscription> = [];
  public shouldBeConnected: boolean = false;
  public allTopics: Array<String> = [];
  public allTopicsEmitter: EventEmitter<Array<String>> = new EventEmitter();
  public topicSchemas: Array<any> = [];
  public topicSchemasEmitter: EventEmitter<Array<any>> = new EventEmitter();
  public subscribedTopics: Array<String> = [];
  public subscribedTopicsEmitter: EventEmitter<
    Array<String>
  > = new EventEmitter();
  public publishingTopics: Array<String> = [];
  public publishingTopicsEmitter: EventEmitter<
    Array<String>
  > = new EventEmitter();
  public registeredTopics: Array<String> = [];
  public registeredTopicsEmitter: EventEmitter<
    Array<String>
  > = new EventEmitter();

  constructor(
    private http: HttpClient,
    private websocketService: WebsocketService
  ) {
    this.getDatatypesHTTP().subscribe(
      (response: Array<String>) => {
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

  getDataStructureHTTP(name: String): Observable<any> {
    return this.http.get(ServerURL.datastructure + "/" + name);
  }

  checkSchemaAvailable(topic: String) {
    if (
      this.topicSchemas.filter(element => element.name == topic).length == 0
    ) {
      this.getDataStructureHTTP(topic).subscribe(
        response => {
          this.topicSchemas.push({
            name: topic,
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

  subscribeTopicWS(name: String) {
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
    }, 200);
  }

  publishTopicWS(name: String) {
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
    }, 200);
  }

  unsubscribeTopicWS(name: String) {
    this.subscribedTopics = this.subscribedTopics.filter(
      element => element != name
    );
    this.socket.next({
      type: "UNSUBSCRIBE",
      topicName: name
    });
    this.emitAll();
    this.checkCloseWS();
  }

  unpublishTopicWS(name: String) {
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
  }

  checkOpenWS() {
    if (this.registeredTopics.length == 0 && !this.shouldBeConnected) {
      this.shouldBeConnected = true;
      this.socket = this.websocketService.createWebsocket();
      this.subscriptions.push(
        this.socket.subscribe(message => {
          console.log(message);
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
}
