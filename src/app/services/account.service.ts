import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Constants } from '../shared/constants/constants';
import { HelperService } from './helper.service';
import { HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpService) { }

  PayError(val) {
    return this.http.post(Constants.url + Constants.payresponse, val)
  }

  GuestPayError(val) {
    return this.http.post(Constants.url + Constants.guestpayresponse, val)
  }

  GetSettings(){
    return this.http.get(Constants.url + Constants.getsetting)
  }


}
