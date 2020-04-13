import { TestBed } from '@angular/core/testing';

import { UpcomingService } from './movie.service';

describe('MovieService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpcomingService = TestBed.get(UpcomingService);
    expect(service).toBeTruthy();
  });
});
