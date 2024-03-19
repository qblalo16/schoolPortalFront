import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnQualificationComponent } from './alumn-qualification.component';

describe('AlumnQualificationComponent', () => {
  let component: AlumnQualificationComponent;
  let fixture: ComponentFixture<AlumnQualificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlumnQualificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlumnQualificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
