import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.services';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

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
  studentsAdd:any;
  displayedColumns: string[] = ['Nombres', 'ApellidoPaterno', 'ApellidoMaterno', 'GradoGrupo', 'Matricula', 'FechaNacimiento','Actions'];

  constructor( private router: Router, private service:BackendService, private spinner: NgxSpinnerService){
   
  }
  ngOnInit(): void {
    this.spinner.show();
   this.service.getEstudentes().subscribe({
    next: (data) => {
    this.studentsDS=data;
    console.log(data);
    this.spinner.hide();
    },
    error: (err) =>{
      this.spinner.hide();
      console.log("errror resp" + err);
     // this.modalService.open(this.alertModal, { ariaLabelledBy: 'modal-basic-title', size: 'md' });
    }
   });
  }

  newdocente() {
    this.router.navigate(['home/alumno']);
  }

}
