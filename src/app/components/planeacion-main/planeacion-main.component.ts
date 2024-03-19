import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-planeacion-main',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, MatIconModule, MatButtonModule],
  templateUrl: './planeacion-main.component.html',
  styleUrl: './planeacion-main.component.scss'
})
export class PlaneacionMainComponent {
  
  selectedMounth = '';
  activeStep = 0;
  commentary = false;

  initForm () {
    this.activeStep = 2;
  }

  initComment () {
    this.activeStep = 1;
  }

  nextStep () {
    this.activeStep = this.activeStep+1;
  }
  backStep () {
    this.activeStep = this.activeStep-1;
  }
}
