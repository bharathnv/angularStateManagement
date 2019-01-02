import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'test-angular';
  openSideNav = false;
  toggle(){
    this.openSideNav = !this.openSideNav;
  }

  constructor(private authService: AuthService) {
    this.authService.initAuthListener();
  }
}
