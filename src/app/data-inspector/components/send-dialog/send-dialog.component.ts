import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'diu-send-dialog',
  templateUrl: './send-dialog.component.html',
  styleUrls: ['./send-dialog.component.css']
})
export class SendDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SendDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  sendNewData() {
    console.log("SEND");
  }

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }
}
