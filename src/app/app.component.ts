import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private ngxSmartModalService: NgxSmartModalService
  ) {}

  ngOnInit() {
    this.authService.autoAuthUser();
  }

  openContact() {
    this.ngxSmartModalService.getModal('contactModal').open();
  }

  closeContact() {
    this.ngxSmartModalService.getModal('contactModal').close();
  }
}
