import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user:User;
  rePassword:string;
  myForm:FormGroup;
  constructor(private userService:UserService,private router:Router) { 
    this.user = new User();
    this.rePassword="";
    this.myForm = new FormGroup({
      "uemail":new FormControl(null,[Validators.required,Validators.email]),
      "pass":new FormControl(null,[Validators.required,Validators.minLength(6)]),
      "repass":new FormControl(null,[Validators.required,Validators.minLength(6)]),
      "uname":new FormControl(null,[Validators.required,Validators.minLength(3)]),
      "uaddress":new FormControl(null,[Validators.required,Validators.minLength(8)]),
      "uphone":new FormControl(null,[Validators.required,Validators.minLength(10)])
    });
  }
  
  public get uemail() : any {
    return this.myForm.get("uemail");
  }
  public get pass() : any {
    return this.myForm.get("pass");
  }
  public get repass() : any {
    return this.myForm.get("repass");
  }
  public get uname() : any {
    return this.myForm.get("uname");
  }
  public get uaddress() : any {
    return this.myForm.get("uaddress");
  }
  public get uphone() : any {
    return this.myForm.get("uphone");
  }
  
  register(){
    console.log("From the register component")
    console.log(this.uname);
    console.log("--------------------------");
    if(this.myForm.valid)
    {
      this.user.userEmail = this.uemail.value;
      this.user.password = this.pass.value;
      this.user.name = this.uname.value;
      this.user.address = this.uaddress.value;
      this.user.phone = this.uphone.value;
      this.userService.register(this.user).subscribe((data)=>{
        var user:User = data as User;
        //console.log(user.jwtToken);
        localStorage.setItem("token",user.jwtToken);
        this.router.navigate(["login"]);
      });  
    }
  }
  ngOnInit(): void {
  }

}
