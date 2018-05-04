import { Injectable } from '@angular/core';
import {ServerURL} from '../../urls';
import {HttpClient} from '@angular/common/http';
import {WebsocketService} from '../../websocket/websocket.service';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class FullListService {

  private socket: Subject<any>;
  constructor(private http: HttpClient,
              private websocketService: WebsocketService) {
    this.socket = websocketService.createWebsocket();
    this.socket.subscribe(message => {
      console.log(message);
    });

    setTimeout(() => {
      this.socket.next('test');
    }, 2000);
  }

  getDataList() {
    return this.http.get(ServerURL.topiclist);
  }


}
