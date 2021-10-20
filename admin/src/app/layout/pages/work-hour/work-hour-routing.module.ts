import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkHourComponent } from './work-hour.component';

const routes: Routes = [
  { path: '', component: WorkHourComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkHourRoutingModule { }
