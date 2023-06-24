import { Component, OnInit } from '@angular/core';
import { ConfirmationService, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ConfirmationService],
})
export class AppComponent implements OnInit {
  title = 'fjgs-portfolio';

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
