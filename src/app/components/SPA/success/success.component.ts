import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent {

  @Output() confirmAction: EventEmitter<any> = new EventEmitter();
  @Input() tittleMsg = '';
  @Input() contentMsg = '';

  public confirm() {
    this.confirmAction.emit();
  }

}
