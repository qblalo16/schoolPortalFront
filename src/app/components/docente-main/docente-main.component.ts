import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../../services/backend.services';


@Component({
  selector: 'app-docente-main',
  templateUrl: './docente-main.component.html',
  styleUrl: './docente-main.component.scss'
})
export class DocenteMainComponent implements OnInit {
  docentesList: any;
constructor( private router: Router, private service:BackendService){
   
}
  ngOnInit(): void {
    this.service.getDocentes().subscribe((data:any)=>{
      console.log( data);
      this.docentesList=data;
     });
  }
newdocente() {
  this.router.navigate(['home/docente']);
}

}
