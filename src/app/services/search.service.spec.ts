import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SearchService } from './search.service';
import { TestBed } from '@angular/core/testing';

describe('SearchService', () => {
  let service: SearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(SearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
