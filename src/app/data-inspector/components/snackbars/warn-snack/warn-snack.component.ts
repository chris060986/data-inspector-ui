import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'diu-warn-snack',
  template: '<button mat-button color="warn">Form not valid ...</button>',
})
export class WarnSnackComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
