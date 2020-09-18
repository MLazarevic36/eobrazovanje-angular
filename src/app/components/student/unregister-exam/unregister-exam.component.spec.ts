import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnregisterExamComponent } from './unregister-exam.component';

describe('UnregisterExamComponent', () => {
  let component: UnregisterExamComponent;
  let fixture: ComponentFixture<UnregisterExamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnregisterExamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnregisterExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
