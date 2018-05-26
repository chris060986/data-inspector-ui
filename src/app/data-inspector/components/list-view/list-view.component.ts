import { Component, OnInit } from '@angular/core';
import { ListViewService } from './list-view.service';

@Component({
  selector: 'diu-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.css']
})
export class ListViewComponent implements OnInit {
  dataList = [];
  details;

  constructor(private listViewService: ListViewService) { }

  ngOnInit() {
    this.listViewService.getDataList().subscribe((data: Array<any>) => {
      this.dataList = data;
    });
  }

  onStructureClick(data){
    this.listViewService.getDataStructure(data.name).subscribe(response => {
      console.log(response);
      this.details = JSON.stringify(response);
    });
  }
}
