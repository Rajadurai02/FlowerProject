import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from '../models/cart';
import { FlowerOrder } from '../models/flowerOrder';
import { Order } from '../models/order';
import { FlowerService } from '../services/flower.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  service: FlowerService;
  Cart:Cart[];
  total:number=0;
  order:Order;
 constructor(service:FlowerService,private router:Router) {
  this.service = service;
   this.Cart=service.Cart;
   this.order = new Order();
 }
 RemoveCart(ID:any){
  this.service.RemoveCarts(ID);
}
Confirm(){
  // this.order.totalAmount = this.total;
  // this.order.userEmail = "raja@gmail.com"
  // this.service.FlowerOrderUpdation().subscribe((flowerdata)=>{
  //   var flowOrder: FlowerOrder = flowerdata as FlowerOrder;
  //   console.log(flowOrder.itemID);
  // });
  this.service.DatabaseUpdation().subscribe((data)=>{
    var ord:Order = data as Order;
    console.log(ord.orderID);
    localStorage.setItem("OrderID",ord.orderID.toString());
    if(ord != null){
      this.router.navigate(["confirm"]);
    }
  });
}
  ngOnInit(): void {
  }

}
