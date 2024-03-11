import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenciaMainComponent } from './asistencia-main.component';

describe('AsistenciaMainComponent', () => {
  let component: AsistenciaMainComponent;
  let fixture: ComponentFixture<AsistenciaMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsistenciaMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsistenciaMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
