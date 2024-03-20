import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTutorComponent } from './home-tutor.component';

describe('HomeTutorComponent', () => {
  let component: HomeTutorComponent;
  let fixture: ComponentFixture<HomeTutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeTutorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
