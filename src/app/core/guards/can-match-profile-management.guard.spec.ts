import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { canMatchProfileManagementGuard } from './can-match-profile-management.guard';

describe('canMatchProfileManagementGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => canMatchProfileManagementGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
