import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailedCourseComponent } from './view-detailed-course.component';

describe('ViewDetailedCourseComponent', () => {
  let component: ViewDetailedCourseComponent;
  let fixture: ComponentFixture<ViewDetailedCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDetailedCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDetailedCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
