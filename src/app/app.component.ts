import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import 'boxicons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  user: any = null;

  constructor(
    private activeroute: ActivatedRoute,
    private router: Router,
    private auth: AuthService,) {
  }

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      this.user = user;
    })
  }
}