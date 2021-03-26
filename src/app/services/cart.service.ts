import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Constants } from '../shared/constants/constants';
import { HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpService) { }

  CartAll() {
    return this.http.get(Constants.url + Constants.cartlist)
  }

  OrderAll() {
    return this.http.get(Constants.url + Constants.orderlist)
  }

  OrderDetails(id) {
    return this.http.get(Constants.url + Constants.orderdetails+id)
  }

  AddCart(val): Observable<any> {
    return this.http.get(Constants.url + Constants.addcart, 
      new HttpParams({ fromObject: { ...val } })
    )
  }

  RemoveCart(id) {
    return this.http.get(Constants.url + Constants.removecart + id)
  }

  IncreaseCart(id) {
    return this.http.get(Constants.url + Constants.increasecart + id)
  }

  DecreaseCart(id) {
    return this.http.get(Constants.url + Constants.decreasecart + id)
  }

  CheckCoupon(id){
        return this.http.get(Constants.url + Constants.checkCoupon + id)
  }

  PayNow(val){
        return this.http.post(Constants.url + Constants.paynow , val)
  }

  GuestCartAll() {
    return this.http.get(Constants.url + Constants.guestcartlist)
  }

 

  GuestAddCart(val): Observable<any> {
    return this.http.get(Constants.url + Constants.guestaddcart, 
      new HttpParams({ fromObject: { ...val } })
    )
  }

  GuestRemoveCart(id) {
    return this.http.get(Constants.url + Constants.guestremovecart + id)
  }

  GuestIncreaseCart(id) {
    return this.http.get(Constants.url + Constants.guestincreasecart + id)
  }

  GuestDecreaseCart(id) {
    return this.http.get(Constants.url + Constants.guestdecreasecart + id)
  }

  GuestOrderCreate(val){
    return this.http.post(Constants.url + Constants.guestordercreate , val)
}
GuestOrderDetails(id) {
  return this.http.get(Constants.url + Constants.guestorderdetail+id)
}

}
