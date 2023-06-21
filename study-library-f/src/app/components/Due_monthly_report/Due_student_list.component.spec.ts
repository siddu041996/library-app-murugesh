import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DueStudentListComponent } from './Due_student_list.component';

describe('DueStudentListComponent', () => {
  let component: DueStudentListComponent;
  let fixture: ComponentFixture<DueStudentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DueStudentListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DueStudentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
