import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoSingleComponent } from './crypto-single.component';

describe('SingleCryptoComponent', () => {
  let component: CryptoSingleComponent;
  let fixture: ComponentFixture<CryptoSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CryptoSingleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
