import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProccessPayComponent } from './proccess-pay.component';

describe('ProccessPayComponent', () => {
  let component: ProccessPayComponent;
  let fixture: ComponentFixture<ProccessPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProccessPayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProccessPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
