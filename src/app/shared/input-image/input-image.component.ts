import { Component, Input, OnInit } from '@angular/core';
import { Image } from '@app/core/models/image.interface';
import { environment } from '@env/environment';

@Component({
  selector: 'app-input-image',
  templateUrl: './input-image.component.html',
  styleUrls: ['./input-image.component.scss'],
})
export class InputImageComponent implements OnInit {
  @Input() editModeOn: boolean = false;
  @Input() item: Image;

  apiImageUrl: string = environment.apiUrl + environment.apiImage;

  constructor() {}

  ngOnInit(): void {}

  onUpload(event: any) {
    console.log(event);
  }
}
