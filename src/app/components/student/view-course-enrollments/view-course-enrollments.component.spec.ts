import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCourseEnrollmentsComponent } from './view-course-enrollments.component';

describe('ViewCourseEnrollmentsComponent', () => {
  let component: ViewCourseEnrollmentsComponent;
  let fixture: ComponentFixture<ViewCourseEnrollmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCourseEnrollmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCourseEnrollmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
