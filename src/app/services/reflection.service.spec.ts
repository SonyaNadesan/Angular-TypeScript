import { TestBed } from '@angular/core/testing';

import { ReflectionService } from './reflection.service';

describe('ReflectionService', () => {
  let service: ReflectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReflectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
