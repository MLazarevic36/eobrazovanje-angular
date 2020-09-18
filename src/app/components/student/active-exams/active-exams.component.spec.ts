import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveExamsComponent } from './active-exams.component';

describe('ActiveExamsComponent', () => {
  let component: ActiveExamsComponent;
  let fixture: ComponentFixture<ActiveExamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveExamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveExamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
