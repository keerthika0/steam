import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Constants } from '../shared/constants/constants';
import { HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private http: HttpService) { }

  WishAll() {
    return this.http.get(Constants.url + Constants.wishall)
  }

  WishAdd(val) {
    return this.http.get(Constants.url + Constants.wishadd + val)
  }

  WishDelete(val) {
    return this.http.get(Constants.url + Constants.wishremove + val)
  }

}
