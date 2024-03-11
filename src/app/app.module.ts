import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { ViewEmployeeDetailsComponent } from './components/view-employee-details/view-employee-details.component';
import { DatePipe } from '@angular/common';
import { LogoutModalComponent } from './components/logout-modal/logout-modal.component';
import { AddEmpModalComponent } from './components/add-emp-modal/add-emp-modal.component';
import { ClaimModalComponent } from './components/claim-modal/claim-modal.component';
import { ClaimPageComponent } from './components/claim-page/claim-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NewClaimComponent } from './components/new-claim/new-claim.component';
import { ViewClaimModalComponent } from './components/view-claim-modal/view-claim-modal.component';



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomepageComponent,
    DashboardComponent,
    EmployeeDetailsComponent,
    SidebarComponent,
    ViewEmployeeDetailsComponent,
    LogoutModalComponent,
    AddEmpModalComponent,
    ClaimModalComponent,
    ClaimPageComponent,
    NavbarComponent,
    NewClaimComponent,
    ViewClaimModalComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    Ng2OrderModule,
    CommonModule
    
  ],
  providers: [
    AuthService,
    DatePipe,
    ViewClaimModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
