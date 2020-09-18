import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyprofileTeacherComponent } from './myprofile-teacher.component';

describe('MyprofileTeacherComponent', () => {
  let component: MyprofileTeacherComponent;
  let fixture: ComponentFixture<MyprofileTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyprofileTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyprofileTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
