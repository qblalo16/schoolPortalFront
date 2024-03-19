import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnAccountComponent } from './alumn-account.component';

describe('AlumnAccountComponent', () => {
  let component: AlumnAccountComponent;
  let fixture: ComponentFixture<AlumnAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlumnAccountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlumnAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
