import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user: any;

  constructor(
    private auth: AuthService, 
    private router: Router) {
  }

  logout(){
    this.auth.signOut();
  }

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      this.user = user;
    })
  }
}
