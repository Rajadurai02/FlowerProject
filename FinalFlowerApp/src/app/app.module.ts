import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { Route,RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddflowerComponent } from './addflower/addflower.component';
import { BuyflowerComponent } from './buyflower/buyflower.component';
import { CartComponent } from './cart/cart.component';
import { ConfirmComponent } from './confirm/confirm.component';
var myRoutes:Route[]=[
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'buyflower',component:BuyflowerComponent},
  {path:'addflower',component:AddflowerComponent},
  {path:'cart',component:CartComponent},
  {path:'confirm',component:ConfirmComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AddflowerComponent,
    BuyflowerComponent,
    CartComponent,
    ConfirmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(myRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
