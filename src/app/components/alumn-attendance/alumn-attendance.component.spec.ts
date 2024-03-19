import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnAttendanceComponent } from './alumn-attendance.component';

describe('AlumnAttendanceComponent', () => {
  let component: AlumnAttendanceComponent;
  let fixture: ComponentFixture<AlumnAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlumnAttendanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlumnAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
