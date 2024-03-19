import { Component, OnInit } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
import { environment } from '../../../enviroments/environment';
import { Stripe } from '@stripe/stripe-js';
@Component({
  selector: 'app-finanzas',
  templateUrl: './finanzas.component.html',
  styleUrl: './finanzas.component.scss'
})
export class FinanzasComponent implements OnInit {
  stripe!: Stripe;
  async ngOnInit() {
    //this.stripe = new Stripe(environment.stripePublicKey);
  }
 
}
