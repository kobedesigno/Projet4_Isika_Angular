import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCryptoComponent } from './single-crypto.component';

describe('SingleCryptoComponent', () => {
  let component: SingleCryptoComponent;
  let fixture: ComponentFixture<SingleCryptoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleCryptoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleCryptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
