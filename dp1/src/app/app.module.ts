import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HotelesComponent } from './hoteles/hoteles.component';
import { FormularioComponent } from './formulario/formulario.component';

import{FormsModule , ReactiveFormsModule } from '@angular/forms';
import { MisValidadoresDirective } from './mis-validadores.directive';

import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HotelComponent } from './hotel/hotel.component';
import { HabSTLComponent } from './hab-stl/hab-stl.component';
import { NavegadorComponent } from './navegador/navegador.component';

const rutas:Routes = [
  {path:'home',component:HomeComponent},
  {path:'',component:HomeComponent},
  {path:'hoteles/:nombreU',component:HotelesComponent},
  {path:'hotel/:nombreH',component:HotelComponent},
  {path:'registro',component:FormularioComponent},
  {path:'login',component:LoginComponent},
  {path:'navegador',component:NavegadorComponent},
  {path:'**',redirectTo:'home'}
  
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FormularioComponent,
    MisValidadoresDirective,
    HotelesComponent,
    LoginComponent,
    HotelComponent,
    HabSTLComponent,
    NavegadorComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(rutas)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
