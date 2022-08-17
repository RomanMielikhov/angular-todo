import { TestBed } from '@angular/core/testing';

import { ShareGuard } from './share.guard';

describe('ShareGuard', () => {
  let guard: ShareGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ShareGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
