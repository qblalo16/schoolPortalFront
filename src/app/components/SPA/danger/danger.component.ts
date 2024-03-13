import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-danger',
  templateUrl: './danger.component.html',
  styleUrls: ['./danger.component.scss']
})
export class DangerComponent {

  @Output() confirmAction: EventEmitter<any> = new EventEmitter();
  @Input() tittleMsg = '';
  @Input() contentMsg = '';

  public confirm() {
    this.confirmAction.emit();
  }  

}
