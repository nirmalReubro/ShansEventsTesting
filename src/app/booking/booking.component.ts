import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import LocationPicker from 'location-picker';
import { NgForm } from '@angular/forms';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { BookingService } from '../services/booking.service';
import { Router } from '@angular/router';

import { environment } from "../../environments/environment";

const apiUrl = environment.apiUrl;

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  isLoading = false;
  isDisabled = true;
  submitted = false;
  isLocationSet = false;
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak ($10)'},
    {value: 'pizza-1', viewValue: 'Pizza ($15)'},
    {value: 'tacos-2', viewValue: 'Tacos ($5)'}
  ];
  foodUnitCost: number = 0;
  foodTotalCost: number = 0;
  transactionType = 'Booking';
  
  formInvalid = false;
  
  eventName: '';
  eventDate: '';
  peopleCount = 0;
  lat = 0;
  lng = 0;
  phone = '';
  eventType = '';
  foodPicked = 'None';
  totalCost = 0;

  lp: LocationPicker;

  clientTokenURL = apiUrl + '/payment/client-token';

  constructor(
    private ngxSmartModalService: NgxSmartModalService, 
    private bookingService: BookingService, 
    private router: Router
    ) {}

  ngOnInit() {
    this.router.events.subscribe((path) => {
      window.scrollTo(0, 0);
    });
    this.lp = new LocationPicker('map');
    localStorage.setItem('transactionType', this.transactionType);

    let inputDate = document.getElementById("dateField");
    let today = new Date();
    let day = new String(today.getDate());
    let mon = new String(today.getMonth()+1); //January is 0!
    let yr = today.getFullYear();

    if(day.length < 2) { day = "0" + day; }
    if(mon.length < 2) { mon = "0" + mon; }

    let date = new String( yr + '-' + mon + '-' + day );
    inputDate.setAttribute('min', date.toString());
  }

  setLocation() {
    console.log(this.lp.getMarkerPosition());
    this.isLocationSet = true;
    this.getLocation();
  }

  getLocation() {
    const latLng = JSON.stringify(this.lp.getMarkerPosition());
    var splits = latLng.split(',"lng":');
    this.lng += parseFloat(latLng.split(',"lng":')[1]);
    this.lat += parseFloat(splits[0].split(':')[1]);
    console.log(this.lat);
    console.log(this.lng);
  }

  foodParse(food: string) {
    switch(food) {
      case 'steak-0':
        this.foodPicked = 'Steak';
        this.foodUnitCost = 10;
        break;
      case 'pizza-1':
        this.foodPicked = 'Pizza';
        this.foodUnitCost = 15;
        break;
      case 'tacos-2':
        this.foodPicked = 'Tacos';
        this.foodUnitCost = 5;
        break;
    }
  }

  onBooking(form: NgForm) {
    if (form.invalid) {
      this.formInvalid = true;
      return;
    }
    this.foodParse(form.value.foodToServe);
    this.isDisabled = false;
    this.eventName = form.value.name;
    this.eventDate = form.value.date;
    this.peopleCount = parseInt(form.value.pax);
    this.foodTotalCost = this.foodUnitCost * this.peopleCount;
    this.totalCost = this.foodTotalCost;
    localStorage.setItem('totalCost', this.totalCost.toString());
    console.log(localStorage);
    this.phone = form.value.contact;
    this.eventType = form.value.type;
    this.submitted = true;
  }

  getCost() {
    this.ngxSmartModalService.getModal('costModal').open();
  }

  onConfirm() {
    this.bookingService.makeBooking(
      this.eventName, 
      this.eventDate, 
      this.peopleCount, 
      this.lat, 
      this.lng,
      this.phone,
      this.eventType, 
      this.foodPicked, 
      this.totalCost
    );
    this.ngxSmartModalService.getModal('costModal').close();
    if (this.totalCost === 0) {
      alert('Booking successful. No payment required. You will redirected to the home page.');
      this.router.navigate(['/']);  
    } else {
      this.router.navigate(['/payment']);
    }
  }
}
