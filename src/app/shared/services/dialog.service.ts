import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertConfig, ConfirmationDialogConfig } from '../../models';
import { AlertComponent, ConfirmationDialogComponent } from '../components';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private confrimConfig: ConfirmationDialogConfig;
  private alertConfig: AlertConfig;

  constructor(private dialog: MatDialog) {
    this.confrimConfig = {
      message: 'Are you sure?',
      yesBtn: 'Yes',
      noBtn: 'No',
    };

    this.alertConfig = {
      title: 'Alert',
      message: null,
      type: 'error',
      button: 'OK',
    };
  }

  openConfirm(msg?: string, yesBtn = 'Yes', noBtn = 'No'): Observable<boolean> {
    const config = {
      ...this.confrimConfig,
      message: msg ? msg : this.confrimConfig.message,
      yesBtn,
      noBtn,
    };

    return this.dialog
      .open(ConfirmationDialogComponent)
      .afterClosed()
      .pipe(map((result) => result === 'true'));
  }

  openAlert(
    message: string,
    title = 'Alert',
    type = 'error',
    button = 'OK'
  ): void {
    const config = { ...this.alertConfig, message, title, type, button };
    this.dialog.open(AlertComponent, { data: config });
  }
}
