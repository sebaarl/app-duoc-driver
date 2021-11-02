import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import 'boxicons'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private activeroute: ActivatedRoute, private router: Router) {
  }
}