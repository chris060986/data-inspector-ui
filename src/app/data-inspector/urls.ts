import { environment } from './../../environments/environment';

const REST: string = "http://";
const WS: string = "ws://";
const baseUrl: string = environment.serviceBaseUrl;

export const ServerURL = {
  websocket: WS + baseUrl + 'websocket',
  datatypes: baseUrl + 'datatypes',
  datastructure: baseUrl + 'datastructures'
}
