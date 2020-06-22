import { Component, OnInit, Input } from '@angular/core';
import { NotebookService, Notebook } from '../../services/notebook.service';
import { Observable, from } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { NotebookCreateModalPage } from '../notebook-create-modal/notebook-create-modal.page';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-notebooks',
  templateUrl: './notebooks.page.html',
  styleUrls: ['./notebooks.page.scss']
})
export class NotebooksPage implements OnInit {
  notebooks: Observable<Notebook[]>;
  constructor(
    private notebookService: NotebookService,
    private modalCtrl: ModalController,
    private router: Router
  ) {}

  @Input() isModal: boolean;
  @Input() currentSelected: Notebook;

  ngOnInit() {
    console.log('my selected', this.currentSelected);
    this.notebooks = this.notebookService.getNotebooks();
  }

  filterNotebooks(e) {
    const filter: string = e.detail.value;
    if (filter === '') {
      this.notebooks = this.notebookService.getNotebooks();
    } else {
      this.notebooks = this.notebooks.pipe(
        map(notebooks => {
          return notebooks.filter(
            notebook =>
              notebook.name.toLowerCase().startsWith(filter.toLowerCase()) ||
              notebook.name.toLowerCase().endsWith(filter.toLowerCase())
          );
        })
      );
    }
  }

  async addNotebook() {
    const modal = await this.modalCtrl.create({
      component: NotebookCreateModalPage
    });
    modal.present();
  }

  openNotebook(notebook: Notebook) {
    if (this.isModal) {
      this.modalCtrl.dismiss({
        selected: notebook
      });
    } else {
      this.router.navigateByUrl(`/app/notebooks/${notebook.id}`);
    }
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
