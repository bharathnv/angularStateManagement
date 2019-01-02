import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AuthData } from '../auth-data.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private userData: AuthData;
  private loginSubscription: Subscription;
  private loadingSubscription: Subscription;
  private isLoading: boolean = false;

  constructor(private authService: AuthService,
    private router: Router,
    private uiService: UiService) { }

  ngOnInit() {
    this.loginSubscription = this.authService.authChange.subscribe((isAuth) => {
      if (isAuth) {
        this.uiService.openSnackBar("User logged in successfully", "close");
        this.router.navigate(["/training"]);
      }
    });

    this.loadingSubscription = this.uiService.isLoadingChanged.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }

  onSubmitClick(form: NgForm) {
    if (form.valid) {
      this.userData = {
        email: form.value.email,
        password: form.value.password
      };
      this.authService.login(this.userData);
    }
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
  }
}
