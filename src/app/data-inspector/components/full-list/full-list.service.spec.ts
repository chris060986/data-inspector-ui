import { TestBed, inject } from '@angular/core/testing';

import { FullListService } from './full-list.service';

describe('FullListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FullListService]
    });
  });

  it('should be created', inject([FullListService], (service: FullListService) => {
    expect(service).toBeTruthy();
  }));
});
