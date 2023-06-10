import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./shared/components/authentication/login/login.component";
import {AuthenticationGuard} from "./shared/guard/authentication/authentication.guard";
import {MainComponent} from "./main/main.component";
import {HomeComponent} from "./main/home/home.component";
import {StatisticsComponent} from "./main/statistics/statistics.component";
import { OrdersComponent } from "./main/orders/orders.component";
import { MenuEditComponent } from "./main/menu-edit/menu-edit.component";
import { IsAdminGuard } from "./shared/guard/authentication/is-admin.guard";
import { EditComponent } from "./main/menu-edit/edit/food-edit/edit.component";
import { DrinkEditComponent } from "./main/menu-edit/edit/drink-edit/drink-edit.component";

const routes: Routes = [{
  path: 'login',
  component: LoginComponent,
  data: {show: true, name: '/Login'}
},
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: 'home',
        pathMatch: 'full',
        component: HomeComponent,
        data: {
          showInMenu: true,
          name: 'home',
        },
        canActivate: [AuthenticationGuard]
      },
      {
        path: 'statistics',
        pathMatch: 'full',
        component: StatisticsComponent,
        data: {
          showInMenu: true,
          name: 'statistics',
        },
        canActivate: [AuthenticationGuard, IsAdminGuard]
      },
      {
        path: 'orders',
        pathMatch: 'full',
        component: OrdersComponent,
        data: {
          showInMenu: true,
          name: 'orders',
        },
        canActivate: [AuthenticationGuard]
      },
      {
        path: 'menu-edit',
        pathMatch: 'full',
        component: MenuEditComponent,
        data: {
          showInMenu: true,
          name: 'menu-list',
        },
        canActivate: [AuthenticationGuard, IsAdminGuard]
      },
      {
        path: 'menu-edit/edit/menu/:id',
        pathMatch: 'full',
        component: EditComponent,
        data: {
          showInMenu: true,
          name: 'edit',
        },
        canActivate: [AuthenticationGuard, IsAdminGuard]
      },
      {
        path: 'menu-edit/edit/drink/:id',
        pathMatch: 'full',
        component: DrinkEditComponent,
        data: {
          showInMenu: true,
          name: 'edit',
        },
        canActivate: [AuthenticationGuard, IsAdminGuard]
      },
      {
        path: 'menu-edit/edit/drink',
        pathMatch: 'full',
        component: DrinkEditComponent,
        data: {
          showInMenu: true,
          name: 'menu-list',
        },
        canActivate: [AuthenticationGuard, IsAdminGuard]
      },
      {
        path: 'menu-edit/edit/menu',
        pathMatch: 'full',
        component: EditComponent,
        data: {
          showInMenu: true,
          name: 'edit',
        },
        canActivate: [AuthenticationGuard, IsAdminGuard]
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
        data: {
          showInMenu: true,
          name: 'home',
        }
      }]
  },
  {path: '**', redirectTo: 'home', data: {show: false, name: ''}}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
