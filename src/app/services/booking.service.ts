import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BookingData } from '../models/booking-data.model';

import { environment } from "../../environments/environment";
import { PaymentComponent } from '../payment/payment.component';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private userEmail = localStorage.getItem('email');
  private totalCost: number;

  constructor(
    private http: HttpClient, 
    private router: Router
    ) { }

  makeBooking(
    name: string, 
    date: string, 
    peopleCount: number, 
    lat: number, 
    lng: number,
    phone: string,
    type: string, 
    food: string, 
    totalCost: number) 
    {
      const booking: BookingData = {
        createdBy: this.userEmail,
        name: name,
        date: date,
        peopleCount: peopleCount,
        lat: lat,
        lng: lng,
        phone: phone,
        type: type,
        food: food,
        totalCost: totalCost
      };
      this.http.post(apiUrl + "/booking", booking)
      .subscribe((response: { id: string }) => {
          console.log(response.id);
          localStorage.setItem('id', response.id);
      });
      this.totalCost = totalCost;
  }

  getAmount() {
    return this.totalCost;
  }

  updatePayment() {
    let id = localStorage.getItem('id');
    this.http
      .put(apiUrl + "/payment/booking/" + id, id)
      .subscribe(response => {
        console.log(response);
    });
  }
}
