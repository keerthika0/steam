import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Constants } from '../shared/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpService) { }

  AddAddress(val) {
    return this.http.post(Constants.url + Constants.addaddress, val)
  }

  UpdateAddress(val) {
    return this.http.post(Constants.url + Constants.updateaddress, val)
  }

  DeleteAddress(val) {
    return this.http.post(Constants.url + Constants.deteletaddress, val)
  }

  GetAddress() {
    return this.http.get(Constants.url + Constants.getaddress)
  }

  UpdateProfile(val) {
    return this.http.post(Constants.url + Constants.myprofile, val)
  }

  GetProfile() {
    return this.http.get(Constants.url + Constants.getprofile)
  }

  GetCouponList() {
    return this.http.get(Constants.url + Constants.couponlist)
  }


  getNotificationList(){
    return this.http.get(Constants.url+Constants.getnotification);
  }


  clearNotificationList(){
    return this.http.get(Constants.url+Constants.clearnotification);
  }

  readNotification(){
    return this.http.get(Constants.url+Constants.readnotification);
  }

}
