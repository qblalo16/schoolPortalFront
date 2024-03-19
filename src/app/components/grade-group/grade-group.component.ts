import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../../services/backend.services';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-grade-group',
  templateUrl: './grade-group.component.html',
  styleUrl: './grade-group.component.scss'
})
export class GradeGroupComponent implements OnInit {
  constructor( private router: Router, private service:BackendService, private spinner: NgxSpinnerService){
   
  }

  groupsItems!:any;
  
  ngOnInit(): void {
    this.spinner.show();
    this.service.getGroups().subscribe({
     next: (data) => {
      this.groupsItems=data;
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

  newGroup(){
    this.router.navigate(['home/new-group']);
  }
}
