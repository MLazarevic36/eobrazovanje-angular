import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEngagementsComponent } from './view-engagements.component';

describe('ViewEngagementsComponent', () => {
  let component: ViewEngagementsComponent;
  let fixture: ComponentFixture<ViewEngagementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEngagementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEngagementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
