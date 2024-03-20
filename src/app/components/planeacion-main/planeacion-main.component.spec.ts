import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaneacionMainComponent } from './planeacion-main.component';

describe('PlaneacionMainComponent', () => {
  let component: PlaneacionMainComponent;
  let fixture: ComponentFixture<PlaneacionMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaneacionMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlaneacionMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
