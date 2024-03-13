import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.scss'
})
export class ConfirmComponent {
  @Output() confirmAction: EventEmitter<any> = new EventEmitter();
  @Output() cancelAction: EventEmitter<any> = new EventEmitter();
  @Input() tittleMsg = '';
  @Input() contentMsg = '';

  public confirm() {
    this.confirmAction.emit();
  }

  public cancel() {
    this.cancelAction.emit();
  }
}
