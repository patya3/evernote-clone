import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotebooksPage } from './notebooks.page';

const routes: Routes = [
  {
    path: '',
    component: NotebooksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotebooksPageRoutingModule {}
