import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Constants } from '../shared/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpService) { }

  ProductAll() {
    // return this.http.get(Constants.url + Constants.allproduct)
    return this.http.post(Constants.url + Constants.productlist)
  }

  ProductByCategory(id,val) {
    return this.http.get(Constants.url + Constants.productbycategory + id + '&type=' + val)
  }

  ProductById(id) {
    return this.http.get(Constants.url + Constants.productbyid + id)
  }
  ProductByType(id) {
    return this.http.get(Constants.url + Constants.productbytype + id)
  }

  ProductRating(id) {
    return this.http.post(Constants.url + Constants.rating , id)
  }

  SearchProduct(val){
    return this.http.get(Constants.url + Constants.searchproduct + val)
  }
  

  GetInstaFeed(){
    return this.http.get(Constants.url + Constants.instafeed)
  }

  ProductByCategoryId(id) {
    return this.http.get(Constants.url + Constants.productbycategory + id )
  }

  ProductBySubtype(id,val,sub) {
    return this.http.get(Constants.url + Constants.productbycategory + id + '&type=' + val + '&sub_type=' + sub)
  }

  ProductByLimit(val) {
    // return this.http.get(Constants.url + Constants.allproduct + '?id='+id+'&limit='+limit)
    return this.http.post(Constants.url + Constants.productlist, val)
  }

  NewArrival() {
    // return this.http.get(Constants.url + Constants.allproduct + '?id='+id+'&limit='+limit)
    return this.http.get(Constants.url + Constants.newarrival)
  }

}
