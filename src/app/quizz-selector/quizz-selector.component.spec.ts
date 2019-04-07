import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizzSelectorComponent } from './quizz-selector.component';

describe('QuizzSelectorComponent', () => {
  let component: QuizzSelectorComponent;
  let fixture: ComponentFixture<QuizzSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizzSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizzSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
