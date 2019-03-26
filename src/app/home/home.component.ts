import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ViewChild } from '@angular/core'
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { CmsService } from '../services/cms.service';
import { Testimonial } from '../models/testimonial-data.model';
import { GalleryService } from '../services/galleryService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private authListenerSubs: Subscription;
  public userIsAuthenticated = false;

  isTestimonialEdit = false;
  testimonials: Testimonial[] = [];
  isTestimonialsLoading = false;
  private testimonialsSub: Subscription;
  enteredTestiContent = '';
  public imageListenerDestry: Subscription;
  enteredTestiBy = '';
  fetchedTestimonial = '';
  albums = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private galleryService: GalleryService,
    private cmsService: CmsService) {}


  ngOnInit() {
    this.router.events.subscribe((path) => {
      window.scrollTo(0, 0);
    });
    // Auth
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });

    // Testimonials
    this.isTestimonialsLoading = true;
    this.cmsService.getTestimonials();
    this.testimonialsSub = this.cmsService.getTestimonialUpdateListener()
    .subscribe((testimonialsData: {testimonials: Testimonial[]}) => {
      this.isTestimonialsLoading = false;
      this.testimonials = testimonialsData.testimonials;
    });

    this.galleryService.getImages();
    this.imageListenerDestry = this.galleryService.imageListGet().subscribe(result => {
      this.albums = result.filter((image, index) => {
        return image ? index < 5 : false;
      });
    });

  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
    this.testimonialsSub.unsubscribe();
    this.imageListenerDestry.unsubscribe();
  }
}
