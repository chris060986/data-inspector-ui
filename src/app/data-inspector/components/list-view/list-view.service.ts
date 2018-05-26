import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { WebsocketService } from '../../websocket/websocket.service';
import { ServerURL } from '../../urls';

@Injectable({
  providedIn: 'root'
})
export class ListViewService {
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

  getDataList(): Observable<any> {
    return this.http.get(ServerURL.datatypes);
  }

  getDataStructure(name: String): Observable<any> {
    return this.http.get(ServerURL.datastructure+"/"+name);
  }
}
