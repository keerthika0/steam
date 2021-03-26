import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import { CookieService } from 'ngx-cookie-service';
import { v4 as uuid } from 'uuid';
import { Constants } from 'src/app/shared/constants/constants';
import { TranslateService } from '@ngx-translate/core';
import { validLanguage } from 'src/app/helpers/languages';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.less']
})
export class LandingComponent implements OnInit {
  url = Constants.baseUrl;
  listOfData = [];
  typeList = []

  settingData:any;
  contentData:any = [];

  constructor(private product: ProductService, private category: CategoryService, private cookieService: CookieService, private translate: TranslateService,
    private accountService: AccountService) { }

  isloggedin;
  landImg;
  ngOnInit(): void {
    this.translate.use(validLanguage(localStorage.getItem('locale')));
    this.isloggedin = localStorage.getItem('isLoggedIn');


    this.accountService.GetSettings().subscribe((res) => {
      if (res['success']) {
        this.settingData = res['data'];
        this.contentData = this.settingData.content;
        var jsonObj = {};
        for (var i = 0 ; i < this.contentData.length; i++) {
            jsonObj[this.contentData[i].key] = this.contentData[i].value;
        }
        this.contentData = jsonObj;
        this.landImg = this.url + res['data']['header_image'];
        }
    });

    // this.product.GetInstaFeed().subscribe((res) => {
    //   console.log('instafeed working')
    //   if (res['success']) {
    //     console.log(res, 'instafeed')
    //   }
    // })

    if (localStorage.getItem('session') != null) {
    }
    else {
      let session = uuid();
      localStorage.setItem('session', session);
      this.cookieService.set('session', session);
      sessionStorage.setItem('session', session)
    }

    
    this.product.NewArrival().subscribe((res) => {
       this.listOfData = res['data']
      for(let i = 0; i<this.listOfData.length ; i++){
        for(let j = 0; j< this.listOfData[i].stock_count.length ; j++){
          if(this.listOfData[i].stock_count[j] != 0){
              this.listOfData[i].price_id = j;
               break;
          }
      }
      this.listOfData[i].available_price[0] = this.listOfData[i].available_price[this.listOfData[i].price_id];
      this.listOfData[i].price[0] = this.listOfData[i].price[this.listOfData[i].price_id];                    
    
      }
    });

    this.category.GetType().subscribe((res) => {
      this.typeList = res['data'];
    });


  }

} 
