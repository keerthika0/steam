import { Injectable } from '@angular/core';

import { HttpService } from './http.service';
import {Constants} from '../shared/constants/constants';
import { languages } from '../helpers/languages';
@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  
  constructor(private http:HttpService) { }
  getLanguage(){
      return this.http.get(Constants.url+Constants.getlanguage);
  }

  updateLanguage(id){
      
      return this.http.get(Constants.url+Constants.updatelanguage+id);
  }

  GuestUpdateLanguage(id){
    return this.http.get(Constants.url+Constants.guestlanguage+id);
}

}
