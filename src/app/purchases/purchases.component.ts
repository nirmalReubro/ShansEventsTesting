import { Component, OnInit } from '@angular/core';
import LocationPicker from 'location-picker';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { NgForm } from '@angular/forms';
import { Item } from '../models/item.model';
import { Subscription } from 'rxjs';
import { PurchaseService } from '../services/purchase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent implements OnInit {
  isLoading = false;
  isDisabled = true;
  submitted = false;
  isLocationSet = false;
  items: Item[] = [];
  private itemsSub: Subscription;
  isItem2 = false;
  isItem3 = false;
  transactionType = 'Purchase';

  formInvalid = false;
  
  deliveryDate: '';
  lat = 0;
  lng = 0;
  phone = '';
  pickedItem1 = '';
  pickedItem2 = '';
  pickedItem3 = '';
  pickedQty1 = 0;
  pickedQty2 = 0;
  pickedQty3 = 0;
  unitPrice1 = 0;
  unitPrice2 = 0;
  unitPrice3 = 0;
  totalPrice1 = 0;
  totalPrice2 = 0;
  totalPrice3 = 0;
  totalCost = 0;

  lp: LocationPicker;

  constructor(
    private ngxSmartModalService: NgxSmartModalService, 
    private purchaseService: PurchaseService, 
    private router: Router
    ) {}

  ngOnInit() {
    this.router.events.subscribe((path) => {
      window.scrollTo(0, 0);
    });
    this.lp = new LocationPicker('map');
    this.purchaseService.getItems();
    this.itemsSub = this.purchaseService.getItemUpdateListener()
    .subscribe((items: Item[]) => {
      this.items = items;
      console.log(items);
    });
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
  
  onPurchase(form: NgForm) {
    if (form.invalid) {
      this.formInvalid = true;
      return;
    }
    this.isDisabled = false;
    this.unitPrice1 += this.items.find(i => i.name === form.value.item1).salePrice;
    this.totalPrice1 += this.unitPrice1 * form.value.qty1;
    this.pickedItem1 = form.value.item1;
    this.pickedQty1 += form.value.qty1;
    if (form.value.item2 !== '') {
      this.isItem2 = true;
      this.unitPrice2 += this.items.find(i => i.name === form.value.item2).salePrice;
      this.totalPrice2 += this.unitPrice2 * form.value.qty2;
      this.pickedItem2 = form.value.item2;
    this.pickedQty2 += form.value.qty2;
    }
    if (form.value.item3 !== '') {
      this.isItem3 = false;
      this.unitPrice3 += this.items.find(i => i.name === form.value.item3).salePrice;
      this.totalPrice3 += this.unitPrice3 * form.value.qty3;
      this.pickedItem3 = form.value.item3;
    this.pickedQty3 += form.value.qty3;
    }
    this.totalCost += this.totalPrice1 + this.totalPrice2 + this.totalPrice3;
    console.log(this.totalCost);
    this.deliveryDate = form.value.date;
    this.phone = form.value.contact;
    this.submitted = true;
  }

  getCost() {
    this.ngxSmartModalService.getModal('costModal').open();
  }

  onConfirm() {
    this.purchaseService.makePurchase(
      this.pickedItem1,
      this.pickedItem2, 
      this.pickedItem3,
      this.pickedQty1, 
      this.pickedQty2, 
      this.pickedQty3,
      this.deliveryDate, 
      this.lat, 
      this.lng,
      this.phone, 
      this.totalCost
      );
    this.ngxSmartModalService.getModal('costModal').close();
    localStorage.setItem('transactionType', 'Purchase');
    this.router.navigate(['/payment']);
  }

  ngOnDestroy() {
    this.itemsSub.unsubscribe();
  }
}
