import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../../services/backend.services';

@Component({
  selector: 'app-grade-group',
  templateUrl: './grade-group.component.html',
  styleUrl: './grade-group.component.scss'
})
export class GradeGroupComponent implements OnInit {
  constructor( private router: Router, private service:BackendService){
   
  }
  groupsItems!:any;
  ngOnInit(): void {
   this.service.getGroups().subscribe((data:any)=>{
    console.log( data);
    this.groupsItems=data;
   });
  }

  newGroup(){
    this.router.navigate(['home/new-group']);
  }
}
