import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotebookCreateModalPageRoutingModule } from './notebook-create-modal-routing.module';

import { NotebookCreateModalPage } from './notebook-create-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotebookCreateModalPageRoutingModule
  ],
  declarations: [NotebookCreateModalPage]
})
export class NotebookCreateModalPageModule {}
