import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CboComponent } from './cbo.component';

const routes: Routes = [
  { path: '', component: CboComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CboRoutingModule { }
