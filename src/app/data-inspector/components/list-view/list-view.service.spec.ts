import { TestBed, inject } from '@angular/core/testing';

import { ListViewService } from './list-view.service';

describe('ListViewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListViewService]
    });
  });

  it('should be created', inject([ListViewService], (service: ListViewService) => {
    expect(service).toBeTruthy();
  }));
});
