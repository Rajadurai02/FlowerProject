import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from '../models/cart';
import { Flower } from '../models/flower';
import { FlowerOrder } from '../models/flowerOrder';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class FlowerService {
  flower:Flower;
    flowers:Flower[]=[];
    Cart:Cart[];
    total:number;
    order: Order;
    //UserEmail: string;
  constructor(private httpClient: HttpClient) {
    this.flower=new Flower();
    this.order = new Order();
      this.Cart =new Array();
      this.total=0;
      //this.UserEmail = localStorage.getItem("UserEmail")?.toString();
      this.AllFlowers().subscribe((FlowerData)=>{
        console.log(FlowerData);
        this.flowers = FlowerData as Flower[];
      })
   }
  AllFlowers(){
    // var header = new HttpHeaders({
    //   'Content-Type':'application/json',
    //   'Authorization':'Bearer '+localStorage.getItem("token")?.toString(),
    // });
    return this.httpClient.get("http://localhost:50610/api/Flower");
  }
  AddFlowers(flower:Flower){
    var flow:Flower=new Flower();
    var flag=0;
    this.flowers.forEach(element=>{
      if(element.flowerID==flower.flowerID){
        flag=1;
      }
    });
    if(flag==0){
      this.flowers.push(flower);
      return flag;
    }
    return flag;
  }
  AddToCart(ID:any){
    var flag=0;
    console.log(ID);
    if(this.Cart.length>0){
     if(this.flowers[this.flowers.findIndex(ele=>ele.flowerID==ID)].flowerQty>0){
       if(this.Cart.findIndex(ele=>ele.ID==ID)!=-1){
         this.Cart[this.Cart.findIndex(ele=>ele.ID==ID)].qty+=1
         this.ReduceFlower(ID);
       }
       else{
         var flow:Flower =new Flower();
         flow=this.GetElement(ID);
     
         var cart:Cart =new Cart (flow.flowerID,flow.flowerName,flow.flowerDesc,flow.flowerPrice,1,flow.flowerPath);
         this.Cart.push(cart);
         this.ReduceFlower(ID);
         console.log("First TIme");
         console.log("Cart Size is  "+this.Cart.length);
     
        }
      }
     else{
         this.RemoveFlower(ID);
     }  
     this.DisplayCart();
     
     }
    else
    {
     var flow:Flower =new Flower();
     flow=this.GetElement(ID);
     if(flow.flowerQty>0){
     var cart:Cart =new Cart(flow.flowerID,flow.flowerName,flow.flowerDesc,flow.flowerPrice,1,flow.flowerPath);
     this.Cart.push(cart);
     this.ReduceFlower(ID);
     console.log("First TIme");
    
     console.log("Cart Size is  "+this.Cart.length);
     }
     else{
       this.RemoveFlower(ID);     
      }
    
     this.DisplayCart();
    } 
  
 }
 DisplayCart(){
   this.Cart.forEach(element=>{console.log(element)});
 }
 GetElement(ID:any):Flower{
  var flow:Flower=new Flower();
  console.log(ID);
  this.flowers.forEach(element=>{
    
    if(element.flowerID==ID){
      flow=element;
    }
  });
  return flow;
}
 RemoveFlower(ID:any)
    {
      
      for(var i=0;i<this.flowers.length;i++){
        if(this.flowers[i].flowerID==ID){
            this.flowers.splice(i,1);
            console.log("Removed "+ID);
            break;
          }
        }
    }

    ReduceFlower(ID:any){
      
      for(var i=0;i<this.flowers.length;i++){
        if(this.flowers[i].flowerID==ID){
           this.flowers[i].flowerQty-=1;
           console.log("Reduced "+ID);
           break;
        }
        }
    }
    RemoveCarts(ID:any){
      if(this.Cart[this.Cart.findIndex(ele=>ele.ID==ID)].qty>1){
        this.Cart[this.Cart.findIndex(ele=>ele.ID==ID)].qty-=1;
        if(this.flowers.findIndex(ele=>ele.flowerID==ID)==-1){
          //var floww:Flower =new Flower (this.Cart[this.Cart.findIndex(ele=>ele.ID==ID)].flowerID,this.Cart[this.Cart.findIndex(ele=>ele.ID==ID)].flowerName,this.Cart[this.Cart.findIndex(ele=>ele.ID==ID)].flowerDesc,this.Cart[this.Cart.findIndex(ele=>ele.ID==ID)].flowerPrice,1);
          var floww:Flower = new Flower();
          floww.flowerID = this.Cart[this.Cart.findIndex(ele=>ele.ID==ID)].ID;
          floww.flowerName = this.Cart[this.Cart.findIndex(ele=>ele.ID==ID)].Name;
          floww.flowerDesc = this.Cart[this.Cart.findIndex(ele=>ele.ID==ID)].Desc;
          floww.flowerPrice = this.Cart[this.Cart.findIndex(ele=>ele.ID==ID)].Price;
          floww.flowerQty = 1;
          floww.flowerPath = this.Cart[this.Cart.findIndex(ele=>ele.ID==ID)].Path;
          this.flowers.push(floww);
        }
        else{
          this.flowers[this.flowers.findIndex(ele=>ele.flowerID==ID)].flowerQty+=1;
        }
      }
      else{
        if(this.flowers.findIndex(ele=>ele.flowerID==ID)==-1){
          //var floww:Flower =new Flower (this.Cart[this.Cart.findIndex(ele=>ele.ID==ID)].ID,this.Cart[this.Cart.findIndex(ele=>ele.ID==ID)].Name,this.Cart[this.Cart.findIndex(ele=>ele.ID==ID)].Price,1);
          var floww:Flower = new Flower();
          floww.flowerID = this.Cart[this.Cart.findIndex(ele=>ele.ID==ID)].ID;
          floww.flowerName = this.Cart[this.Cart.findIndex(ele=>ele.ID==ID)].Name;
          floww.flowerDesc = this.Cart[this.Cart.findIndex(ele=>ele.ID==ID)].Desc;
          floww.flowerPrice = this.Cart[this.Cart.findIndex(ele=>ele.ID==ID)].Price;
          floww.flowerQty = 1;
          floww.flowerPath = this.Cart[this.Cart.findIndex(ele=>ele.ID==ID)].Path;
          this.flowers.push(floww);
        }
        else{
          this.flowers[this.flowers.findIndex(ele=>ele.flowerID==ID)].flowerQty+=1;
        }
        this.Cart.splice(this.Cart.findIndex(ele=>ele.ID==ID),1);
      }
    }
    AddFlowerUsingAPI(flower:Flower){
      // var header = new HttpHeaders({
      //   'Content-Type':'application/json',
      //   'Authorization':'Bearer '+localStorage.getItem("token")?.toString()
      // });
      return this.httpClient.post("http://localhost:50610/api/Flower",flower);
    }
    SetTotal(){
      var subtotal=0;
      this.total=0;
      this.Cart.forEach(ele=>{
        subtotal=ele.Price*ele.qty;
        this.total+=subtotal;
      });
      console.log("Total is: "+this.total);
     return this.total;
    }
    DatabaseUpdation(){
      // this.order.totalAmount = this.total;
      // this.order.userEmail = 'raja@gmail.com';
      var newOrder:Order = new Order();
      newOrder.totalAmount = this.total;
      newOrder.userEmail = "raja@gmail.com";
      // var header = new HttpHeaders({
      //   'Content-Type':'application/json',
      //   'Authorization':'Bearer '+localStorage.getItem("token")?.toString()
      // });
      return this.httpClient.post("http://localhost:50610/api/Order",newOrder);
    }
    FlowerOrderUpdation(){
      if(this.Cart != null){
        this.Cart.forEach(flower=>{
          var flowerOrder: FlowerOrder = new FlowerOrder();
          flowerOrder.flowerID = flower.ID;
          flowerOrder.orderID = 4;
          return this.httpClient.post("http://localhost:50610/api/FlowerOrder",flowerOrder);
        });
      }
    }
}
