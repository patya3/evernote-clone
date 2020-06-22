import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import * as firebase from 'firebase/app';

export interface Notebook {
  id?: string;
  name: string;
  created: any;
}

export interface Note {
  id?: string;
  content: string;
  title: string;
  notebook: any;
  created: any;
  changed?: any;
  favorite?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotebookService {
  private notebooksCollection: AngularFirestoreCollection<Notebook>;
  private notebooks: Observable<Notebook[]>;

  constructor(private afs: AngularFirestore) {
    this.notebooksCollection = this.afs.collection<Notebook>('notebooks', ref =>
      ref.orderBy('created')
    );
    this.notebooks = this.notebooksCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Notebook;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  addNotebook(name: string) {
    return this.notebooksCollection.add({
      name,
      created: firebase.firestore.FieldValue.serverTimestamp()
    });
  }

  getNotebooks() {
    return this.notebooks;
  }

  addNote(note: Note) {
    if (note.notebook) {
      note.notebook = this.afs.doc(`/notebooks/${note.notebook.id}`).ref;
    }
    note.created = firebase.firestore.FieldValue.serverTimestamp();
    return this.afs.collection<Note>('notes').add(note);
  }

  getNotebook(id: string) {
    return this.notebooksCollection
      .doc(id)
      .snapshotChanges()
      .pipe(
        take(1),
        map(actions => {
          return { id, ...(actions.payload.data() as Notebook) };
        })
      );
  }

  getNotesForBook(id: string) {
    const pObj = this.afs.doc(`notebooks/${id}`).ref;

    return this.afs
      .collection<Note>('notes', ref => ref.where('notebook', '==', pObj))
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as Note;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  getNote(id: string) {
    return this.afs.doc<Note>(`notes/${id}`).valueChanges();
  }

  updateNote(id: string, note: Note) {
    if (note.notebook) {
      note.notebook = this.afs.doc(`/notebooks/${note.notebook.id}`).ref;
    }
    note.changed = firebase.firestore.FieldValue.serverTimestamp();
    return this.afs.doc(`notes/${id}`).update(note);
  }

  getFavorites() {
    return this.afs
      .collection<Note>('notes', ref => ref.where('favorite', '==', true))
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as Note;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  deleteNote(id) {
    this.afs.doc<Note>(`notes/${id}`).delete();
  }
}
