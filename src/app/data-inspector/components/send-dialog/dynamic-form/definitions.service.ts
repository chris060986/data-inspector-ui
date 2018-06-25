import { Injectable } from '@angular/core';
import { TopicSchema } from '../../../models/schema.interface';

@Injectable()
export class DefinitionsService {

  definitions: Array<any> = [];

  constructor() { }

  addDefinition(name: string, structureObject:any) {
    if(this.definitions.filter(element => element.name == name).length == 0) {
      this.definitions.push({
        name: name,
        structure: structureObject
      });
    }
  }

  removeDefinition(name: string) {
    this.definitions.filter(element => element.topicName != name);
  }
}
