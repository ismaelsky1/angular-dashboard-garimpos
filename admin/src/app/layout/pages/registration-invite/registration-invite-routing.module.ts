import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationInviteComponent} from './registration-invite.component';

const routes: Routes = [
  { path: '', component: RegistrationInviteComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationInviteRoutingModule { }
