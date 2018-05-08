const REST: string = "http://";
const WS: string = "ws://";
const baseUrl: string = 'localhost:3000/';

export const ServerURL = {
  websocket: WS + baseUrl + 'websocket',
  datatypes: REST + baseUrl + 'datatypes',
  datastructure: REST + baseUrl + 'datastructure'
}
