import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentsAdminComponent } from './enrollments-admin.component';

describe('EnrollmentsAdminComponent', () => {
  let component: EnrollmentsAdminComponent;
  let fixture: ComponentFixture<EnrollmentsAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrollmentsAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollmentsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
