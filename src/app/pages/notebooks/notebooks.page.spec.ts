import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NotebooksPage } from './notebooks.page';

describe('NotebooksPage', () => {
  let component: NotebooksPage;
  let fixture: ComponentFixture<NotebooksPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotebooksPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NotebooksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
