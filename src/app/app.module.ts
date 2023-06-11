import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './shared/components/authentication/login/login.component';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './main/home/home.component';
import {AuthenticationGuard} from "./shared/guard/authentication/authentication.guard";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './main/nav-bar/nav-bar.component';
import { StatisticsComponent } from './main/statistics/statistics.component';
import { StoreModule } from '@ngrx/store';
import { OrdersComponent } from './main/orders/orders.component';
import { MenuEditComponent } from './main/menu-edit/menu-edit.component';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { IsAdminGuard } from "./shared/guard/authentication/is-admin.guard";
import { EditComponent } from './main/menu-edit/edit/food-edit/edit.component';
import { DrinkEditComponent } from './main/menu-edit/edit/drink-edit/drink-edit.component';
import { DrinkEditModalComponent } from './main/menu-edit/edit/drink-edit/drink-edit-modal/drink-edit-modal.component';
import { ToastrModule } from "ngx-toastr";
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    HomeComponent,
    NavBarComponent,
    StatisticsComponent,
    OrdersComponent,
    MenuEditComponent,
    LoadingComponent,
    EditComponent,
    DrinkEditComponent,
    DrinkEditModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}, {}),
    ToastrModule.forRoot(),
  ],
  providers: [AuthenticationGuard, IsAdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
