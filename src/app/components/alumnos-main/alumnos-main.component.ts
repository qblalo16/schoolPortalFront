import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alumnos-main',
  templateUrl: './alumnos-main.component.html',
  styleUrl: './alumnos-main.component.scss'
})
export class AlumnosMainComponent implements OnInit {
onDelete(arg0: any) {
throw new Error('Method not implemented.');
}
  studentsDS:any;
  displayedColumns: string[] = ['Nombres', 'ApellidoPaterno', 'ApellidoMaterno', 'GradoGrupo', 'Matricula', 'FechaNacimiento','Actions'];

  constructor( private router: Router, private service:BackendService){
   
  }
  ngOnInit(): void {
   this.service.getEstudentes().subscribe((data:any)=>{
    this.studentsDS=data;
    console.log(data);
   });
  }

  newdocente() {
    this.router.navigate(['home/alumno']);
  }

}
