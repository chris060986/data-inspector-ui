import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { TopicData } from '../../../models/data.interface';

@Component({
  selector: 'diu-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})
export class TableViewComponent implements OnInit, OnChanges {

  @Input() data: Array<TopicData>;

  displayedColumns = ['id', 'timestamp'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const tableData: Array<any> = [];
    this.data.forEach((topicData: TopicData) => {
      tableData.push(topicData.data);
    });
    this.dataSource = new MatTableDataSource(tableData);
    this.dataSource.sort = this.sort;
  }
}