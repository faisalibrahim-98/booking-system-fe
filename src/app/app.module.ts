import { UpdateAccountComponent } from './components/update-account/update-account.component';
import { AppliedShiftsComponent } from './components/applied-shifts/applied-shifts.component';
import { AdminAccountComponent } from './components/admin-account/admin-account.component';
import { CreateSkillComponent } from './components/create-skill/create-skill.component';
import { CreateShiftComponent } from './components/create-shift/create-shift.component';
import { ShiftsGridComponent } from './components/shifts-grid/shifts-grid.component';
import { PayShiftsComponent } from './components/pay-shifts/pay-shifts.component';
import { ReferListComponent } from './components/refer-list/refer-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { PayrollComponent } from './components/payroll/payroll.component';
import { SignupComponent } from './components/signup/signup.component';
import { SearchComponent } from './components/search/search.component';
import { RatingComponent } from './components/rating/rating.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { BrowserModule } from '@angular/platform-browser';
import { SkillsService } from './services/skills.service';
import { ShiftService } from './services/shifts.service';
import { HttpClientModule } from '@angular/common/http';
import { ModalService } from './services/modal.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    AppliedShiftsComponent,
    UpdateAccountComponent,
    AdminAccountComponent,
    CreateSkillComponent,
    CreateShiftComponent,
    ShiftsGridComponent,
    ReferListComponent,
    DashboardComponent,
    PayShiftsComponent,
    HomepageComponent,
    PayrollComponent,
    SignupComponent,
    RatingComponent,
    SearchComponent,
    LoginComponent,
    AppComponent,
  ],
  imports: [
    ReactiveFormsModule,
    FullCalendarModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
  ],
  providers: [ModalService, SkillsService, ShiftService],
  bootstrap: [AppComponent],
})
export class AppModule {}
