import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user: any;

  constructor(
    private auth: AuthService,
    private router: Router,
    private actionSheetController: ActionSheetController,) {
  }

  logout() {
    this.auth.signOut();
  }

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      this.user = user;
    })
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Cuenta',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Perfil',
        icon: 'person-outline',
        handler: () => {
          this.router.navigate(['/perfil-usuario']);
        }
      }, {
        text: 'Cerrar sesión',
        icon: 'exit-outline',
        handler: () => {
          this.logout()
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }


}
