import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as firebase from 'firebase/compat/app'
import { LoadingController, ToastController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;
  user: User;

  constructor(
    private afs: AngularFirestore,
    private afauth: AngularFireAuth,
    private router: Router,
    private LoadingCtrl: LoadingController,
    private toastr: ToastController,
  ) {
    this.user$ = this.afauth.authState
      .pipe(
        switchMap(user => {
          if (user) {
            return this.afs.doc<User>(`user/${user.uid}`).valueChanges();
          } else {
            return of(null);
          }
        })
      )
  }

  async signIn(email, password) {
    const loading = await this.LoadingCtrl.create({
      message: 'Autenticando...',
      spinner: 'crescent',
      showBackdrop: true,
    });

    loading.present();

    this.afauth.setPersistence(firebase.default.auth.Auth.Persistence.LOCAL)
      .then(() => {
        this.afauth.signInWithEmailAndPassword(email, password)
          .then((data) => {
            if (!data.user.emailVerified) {
              loading.dismiss();
              this.toast('Por favor verifica tu email', 'warning');
              this.afauth.signOut();
            } else {
              loading.dismiss();
              this.router.navigate(['/home']);
            }
          })
          .catch(error => {
            loading.dismiss();
            this.toast(error.message, 'danger');
          })
      })
      .catch(error => {
        loading.dismiss();
        this.toast(error.message, 'danger');
      })
  }

  async signOut() {
    const loading = await this.LoadingCtrl.create({
      spinner: 'crescent',
      showBackdrop: true,
    });
    loading.present();
    this.afauth.signOut().then(() => {
      loading.dismiss();
      this.router.navigate(['/login']);
    })
  }

  async toast(message, status) {
    const toast = await this.toastr.create({
      message: message,
      color: status,
      position: 'bottom',
      duration: 2000
    });
    toast.present();
  }

}
