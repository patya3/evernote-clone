import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotebooksPageRoutingModule } from './notebooks-routing.module';

import { NotebooksPage } from './notebooks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotebooksPageRoutingModule
  ],
  declarations: [NotebooksPage]
})
export class NotebooksPageModule {}
