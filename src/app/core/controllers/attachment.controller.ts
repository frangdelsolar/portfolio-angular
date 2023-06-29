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

  public create(data: any) {
    return this.privateSvc.post(this._apiUrl, data, true);
  }

  public update(id: any, data: any) {
    const url = this._apiUrl + id + '/';
    return this.privateSvc.put(url, data, true);
  }

  public delete(id: any) {
    const url = this._apiUrl + id + '/';
    return this.privateSvc.delete(url, true);
  }
}
