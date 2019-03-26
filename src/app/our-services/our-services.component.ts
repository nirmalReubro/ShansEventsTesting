import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { OurService } from '../models/our-service-data.model';
import { Subscription } from 'rxjs';
import { CmsService } from '../services/cms.service';

@Component({
  selector: 'app-our-services',
  templateUrl: './our-services.component.html', 
  styleUrls: ['our-services.component.css']
})
export class OurServicesComponent implements OnInit, OnDestroy {
  isOurServicesEdit = false;
  ourServices: OurService[] = [];
  isOurServiceLoading = false;
  private OurServicesSub: Subscription;
  enteredTitle = '';
  enteredContent = '';
  fetchedOurService = '';

  constructor(private router: Router, private cmsService: CmsService) {}

  ngOnInit() {
    this.router.events.subscribe((path) => {
      window.scrollTo(0, 0);
    });

    this.isOurServiceLoading = true;
    this.cmsService.getOurServices();
    this.OurServicesSub = this.cmsService.getOurServicesUpdateListener()
    .subscribe((ourServiceData: {ourServices: OurService[]}) => {
      this.isOurServiceLoading = false;
      this.ourServices = ourServiceData.ourServices;
    });
  }

  ngOnDestroy() {
    this.OurServicesSub.unsubscribe();
  }
}
