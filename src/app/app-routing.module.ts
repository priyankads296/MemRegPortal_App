import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClaimPageComponent } from './components/claim-page/claim-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ViewClaimModalComponent } from './components/view-claim-modal/view-claim-modal.component';
import { ViewEmployeeDetailsComponent } from './components/view-employee-details/view-employee-details.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path:'',
    component:HomepageComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'dashboard',
    component:DashboardComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'employeeDetails',
    component:EmployeeDetailsComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'emp/view/:Name',
    component:ViewEmployeeDetailsComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'viewEmployeeDetails',
    component:ViewEmployeeDetailsComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'claim-page',
    component:ClaimPageComponent,
    canActivate:[AuthGuard]
  },
  // {
  //   path:'claim/memberName/:memberName',
  //   component:ViewClaimModalComponent
  // },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
