import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Constants } from '../shared/constants/constants';
import { HelperService } from './helper.service';
import { HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpService, private helper: HelperService) { }

  Login(value) {
    return this.http.post(Constants.url + Constants.login, value);
  }
  SignUp(value) {
    return this.http.post(Constants.url + Constants.register, value);
  }
  ForgotPassword(value) {
    return this.http.post(Constants.url + Constants.forgotPassword, value);
  }
  ChangePassword(value) {
    return this.http.post(Constants.url + Constants.changepassowrd, value);
  }
  ResetPassword(value) {
    return this.http.post(Constants.url + Constants.resetPassword, value);
  }
  ResendEmail(value) {
    return this.http.post(Constants.url + Constants.resedemail, value);
  }
  LogOut() {
    return this.http.get(Constants.url + Constants.logout);
  }

  VerifyEmail() {
    return this.http.get(Constants.url + Constants.verifyemail);
  }
  
  ReturnForm(val) {
    return this.http.post(Constants.url + Constants.returnform, val);
  }
}
