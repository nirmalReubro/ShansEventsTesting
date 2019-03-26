import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Testimonial } from '../models/testimonial-data.model';
import { AboutUs } from '../models/about-us-data.model';
import { OurService } from '../models/our-service-data.model';
import { ContactUs } from '../models/contact-us-data.model';

import { environment } from "../../environments/environment";

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CmsService {
  private testimonials: Testimonial[] = [];
  private TestimonialsUpdated = new Subject<{ testimonials: Testimonial[]}>();

  private aboutUs: AboutUs[] = [];
  private AboutUsUpdated = new Subject<{ aboutUs: AboutUs[]}>();

  private ourServices: OurService[] = [];
  private ourServicesUpdated = new Subject<{ ourServices: OurService[] }>();

  private contactUs: ContactUs[] = [];
  private contactUsUpdated = new Subject<{ contactUs: ContactUs[] }>();

  constructor(private http: HttpClient) { }

  getTestimonials() {
    this.http.get<{ testimonials: Testimonial[] }>(apiUrl + '/cms/testimonial')
    .subscribe((testimonialData) => {
      this.testimonials = testimonialData.testimonials;
      this.TestimonialsUpdated.next({ testimonials: this.testimonials });
    });
  }

  getTestimonialUpdateListener() {
    return this.TestimonialsUpdated.asObservable();
  }

  getAboutUs() {
    this.http.get<{ aboutUs: AboutUs[] }>(apiUrl + '/cms/about-us')
    .subscribe((aboutUsData) => {
      this.aboutUs = aboutUsData.aboutUs;
      this.AboutUsUpdated.next({ aboutUs: this.aboutUs });
    });
  }

  getAboutUsUpdateListener() {
    return this.AboutUsUpdated.asObservable();
  }

  getOurServices() {
    this.http
    .get<{ message: string; ourServices: OurService[] }>(apiUrl + "/cms/our-service/")
    .subscribe(transformedOurServicesData => {
      this.ourServices = transformedOurServicesData.ourServices;
      this.ourServicesUpdated.next({ ourServices: this.ourServices });
    });
  }

  getOurServicesUpdateListener() {
    return this.ourServicesUpdated.asObservable();
  }

  getContactUs() {
    this.http.get<{ contactUs: ContactUs[] }>(apiUrl + '/cms/contact-us')
    .subscribe((contactUsData) => {
      this.contactUs = contactUsData.contactUs;
      this.contactUsUpdated.next({ contactUs: this.contactUs });
    });
  }

  getContactUsUpdateListener() {
    return this.contactUsUpdated.asObservable();
  }
}