import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrainingComponent } from './training/training.component';
import { CurrentTrainingComponent } from './training/current-training/current-training.component';
import { NewTrainingComponent } from './training/new-training/new-training.component';
import { PastTrainingComponent } from './training/past-training/past-training.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './navgation/header/header.component';
import { SideNavListComponent } from './navgation/side-nav-list/side-nav-list.component';
import { StopTimerComponent } from './training/current-training/stop-timer/stop-timer.component';
import { AuthService } from './auth/auth.service';
import { TrainingService } from './training/training.service';
import { environment } from "../environments/environment";
import { UiService } from './shared/ui.service';
import { AuthModule } from './auth/auth.module';
import { MaterialModule } from './material.module';
import { FlexModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    WelcomeComponent,
    HeaderComponent,
    SideNavListComponent,
    StopTimerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AuthModule
  ],
  providers: [AuthService, TrainingService, UiService],
  entryComponents: [StopTimerComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
