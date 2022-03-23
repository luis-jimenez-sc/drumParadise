import { TestBed } from '@angular/core/testing';

import { ServiciosDPService } from './servicios-dp.service';

describe('ServiciosDPService', () => {
  let service: ServiciosDPService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciosDPService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
