import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-finanzas',
  standalone: true,
  imports: [MatTabsModule, MatIconModule, MatCheckboxModule, MatExpansionModule],
  templateUrl: './finanzas.component.html',
  styleUrl: './finanzas.component.scss'
})
export class FinanzasComponent {

}
