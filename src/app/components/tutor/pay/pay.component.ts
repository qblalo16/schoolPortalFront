import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrl: './pay.component.scss'
})
export class PayComponent implements OnInit {
  buyCarActive:boolean=false;
  ngOnInit(): void {
   var itemCar= localStorage.getItem("mensaualidad1000");
   console.log(itemCar);
   if(itemCar!=null){this.buyCarActive = true}
  }

}
