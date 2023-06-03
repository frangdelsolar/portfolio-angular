import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PrivateApiService } from '@services/private-api.service';

@Injectable({
  providedIn: 'root',
})
export class PersonalService {
  _apiUrl = environment.apiUrl + environment.apiPersonal;

  constructor(private privateSvc: PrivateApiService) {}

  public get() {
    return this.privateSvc.get(this._apiUrl, null, false);
  }

  public update(data: any) {
    return this.privateSvc.put(this._apiUrl, data, true);
  }
}
