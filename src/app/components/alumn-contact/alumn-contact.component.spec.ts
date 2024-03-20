import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnContactComponent } from './alumn-contact.component';

describe('AlumnContactComponent', () => {
  let component: AlumnContactComponent;
  let fixture: ComponentFixture<AlumnContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlumnContactComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlumnContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
