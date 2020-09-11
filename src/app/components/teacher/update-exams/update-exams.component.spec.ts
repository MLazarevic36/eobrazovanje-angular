import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateExamsComponent } from './update-exams.component';

describe('UpdateExamsComponent', () => {
  let component: UpdateExamsComponent;
  let fixture: ComponentFixture<UpdateExamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateExamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateExamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
