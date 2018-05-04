import { Component, OnInit } from '@angular/core';
import {FullListService} from './full-list.service';

@Component({
  selector: 'diu-full-list',
  templateUrl: './full-list.component.html',
  styleUrls: ['./full-list.component.css']
})
export class FullListComponent implements OnInit {

  dataList = [];

  constructor(private fullListService: FullListService) { }

  ngOnInit() {
    this.fullListService.getDataList().subscribe((data: Array<any>) => {
      this.dataList = data;
    });
  }

}
