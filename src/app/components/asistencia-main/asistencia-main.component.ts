import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-asistencia-main',
  templateUrl: './asistencia-main.component.html',
  styleUrl: './asistencia-main.component.scss'
})
export class AsistenciaMainComponent {

  date = new FormControl(new Date());

  addDay() {
    const newDate = new Date(this.date.value!);
    newDate.setDate(newDate.getDate() + 1);
    this.date.setValue(newDate);
  }

  subtractDay() {
    const newDate = new Date(this.date.value!);
    newDate.setDate(newDate.getDate() - 1);
    this.date.setValue(newDate);
  }
}
