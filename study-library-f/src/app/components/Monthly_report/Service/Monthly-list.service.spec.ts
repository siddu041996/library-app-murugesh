import { TestBed } from '@angular/core/testing';

import { StudentListService } from './monthly-list.service';

describe('StudentListService', () => {
  let service: StudentListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});