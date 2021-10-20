import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainLayoutComponent} from './main-layout/main-layout.component';
import {SingleLayoutComponent} from './single-layout/single-layout.component';
import {AuthGuard} from '../helpers/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/user',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard] },
      { path: 'state', loadChildren: () => import('./pages/state/state.module').then(m => m.StateModule), canActivate: [AuthGuard] },
      { path: 'city', loadChildren: () => import('./pages/city/city.module').then(m => m.CityModule), canActivate: [AuthGuard] },
      { path: 'user', loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule), canActivate: [AuthGuard] },
      { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule), canActivate: [AuthGuard] },
      { path: 'profile-builder', loadChildren: () => import('./pages/profile-builder/profile-builder.module').then(m => m.ProfileBuilderModule), canActivate: [AuthGuard] },
      { path: 'job', loadChildren: () => import('./pages/job/job.module').then(m => m.JobModule), canActivate: [AuthGuard] },
      { path: 'job-detail/:id', loadChildren: () => import('./pages/job/job-detail/job-detail.module').then(m => m.JobDetailModule), canActivate: [AuthGuard] },
      { path: 'cbo', loadChildren: () => import('./pages/cbo/cbo.module').then(m => m.CboModule), canActivate: [AuthGuard] },
      { path: 'company', loadChildren: () => import('./pages/company/company.module').then(m => m.CompanyModule), canActivate: [AuthGuard] },
      { path: 'candidate', loadChildren: () => import('./pages/candidate/candidate.module').then(m => m.CandidateModule), canActivate: [AuthGuard] },
      { path: 'consultant', loadChildren: () => import('./pages/consultant/consultant.module').then(m => m.ConsultantModule), canActivate: [AuthGuard] },
      { path: 'work-hour', loadChildren: () => import('./pages/work-hour/work-hour.module').then(m => m.WorkHourModule), canActivate: [AuthGuard] },
      { path: 'salary', loadChildren: () => import('./pages/salary/salary.module').then(m => m.SalaryModule), canActivate: [AuthGuard] },
      { path: 'reward', loadChildren: () => import('./pages/reward/reward.module').then(m => m.RewardModule), canActivate: [AuthGuard] },
     ]
  },
  {
    path: '',
    component: SingleLayoutComponent,
    children: [
      { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
      { path: 'registration', loadChildren: () => import('./pages/registration/registration.module').then(m => m.RegistrationModule) },
      { path: 'registration-invite', loadChildren: () => import('./pages/registration-invite/registration-invite.module').then(m => m.RegistrationInviteModule) },
      { path: 'registration-payment', loadChildren: () => import('./pages/registration-payment/registration-payment.module').then(m => m.RegistrationPaymentModule) }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
