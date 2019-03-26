import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AboutUs } from '../models/about-us-data.model';
import { CmsService } from '../services/cms.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit, OnDestroy {
  isAboutUsEdit = false;
  aboutUs: AboutUs[] = [];
  isAboutUsLoading = false;
  private aboutUsSub: Subscription;
  enteredCompanyProfile = '';
  enteredWhatWeDo = '';
  fetchedAboutUs = '';

  constructor(private router: Router, private cmsService: CmsService) {}

  ngOnInit() {
    this.router.events.subscribe((path) => {
      window.scrollTo(0, 0);
    });
    this.isAboutUsLoading = true;
    this.cmsService.getAboutUs();
    this.aboutUsSub = this.cmsService.getAboutUsUpdateListener()
    .subscribe((aboutUsData: {aboutUs: AboutUs[]}) => {
      this.isAboutUsLoading = false;
      this.aboutUs = aboutUsData.aboutUs;
    });
  }

  ngOnDestroy() {
    this.aboutUsSub.unsubscribe();
  }
}
