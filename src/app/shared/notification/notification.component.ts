import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
export class Notification {
   industry;
   country;
   duration;
}
@Component({
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  data: any;
  notification: Notification;
  constructor(public dialogRef: MatDialogRef<NotificationComponent>
              , @Inject(MAT_DIALOG_DATA) matData) {
    this.data = matData;
    this.notification = new Notification();
  }
  closeDialogRef() {
    this.dialogRef.close();
  }
}
