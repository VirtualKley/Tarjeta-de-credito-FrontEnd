import { TestBed } from '@angular/core/testing';

import { TarjetaService } from './tarjeta.service';

describe('TarjetaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TarjetaService = TestBed.get(TarjetaService);
    expect(service).toBeTruthy();
  });
});
