import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactService } from '../services/contact.service';
import { Router } from '@angular/router';
import { ContactUs } from '../models/contact-us-data.model';
import { Subscribable, Subscription } from 'rxjs';
import { CmsService } from '../services/cms.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit, OnDestroy {
  isLoading = false;
  isSent = false;
  myRecaptcha: boolean;

  isContactUsEdit = false;
  contactUs: ContactUs[] = [];
  isContactUsLoading = false;
  private ContactUsSub: Subscription;
  enteredaddress1 = '';
  enteredaddress2 = '';
  enteredaddress3 = '';
  enterednumber1 = '';
  enterednumber2 = '';
  enteredemail = '';
  fetchedContactUs = '';
 
  onScriptLoad() {
      console.log('Google reCAPTCHA loaded and is ready for use!')
  }

  onScriptError() {
      console.log('Something went long when loading the Google reCAPTCHA')
  }

  constructor(
    public contactService: ContactService, 
    private router: Router, 
    private cmsService: CmsService
    ) {}

  ngOnInit() {
    this.router.events.subscribe((path) => {
      window.scrollTo(0, 0);
    });
    this.isContactUsLoading = true;
    this.cmsService.getContactUs();
    this.ContactUsSub = this.cmsService.getContactUsUpdateListener()
    .subscribe((contactUsData: {contactUs: ContactUs[]}) => {
      this.isContactUsLoading = false;
      this.contactUs = contactUsData.contactUs;
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
    // console.log('Subject: ', form.value.subject);
    // console.log('Content: ', form.value.content);
    this.isLoading = true;
    this.contactService.sendMessage(
      form.value.name, 
      form.value.email,
      form.value.subject,
      form.value.content
    );
    form.resetForm();
  }

  ngOnDestroy() {
    this.ContactUsSub.unsubscribe();
  }
}
