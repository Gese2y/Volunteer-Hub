import { TestBed } from '@angular/core/testing';

import { ServiceServiceService } from './service-service.service';

describe('ServiceServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceServiceService = TestBed.get(ServiceServiceService);
    expect(service).toBeTruthy();
  });
});
