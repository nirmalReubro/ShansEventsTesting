import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ForgotService } from '../services/forgotService';
import {  ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css']
})
export class ResetPassComponent implements OnInit {

error: string = null;
token: string;
forgotmessage: string;
isLoading = false;
constructor(public route: ActivatedRoute, public router: Router, public forgotService: ForgotService) {}


  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('token')) {
        this.token = paramMap.get('token');
      }
    });
  }

  changePass(formData: NgForm) {
    this.isLoading = true;

    if (formData.invalid) {
      return;
    }
    if (formData.value.password !== formData.value.confpass) {
        this.error = 'Passwords don\'t match';
        return;
    } else {
      this.error = null;
    }
    this.forgotService.changePassPermanently(formData.value.password, this.token)
    .subscribe(result => {
      console.log(result.message);
        if (result.message === 'success') {
          console.log(result);
          this.forgotmessage = 'Password changed successfully';
          this.router.navigate(['/login']);
        } else {
          this.forgotmessage = result.message;
        }
        this.isLoading = false;

      });

  }
}
