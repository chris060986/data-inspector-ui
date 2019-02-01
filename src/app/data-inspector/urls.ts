import { environment } from './../../environments/environment';

export const ServerURL = {
  websocket: environment.wsBaseUrl + 'websocket',
  datatypes: environment.serviceBaseUrl + 'datatypes',
  datastructure: environment.serviceBaseUrl + 'datastructures'
}
