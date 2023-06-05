import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PrivateApiService } from '@services/private-api.service';

@Injectable({
  providedIn: 'root',
})
export class ContactMeService {
  _apiUrl = environment.apiUrl + environment.apiContactMe;

  constructor(private privateSvc: PrivateApiService) {}

  public send(data: any) {
    return this.privateSvc.post(this._apiUrl, data, false);
  }
}
