import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { TrainingService } from 'src/app/training/training.service';
import { UiService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() sideNavEvent = new EventEmitter();
  isAuth: boolean = false;
  subjectSubcription: Subscription;

  constructor(private authService: AuthService,
    private trainingService: TrainingService,
    private uiService: UiService) {

  }

  ngOnInit() {
    this.subjectSubcription = this.authService.authChange.subscribe((isAuth) => {
      this.isAuth = isAuth;
    });
  }

  sideNavClicked() {
    this.sideNavEvent.emit();
  }

  logoutUser() {
    this.authService.logout();
    this.trainingService.exerciseChanged.next(null);
    this.uiService.openSnackBar("User logged out successfully", "close");
  }

  ngOnDestroy() {
    this.authService.unSubscribe(this.subjectSubcription);
  }
}
