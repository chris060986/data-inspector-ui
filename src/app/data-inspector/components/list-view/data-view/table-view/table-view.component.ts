import {
  Component,
  OnInit,
  ViewChild,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter
} from "@angular/core";
import { MatTableDataSource, MatSort } from "@angular/material";
import { TopicData } from "../../../../models/data.interface";

@Component({
  selector: "diu-table-view",
  templateUrl: "./table-view.component.html",
  styleUrls: ["./table-view.component.css"]
})
export class TableViewComponent implements OnInit, OnChanges {
  @Input() data: Array<TopicData>;
  @Input() primaryKey: string;
  @Input() topicName: string;
  @Output() dataSelected: EventEmitter<any> = new EventEmitter();

  displayedColumns: Array<string>;
  selectedColumns: Array<string>;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  @ViewChild(MatSort) sort: MatSort;


  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.selectedColumns = this.displayedColumns;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const tableData: Array<any> = [];
    this.data.forEach((topicData: TopicData) => {
      let convertedData: any = new Object();
      convertedData['_rawData'] = topicData.data;
      this.extractAttributes(convertedData, topicData.data, '');
      tableData.push(convertedData);
    });
    if(changes.topicName) {
      if (tableData[0]) {
        this.displayedColumns = [];
        Object.keys(tableData[0]).forEach(key => {
          if (typeof tableData[0][key] !== 'object') {
            this.displayedColumns.push(key);
          }
        });
        if(this.primaryKey && this.displayedColumns.includes(this.primaryKey)) {
          this.displayedColumns = this.displayedColumns.filter(element => element != this.primaryKey);
          this.displayedColumns.unshift(this.primaryKey);
        }
      }
      this.selectedColumns = this.displayedColumns;
    }
    
    this.dataSource.data = tableData;
  }

  selectData(data: any) {
    this.dataSelected.emit(data);
  }

  extractAttributes(objectToFill: any, data: any, prefix: string) {
    Object.keys(data).forEach(key => {
      if(typeof data[key] !== 'object') {
        objectToFill[prefix + key] = data[key];
      } else if (!Array.isArray(data[key])) {
        let nextPrefix: string = prefix + key + '-';
        this.extractAttributes(objectToFill, data[key], nextPrefix);
      }
    });
  } 
}
