import { TestBed } from '@angular/core/testing';

import { DueStudentListService } from './due-student-list.service';

describe('DueStudentListService', () => {
  let service: DueStudentListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DueStudentListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
