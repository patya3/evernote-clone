import { Component, OnInit, Input } from '@angular/core';
import { Note, NotebookService } from '../../services/notebook.service';
import { ModalController, GestureController } from '@ionic/angular';
import { NotebooksPage } from '../notebooks/notebooks.page';
import { tap, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-note',
  templateUrl: './note.page.html',
  styleUrls: ['./note.page.scss']
})
export class NotePage implements OnInit {
  @Input() id: string;

  note: Note = {
    content: '',
    title: '',
    notebook: null,
    created: null,
    favorite: false
  };

  constructor(
    private modalCtrl: ModalController,
    private notebookService: NotebookService
  ) {}

  ngOnInit() {
    if (this.id) {
      this.notebookService
        .getNote(this.id)
        .pipe(
          tap(note => (this.note = note)),
          switchMap(note => {
            return this.notebookService.getNotebook(note.notebook.id);
          })
        )
        .subscribe(notebook => {
          this.note.notebook = notebook;
          console.log('my notebook', notebook);
          console.log('my note to update', this.note);
        });
    }
  }

  async moveNote() {
    const modal = await this.modalCtrl.create({
      component: NotebooksPage,
      componentProps: {
        isModal: true,
        currentSelected: this.note.notebook
      }
    });
    modal.present();
    modal.onDidDismiss().then(result => {
      console.log('result', result);
      if (result.data) {
        this.note.notebook = result.data.selected;
      }
    });
  }

  cancel() {
    this.modalCtrl.dismiss();
  }

  done() {
    if (this.id) {
      this.notebookService.updateNote(this.id, this.note).then(res => {
        console.log('result', res);
      });
      this.modalCtrl.dismiss();
    } else {
      this.notebookService.addNote(this.note).then(res => {
        console.log('reuslt', res);
      });
      this.modalCtrl.dismiss();
    }
  }

  toggleFavorite() {
    this.note.favorite = !this.note.favorite;
    this.notebookService.updateNote(this.id, this.note);
  }
}
