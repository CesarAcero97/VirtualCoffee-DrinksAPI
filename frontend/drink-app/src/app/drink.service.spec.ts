import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DrinkService } from './drink.service';

describe('DrinkService', () => {
  let service: DrinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(DrinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
