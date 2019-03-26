import { Component, OnInit } from '@angular/core';

import { environment } from "../../environments/environment";
import { Router } from '@angular/router';
import { BookingService } from '../services/booking.service';
import { RentalService } from '../services/rental.service';
import { PurchaseService } from '../services/purchase.service';

const apiUrl = environment.apiUrl;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  clientTokenURL = apiUrl + '/payment/client-token';
  createPurchaseURL = apiUrl + '/payment/checkout';
  chargeAmount = parseInt(localStorage.getItem("totalCost"));
  successFlag = false;
  failureFlag = false;
  brainTreeHide = false;
  createdBy = '';
  transactionType = '';
  id = '';

  constructor(
    private router: Router, 
    private bookingService: BookingService, 
    private rentalService: RentalService,
    private purchaseService: PurchaseService
  ) {}

  ngOnInit() {
    this.router.events.subscribe((path) => {
      window.scrollTo(0, 0);
    });
    this.transactionType = localStorage.getItem('transactionType');
    console.log(this.chargeAmount);
    this.id = localStorage.getItem('id');
    this.createdBy = localStorage.getItem('email');
    console.log(this.transactionType);
    console.log(this.createdBy);
    console.log(typeof(this.id));
    console.log(this.chargeAmount);
  }

  pageReload() {
    window.location.reload();
  }

  backHome() {
    localStorage.removeItem('totalCost');
    localStorage.removeItem('transactionType');
    localStorage.removeItem('id');
  }

  onPaymentStatus($event) {
    if ($event.success) {
      // console.log('Success !!!');
      this.successFlag = true;
      if (this.transactionType === 'Booking') {
        console.log("Updating Payment...");
        console.log(this.id);
        this.bookingService.updatePayment();
      } else if (this.transactionType === 'Rental') {
        this.rentalService.updatePayment();
      } else if (this.transactionType === 'Purchase') {
        this.purchaseService.updatePayment();
      }
      this.backHome();
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 2000);
    } else if (!$event.success) {
      // console.log('Failed !!!');
      this.brainTreeHide = true;
      this.failureFlag = true;
    }
  }
}
