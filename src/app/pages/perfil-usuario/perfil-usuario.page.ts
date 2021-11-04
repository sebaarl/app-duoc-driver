import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
})
export class PerfilUsuarioPage implements OnInit {

  user: any;

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      this.user = user;
    })
  }

}
