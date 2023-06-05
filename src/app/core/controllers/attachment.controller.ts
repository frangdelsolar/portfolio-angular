import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PrivateApiService } from '@services/private-api.service';
import { Attachment } from '@app/core/models/attachment.interface';

@Injectable({
  providedIn: 'root',
})
export class AttachmentService {
  _apiUrl = environment.apiUrl + environment.apiAttachment;

  constructor(private privateSvc: PrivateApiService) {}

  public get() {
    return this.privateSvc.get<Attachment[]>(this._apiUrl, null, false);
  }

  public update(data: any) {
    return this.privateSvc.put(this._apiUrl, data, true);
  }
}
