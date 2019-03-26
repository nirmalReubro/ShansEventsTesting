import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { Router } from '@angular/router';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  isLoading = false;
  myRecaptcha: boolean;

  onScriptLoad() {
      console.log('Google reCAPTCHA loaded and is ready for use!')
  }

  onScriptError() {
      console.log('Something went long when loading the Google reCAPTCHA')
  }

  constructor(
    public contactService: ContactService,
    private router: Router
    ) {}

  ngOnInit() {
    this.router.events.subscribe((path) => {
      window.scrollTo(0, 0);
    });
  }

  onSend(form: NgForm) {
    if (!this.myRecaptcha) {
      alert('Please use reCaptcha to verify youself as Human');
      form.resetForm();
    }
    if (form.invalid) {
      console.log('Invalid Message');
      return;
    }
    this.isLoading = true;
    this.contactService.sendMessage(
      form.value.name,
      form.value.email,
      form.value.subject,
      form.value.content
    );
    form.resetForm();
  }
}
