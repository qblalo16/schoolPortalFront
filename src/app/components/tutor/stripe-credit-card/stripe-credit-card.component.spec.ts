import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StripeCreditCardComponent } from './stripe-credit-card.component';

describe('StripeCreditCardComponent', () => {
  let component: StripeCreditCardComponent;
  let fixture: ComponentFixture<StripeCreditCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StripeCreditCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StripeCreditCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
