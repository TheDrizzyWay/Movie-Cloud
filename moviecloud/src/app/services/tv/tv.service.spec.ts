import { TestBed } from '@angular/core/testing';

import { TodayService } from './tv.service';

describe('TvService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TodayService = TestBed.get(TodayService);
    expect(service).toBeTruthy();
  });
});
