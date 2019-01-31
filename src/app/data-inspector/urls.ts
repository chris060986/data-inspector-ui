import { environment } from './../../environments/environment';

const REST: string = "http://";
const WS: string = "ws://";
const baseUrl: string = environment.serviceBaseUrl;

export const ServerURL = {
  websocket: WS + baseUrl + 'websocket',
  datatypes: REST + baseUrl + 'datatypes',
  datastructure: REST + baseUrl + 'datastructures'
}
