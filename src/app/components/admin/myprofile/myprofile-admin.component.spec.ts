import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyprofileAdminComponent } from './myprofile-admin.component';

describe('MyprofileAdminComponent', () => {
  let component: MyprofileAdminComponent;
  let fixture: ComponentFixture<MyprofileAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyprofileAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyprofileAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
