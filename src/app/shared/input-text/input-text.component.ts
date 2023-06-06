import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
})
export class InputTextComponent implements OnInit {
  @Input() editOn: boolean = false;
  @Input() label: string = 'Text';
  @Input() type: string = 'text';
  @Input() control: FormControl = new FormControl('', []);

  value: string = '';
  @Output() valueChange: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    this.value = this.control.value;
  }

  onChange(value: string) {
    this.control.setValue(value);
    this.valueChange.emit(this.control.value);
  }
}
