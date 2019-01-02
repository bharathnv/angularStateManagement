import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AuthData } from '../auth-data.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  maxDate: Date;
  userData: AuthData;
  registerSubscription: Subscription;
  private loadingSubscription: Subscription;
  isLoading: boolean = false;

  constructor(private authService: AuthService,
    private router: Router,
    private uiService: UiService) { }

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
     this.authService.authChange.subscribe((isAuth) => {
      if (!isAuth) {
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
      this.authService.registerUser(this.userData);
    }
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
    this.registerSubscription.unsubscribe();
  }
}
