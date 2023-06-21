import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyListComponent } from './Monthly_list.component';

describe('MonthlyListComponent', () => {
  let component: MonthlyListComponent;
  let fixture: ComponentFixture<MonthlyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
