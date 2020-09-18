import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyprofileStudentComponent } from './myprofile-student.component';

describe('MyprofileStudentComponent', () => {
  let component: MyprofileStudentComponent;
  let fixture: ComponentFixture<MyprofileStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyprofileStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyprofileStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
