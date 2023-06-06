import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PrivateApiService } from '@services/private-api.service';

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  _apiUrl = environment.apiUrl + environment.apiSkill;
  _apiBulk = environment.apiUrl + environment.apiSkillsBulkUpdate;

  constructor(private privateSvc: PrivateApiService) {}

  public get() {
    return this.privateSvc.get(this._apiUrl, null, false);
  }

  public update(data: any) {
    return this.privateSvc.put(this._apiUrl, data, true);
  }

  public updateBulk(data: any) {
    return this.privateSvc.put(this._apiBulk, data, true);
  }
}
