import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FinalFlowerApp';
  constructor(private router:Router){
    
  }
  Signin(){
    this.router.navigate(["login"]);
  }
}
