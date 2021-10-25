import { Component, OnInit } from '@angular/core';
import { Flower } from '../models/flower';
import { FlowerService } from '../services/flower.service';

@Component({
  selector: 'app-buyflower',
  templateUrl: './buyflower.component.html',
  styleUrls: ['./buyflower.component.css']
})
export class BuyflowerComponent implements OnInit {

  // flowers:Flower[]=[];
  // constructor(private flowerService:FlowerService) {
  //     this.flowerService.AllFlowers().subscribe((FlowerData)=>{
  //       console.log(FlowerData);
  //       this.flowers = FlowerData as Flower[];
  //     })
  //  }
  flowerService:FlowerService;
  flowers:Flower[];
    constructor(flowerService:FlowerService) {
      this.flowerService=flowerService; 
      this.flowers=this.flowerService.flowers;
    }
   ToCart(ID:any){
    this.flowerService.AddToCart(ID);
  }
  ngOnInit(): void {
  }

}
