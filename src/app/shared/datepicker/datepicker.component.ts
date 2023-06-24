import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})
export class DatepickerComponent implements OnInit {
  @Input() label: string = 'Label';
  @Input() control: FormControl = new FormControl('', []);
  constructor() {}

  ngOnInit(): void {}
}
