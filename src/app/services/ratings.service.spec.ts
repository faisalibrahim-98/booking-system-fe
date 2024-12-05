import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RatingsService } from './ratings.service';
import { TestBed } from '@angular/core/testing';

describe('RatingsService', () => {
  let service: RatingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(RatingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
