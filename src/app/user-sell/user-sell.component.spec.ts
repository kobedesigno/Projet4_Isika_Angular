import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSellComponent } from './user-sell.component';

describe('UserSellComponent', () => {
  let component: UserSellComponent;
  let fixture: ComponentFixture<UserSellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
