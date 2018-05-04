import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'diu-data-inspector',
  templateUrl: './data-inspector.component.html',
  styleUrls: ['./data-inspector.component.css']
})
export class DataInspectorComponent implements OnInit {

  isExpanded: boolean = false;
  repeater: Array<any> = [1, 2, 3, 4, 5, 6, 7];

  constructor() { }

  ngOnInit() {
  }

  expandAll(){
    this.isExpanded = true;
  }

  foldAll() {
    this.isExpanded = false;
  }
}
