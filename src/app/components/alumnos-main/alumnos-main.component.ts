import { Component } from '@angular/core';
import { BackendService } from '../../services/backend.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alumnos-main',
  templateUrl: './alumnos-main.component.html',
  styleUrl: './alumnos-main.component.scss'
})
export class AlumnosMainComponent {
  constructor( private router: Router, private service:BackendService){
   
  }
  newdocente() {
    this.router.navigate(['home/alumno']);
  }

}
