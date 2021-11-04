import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/models';
import { AngularFireModule } from '@angular/fire/compat'
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as firebase from 'firebase/compat/app'
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AngularFireStorage } from '@angular/fire/compat/storage'

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
    private servicios: HttpClient,
    public alertController: AlertController,
    private storage: AngularFireStorage
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
              this.alert('Por favor verifica tu email', 'Alerta');
              this.afauth.signOut();
            } else {
              loading.dismiss();
              this.router.navigate(['/home']);
            }
          })
          .catch(error => {
            loading.dismiss();
            this.alert(error.message, 'Error');
          })
      })
      .catch(error => {
        loading.dismiss();
        this.alert(error.message, 'Error');
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
      this.router.navigate(['/noaccount']);
    })
  }

  getuserAuth() {
    return this.afauth.user;
  }

  async alert(message, header) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: header,
      message: message,
      buttons: ['Aceptar']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  uploadImage(file: any, path: string, nombre: string): Promise<String> {
    return new Promise((resolve) => {

      const filePath = path + '/' + nombre;
      const ref = this.storage.ref(filePath);
      const task = ref.put(file);

      resolve(path)

    })
  }

}
