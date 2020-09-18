import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedCourseStudentComponent } from './detailed-course-student.component';

describe('DetailedCourseStudentComponent', () => {
  let component: DetailedCourseStudentComponent;
  let fixture: ComponentFixture<DetailedCourseStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedCourseStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedCourseStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
