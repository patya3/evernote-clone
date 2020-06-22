import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NotebookService } from 'src/app/services/notebook.service';

@Component({
  selector: 'app-notebook-create-modal',
  templateUrl: './notebook-create-modal.page.html',
  styleUrls: ['./notebook-create-modal.page.scss']
})
export class NotebookCreateModalPage implements OnInit {
  name = '';

  constructor(
    private modalCtrl: ModalController,
    private notebookService: NotebookService
  ) {}

  ngOnInit() {}

  save() {
    this.notebookService.addNotebook(this.name).then(() => {});
    this.modalCtrl.dismiss();
  }

  cancel() {
    this.modalCtrl.dismiss();
  }
}
