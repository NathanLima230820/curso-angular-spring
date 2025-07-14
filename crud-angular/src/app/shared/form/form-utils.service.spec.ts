import { TestBed } from '@angular/core/testing';

import { FormUtils } from './form-utils.service';

describe('FormUtils', () => {
  let service: FormUtils;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormUtils);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
