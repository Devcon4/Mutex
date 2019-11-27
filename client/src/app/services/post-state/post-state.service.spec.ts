import { TestBed } from '@angular/core/testing';

import { PostStateService } from './post-state.service';

describe('PostStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostStateService = TestBed.get(PostStateService);
    expect(service).toBeTruthy();
  });
});
