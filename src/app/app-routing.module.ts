import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./shared/components/authentication/login/login.component";
import {AuthenticationGuard} from "./shared/guard/authentication/authentication.guard";
import {MainComponent} from "./main/main.component";
import {HomeComponent} from "./main/home/home.component";
import {StatisticsComponent} from "./main/statistics/statistics.component";

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
        canActivate: [AuthenticationGuard]
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
