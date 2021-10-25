import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Flower } from '../models/flower';
import { FlowerService } from '../services/flower.service';

@Component({
  selector: 'app-addflower',
  templateUrl: './addflower.component.html',
  styleUrls: ['./addflower.component.css']
})
export class AddflowerComponent implements OnInit {

  flower:Flower;
  myForm:FormGroup;
  constructor(private flowerService:FlowerService,private router:Router) { 
    this.flower = new Flower();
    this.myForm = new FormGroup({
      "fname":new FormControl(null,[Validators.required]),
      "fdesc":new FormControl(null,[Validators.required]),
      "fprice":new FormControl(null,[Validators.required]),
      "fqty":new FormControl(null,[Validators.required]),
      "fpath":new FormControl(null,[Validators.required])
    });
  }
  
  public get fname() : any {
    return this.myForm.get("fname");
  }
  public get fdesc() : any {
    return this.myForm.get("fdesc");
  }
  public get fprice() : any {
    return this.myForm.get("fprice");
  }
  public get fqty() : any {
    return this.myForm.get("fqty");
  }
  public get fpath() : any {
    return this.myForm.get("fpath");
  }
  
  AddFlower(){
    if(this.myForm.valid)
    {
      this.flower.flowerName = this.fname.value;
      this.flower.flowerDesc = this.fdesc.value;
      this.flower.flowerPrice = this.fprice.value;
      this.flower.flowerQty = this.fqty.value;
      this.flower.flowerPath = this.fpath.value;
      this.flowerService.AddFlowerUsingAPI(this.flower).subscribe((data)=>{
        var flower:Flower = data as Flower;
        this.flowerService.AddFlowers(flower);
        this.router.navigate(["buyflower"]);
      });  
    }
  }

  ngOnInit(): void {
  }

}
