const REST: string = "http://";
const WS: string = "ws://";
const baseUrl: string = 'localhost:3000/';

export const ServerURL = {
  websocket: WS + baseUrl + 'websocket',
  topiclist: REST + baseUrl + 'topics'
}
