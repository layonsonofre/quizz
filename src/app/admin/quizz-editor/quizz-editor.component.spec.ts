import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzEditorComponent } from './quizz-editor.component';

describe('QuizzEditorComponent', () => {
  let component: QuizzEditorComponent;
  let fixture: ComponentFixture<QuizzEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
