import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class UiService {
    public isLoadingChanged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private snackBar: MatSnackBar) {}

    openSnackBar(message: string, action: string) {
        let snackBarRef = this.snackBar.open(message, action, {
          duration: 5000,
        });

        snackBarRef.onAction().subscribe(() => {
            snackBarRef.dismiss();
        });
    }
}