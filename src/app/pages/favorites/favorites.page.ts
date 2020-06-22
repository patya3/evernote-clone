import { Component, OnInit } from '@angular/core';
import { NotebookService, Note } from 'src/app/services/notebook.service';
import { ModalController } from '@ionic/angular';
import { NotePage } from '../note/note.page';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss']
})
export class FavoritesPage implements OnInit {
  notes: Observable<Note[]>;

  constructor(
    private notebookService: NotebookService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.notes = this.notebookService.getFavorites();
  }

  async openNote(id) {
    const modal = await this.modalCtrl.create({
      component: NotePage,
      componentProps: {
        id
      }
    });
    modal.present();
  }

  delete(note: Note) {
    console.log('delete me', note);
    this.notebookService.deleteNote(note.id);
  }
}
