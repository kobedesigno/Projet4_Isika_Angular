import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestUserComponent } from './invest-user.component';

describe('InvestUserComponent', () => {
  let component: InvestUserComponent;
  let fixture: ComponentFixture<InvestUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
