import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Subscription, BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from "@angular/fire/auth";
import { UiService } from '../shared/ui.service';

@Injectable()
export class AuthService {
    private isAuthenticated: boolean = false;
    authChange = new BehaviorSubject<boolean>(false);

    constructor(private angularFireAuth: AngularFireAuth,
        private uiService: UiService) {}

    initAuthListener() {
        this.angularFireAuth.authState.subscribe((user) => {
            if (user) {
                this.isAuthenticated = true;
                this.authChange.next(true);
            } else {
                this.isAuthenticated = false;
                this.authChange.next(false);
            }
        });
    }

    registerUser(authData: AuthData) {
        this.uiService.isLoadingChanged.next(true);
        this.angularFireAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
            .then((result) => {
                this.uiService.isLoadingChanged.next(false);
            }).catch((error) => {
                this.uiService.isLoadingChanged.next(false);
                this.uiService.openSnackBar("Some error occured, Please try after some time",'');
                console.error(error);
            });
        this.authChange.next(false);
    }

    login(authData: AuthData) {
        this.uiService.isLoadingChanged.next(true);
        this.angularFireAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
            .then((result) => {
                this.uiService.isLoadingChanged.next(false);
            }).catch((error) => {
                this.uiService.isLoadingChanged.next(false);
                this.uiService.openSnackBar("The entered credentials didn't match with our records",'');
                console.error(error);
            });
    }

    logout() {
        this.uiService.isLoadingChanged.next(true);
        this.angularFireAuth.auth.signOut()
            .then(() => {
                this.uiService.isLoadingChanged.next(false);
            }).catch((error) => {
                console.log(error);
            });
        
    }

    isAuth() {
        return this.isAuthenticated;
    }

    unSubscribe(subcription: Subscription) {
        subcription.unsubscribe();
    }
}