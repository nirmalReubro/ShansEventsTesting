import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../models/item.model';
import { Subject } from 'rxjs';
import { RentalData } from '../models/rental-data.model';

import { environment } from "../../environments/environment";

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  private items: Item[] = [];
  private itemsUpdated = new Subject<Item[]>();

  private userEmail = localStorage.getItem('email');

  constructor(private http: HttpClient) { }

  getItems() {
    this.http.get<{ items: Item[] }>(apiUrl + '/inventory')
    .subscribe((itemData) => {
      this.items = itemData.items;
      this.itemsUpdated.next(this.items);
    });
  }

  getItemUpdateListener() {
    return this.itemsUpdated.asObservable();
  }

  makeRental(
    pickedItem1: string,
    pickedItem2: string, 
    pickedItem3: string,
    pickedQty1: number, 
    pickedQty2: number, 
    pickedQty3: number,
    deliveryDate: string, 
    lat: number, 
    lng: number,
    phone: string, 
    totalCost: number
  ) {
    const rental: RentalData = {
      createdBy: this.userEmail,
      pickedItem1: pickedItem1,
      pickedItem2: pickedItem2, 
      pickedItem3: pickedItem3,
      pickedQty1: pickedQty1, 
      pickedQty2: pickedQty2, 
      pickedQty3: pickedQty3,
      deliveryDate: deliveryDate, 
      lat: lat, 
      lng: lng,
      phone: phone, 
      totalCost: totalCost
    };
    this.http.post(apiUrl + "/rental", rental)
    .subscribe(response => {
        console.log(response);
    });
    localStorage.setItem('totalCost', totalCost.toString());
  }

  updatePayment() {
    let id = localStorage.getItem('id');
    this.http
      .put(apiUrl + "/payment/rental/" + id, id)
      .subscribe(response => {
        console.log(response);
    });
  }
}
