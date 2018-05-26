import { Component, OnInit } from '@angular/core';
import { ListViewService } from './list-view.service';

@Component({
  selector: 'diu-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {  
  allTopics: Array<String> = [];
  subscribedTopics: Array<String> = [];
  topicInstances: Array<String> = [];
  currentTopic: String;

  constructor(private listViewService: ListViewService) { }

  ngOnInit() {
    this.listViewService.getDatatypes().subscribe((data: Array<String>) => {
      this.allTopics = data
    });
    // this.listViewService.getDataStructure(data.name).subscribe(response => {
    //   console.log(response);
    //   this.details = JSON.stringify(response);
    // });
  }

  subscribeTopic(topic: String) {
    if(!this.subscribedTopics.includes(topic)){
      this.subscribedTopics.push(topic);
    } 
  }

  unSubscribeTopic(topic: String) {
    this.subscribedTopics = this.subscribedTopics.filter(element => element != topic);
  }

  inspectTopic(topic: String){
    if(!this.currentTopic || this.currentTopic != topic) {
      this.currentTopic = topic;
      this.buildInstanceList();
    }
  }

  buildInstanceList() {
    this.topicInstances.splice(0, this.topicInstances.length);
    for (let index = 1; index < 21; index++) {
      this.topicInstances.push(this.currentTopic + " Instance "+index.toString());
    }
  }

  // openDialog(item): void {
  //   let dialogRef = this.dialog.open(InspectDialogComponent, {
  //     width: '90vw',
  //     data: {
  //       name: item
  //     }
  //   });
  // }
}
