import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {

  @Output() confirmAction: EventEmitter<any> = new EventEmitter();
  @Input() tittleMsg = '';
  @Input() contentMsg = '';

  public confirm() {
    this.confirmAction.emit();
  }

}
