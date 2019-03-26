import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ForgotService } from '../services/forgotService';


@Component({
  templateUrl: './forgot.component.html'
})
export class ForgotComponent {

  constructor(private dialogRef: MatDialogRef<ForgotComponent>,
    public forgotService: ForgotService
    ) {}

  submitForgot(form: NgForm) {

    if (form.invalid) {
      return;
    }
    this.forgotService.forgotCheck(form.value.email);
    this.dialogRef.close();


  }
}
