import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:User;
  myForm:FormGroup;
  constructor(private userService:UserService,private router:Router) { 
    this.user = new User();
    this.myForm = new FormGroup({
      "uemail":new FormControl(null,[Validators.required,Validators.email]),
      "pass":new FormControl(null,[Validators.required,Validators.minLength(6)]),
    });
  }
  
  public get uemail() : any {
    return this.myForm.get("uemail");
  }
  public get pass() : any {
    return this.myForm.get("pass");
  }  
  login(){
    console.log("From the login component")
    console.log("--------------------------");
    if(this.myForm.valid)
    {
      this.user.userEmail = this.uemail.value;
      this.user.password = this.pass.value;
      this.userService.Login(this.user).subscribe((data)=>{
        var user:User = data as User;
        console.log(user.jwtToken);
        localStorage.setItem("token",user.jwtToken);
        localStorage.setItem("UserEmail",user.userEmail);
        if(user != null){
          this.router.navigate(["buyflower"]);
        }
        else{
          localStorage.setItem("msg","Username or Password are incorrect");
        }
      });  
    }
  }

  ngOnInit(): void {
  }

}
