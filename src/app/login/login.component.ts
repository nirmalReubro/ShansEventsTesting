import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ForgotComponent } from '../forgotDialog/forgot.component';
import { ForgotService } from '../services/forgotService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authStatusSub: Subscription;
  isAuth = false;
  private errorSub: Subscription;
  public error: string = null;
  constructor(
    public authService: AuthService,
    private router: Router,
    private forgotService: ForgotService,
    private matDialog: MatDialog) {}

  ngOnInit() {

    this.router.events.subscribe((path) => {
      window.scrollTo(0, 0);
    });

    this.isAuth = this.authService.getIsAuth();
      if (this.isAuth) {
        this.router.navigate(['/']);
      }

    this.errorSub = this.forgotService.getErrorMessage()
    .subscribe(error => {
      this.error = error.errorMessage;
    });

    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      console.log('Error');
      return;
    }
    this.isLoading = true;
    this.authService.login(form.value.email, form.value.password);
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    this.matDialog.open(ForgotComponent, dialogConfig);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
    this.errorSub.unsubscribe();
  }
}
