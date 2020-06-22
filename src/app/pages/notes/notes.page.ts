import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  NotebookService,
  Note,
  Notebook
} from 'src/app/services/notebook.service';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { NotePage } from '../note/note.page';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss']
})
export class NotesPage implements OnInit {
  notes: Observable<Note[]>;
  notebook: Notebook;

  constructor(
    private route: ActivatedRoute,
    private notebookService: NotebookService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('myid', id);
    this.notes = this.notebookService.getNotesForBook(id);

    this.notes.subscribe(res => console.log('my notes', res));

    this.notebookService.getNotebook(id).subscribe((res: Notebook) => {
      console.log('notebook: ', res);
      this.notebook = res;
    });
  }

  async openNote(id: string) {
    const modal = await this.modalCtrl.create({
      component: NotePage,
      componentProps: {
        id
      }
    });
    modal.present();
  }
}
