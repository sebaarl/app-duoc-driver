import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoaccountPage } from './noaccount.page';

const routes: Routes = [
  {
    path: '',
    component: NoaccountPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoaccountPageRoutingModule {}
