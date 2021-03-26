import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Constants } from '../shared/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpService) { }

  CategoryAll(){
    return this.http.get(Constants.url + Constants.allcategory)
  }

  CategoryByType(){
    return this.http.get(Constants.url + Constants.categorybytype)
  }
  GetType(){
    return this.http.get(Constants.url + Constants.typelist)
  }

  GetSubType(){
    return this.http.get(Constants.url + Constants.subtypelist)
  }
}
