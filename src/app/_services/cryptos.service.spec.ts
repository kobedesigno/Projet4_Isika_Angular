import { TestBed } from '@angular/core/testing';

import { CryptosService } from './cryptos.service';

describe('CryptoService', () => {
  let service: CryptosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
