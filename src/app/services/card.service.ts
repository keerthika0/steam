import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Constants } from '../shared/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private http: HttpService) { }

  AddCard(val) {
    return this.http.post(Constants.url + Constants.addcard, val)
  }

  DeleteCard(val) {
    return this.http.get(Constants.url + Constants.deletecard+val)
  }

  GetCard() {
    return this.http.get(Constants.url + Constants.listcard)
  }
}

