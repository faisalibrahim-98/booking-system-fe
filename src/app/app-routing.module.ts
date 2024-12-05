import { UpdateAccountComponent } from './components/update-account/update-account.component';
import { AppliedShiftsComponent } from './components/applied-shifts/applied-shifts.component';
import { AdminAccountComponent } from './components/admin-account/admin-account.component';
import { CreateSkillComponent } from './components/create-skill/create-skill.component';
import { CreateShiftComponent } from './components/create-shift/create-shift.component';
import { ShiftsGridComponent } from './components/shifts-grid/shifts-grid.component';
import { PayShiftsComponent } from './components/pay-shifts/pay-shifts.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { PayrollComponent } from './components/payroll/payroll.component';
import { SearchComponent } from './components/search/search.component';
import { RatingComponent } from './components/rating/rating.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'updateAccount', component: UpdateAccountComponent },
  { path: 'createshift', component: CreateShiftComponent },
  { path: 'applied', component: AppliedShiftsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'admin', component: AdminAccountComponent },
  { path: 'shiftsg', component: ShiftsGridComponent },
  { path: 'skill', component: CreateSkillComponent },
  { path: 'payroll', component: PayrollComponent },
  { path: 'ratings', component: RatingComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'search', component: SearchComponent },
  { path: 'pay', component: PayShiftsComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
