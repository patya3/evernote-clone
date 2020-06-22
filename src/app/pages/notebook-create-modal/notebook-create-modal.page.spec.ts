import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NotebookCreateModalPage } from './notebook-create-modal.page';

describe('NotebookCreateModalPage', () => {
  let component: NotebookCreateModalPage;
  let fixture: ComponentFixture<NotebookCreateModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotebookCreateModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NotebookCreateModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
