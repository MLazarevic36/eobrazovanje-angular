import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementsAdminComponent } from './engagements-admin.component';

describe('EngagementsAdminComponent', () => {
  let component: EngagementsAdminComponent;
  let fixture: ComponentFixture<EngagementsAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EngagementsAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EngagementsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
