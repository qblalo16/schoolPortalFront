import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export interface structureAlumn {
  id: number;
  nombres: string;
  aPaterno: string;
  aMaterno: string;
  matricula: string;
}

const ELEMENT_DATA: structureAlumn[] = [
  {
    id: 3,
    nombres: "string",
    aPaterno: "string",
    aMaterno: "string",
    matricula: "string"
  }
];

@Component({
  selector: 'app-asistencia-main',
  templateUrl: './asistencia-main.component.html',
  styleUrl: './asistencia-main.component.scss'
})

export class AsistenciaMainComponent {

  date = new FormControl(new Date());
  dateString = format(new Date(), "eeee dd 'de' MMMM", {locale: es}); 

  addDay() {
    const newDate = new Date(this.date.value!);
    newDate.setDate(newDate.getDate() + 1);
    this.date.setValue(newDate);
    this.dateString = format(newDate, "eeee dd 'de' MMMM", {locale: es});
  }

  subtractDay() {
    const newDate = new Date(this.date.value!);
    newDate.setDate(newDate.getDate() - 1);
    this.date.setValue(newDate);
    this.dateString = format(newDate, "eeee dd 'de' MMMM", {locale: es});
  }

  displayedColumns: string[] = ['Nombres', 'ApellidoPaterno', 'ApellidoMaterno', 'Matricula','Actions'];
  studentsDS = ELEMENT_DATA;
}
