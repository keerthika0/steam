import { Component, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { AuthService } from 'src/app/services/auth.service';
import { HelperService } from 'src/app/services/helper.service';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { PageScrollService, EasingLogic } from 'ngx-page-scroll-core';
import { TranslateService } from '@ngx-translate/core';
import { validLanguage } from 'src/app/helpers/languages';
import { LanguageService } from 'src/app/services/language.service';
import { ProfileService } from '../../services/profile.service';
import { AccountService } from '../../services/account.service';
declare var $: any;
import { Constants } from 'src/app/shared/constants/constants';

@Component({
    selector: 'app-landing-header',
    templateUrl: './landing-header.component.html',
    styleUrls: ['./landing-header.component.less'],
})
export class LandingHeaderComponent implements OnInit {
    
    visible = false;
    isCheckoutSignIn = false;
    open(): void {
        this.visible = true;
    }

    close(): void {
        this.visible = false;
    }

    public notifyCount: number;

    constructor(
        private pageScrollService: PageScrollService,
        private category: CategoryService,
        private cart: CartService,
        private authService: AuthService,
        private router: Router,
        private helper: HelperService,
        private translate: TranslateService,
        private languageService: LanguageService,
        private profile: ProfileService,
        private accountService: AccountService,
        @Inject(DOCUMENT) private document: any
    ) { }
    public myEasing: EasingLogic = (
        t: number,
        b: number,
        c: number,
        d: number
    ): number => {
        // easeInOutExpo easing
        if (t === 0) {
            return b;
        }
        if (t === d) {
            return b + c;
        }
        if ((t /= d / 2) < 1) {
            return (c / 2) * Math.pow(2, 10 * (t - 1)) + b;
        }

        return (c / 2) * (-Math.pow(2, -10 * --t) + 2) + b;
    };

    isloggedin;
    pathname = window.location.pathname;
    url = Constants.baseUrl;
    //Category
    categoryList = [];

    //Search
    searchValue;

    //Product
    productList = [];
    @Output() valueChange = new EventEmitter();

    //Cart
    cartList = [];
    totalAmount = 0;
    languages = [];
    user_name;
    logoImg;
    value;
    subTypeList = [];
    settingData: any;

    ngOnInit(): void {
        this.category.GetSubType().subscribe((res) => {
            if (res['success']) {
                this.subTypeList = res['data']
            }
        })

        this.accountService.GetSettings().subscribe((res) => {
            if (res['success']) {
                this.settingData = res['data'];
                this.logoImg = this.url + res['data']['site_logo'];
            }
        });
        // ngx scroll
        this.translate.use(validLanguage(localStorage.getItem('locale')));
        this.pageScrollService.scroll({
            document: this.document,
            scrollTarget: '.theEnd',
        });
        this.isloggedin = localStorage.getItem('isLoggedIn');
        this.category.CategoryByType().subscribe((res) => {
            this.categoryList = res['data'];

        });
        this.cartAll();

        this.languageService.getLanguage().subscribe(res => {
            this.languages = res['data'];
        })

        if (this.isloggedin) {
            this.profile.getNotificationList().subscribe(res => {
                let i = res.unread_count;
                if (i > 0) {
                    this.notifyCount = i;
                }
            })
        }

        this.value = localStorage.getItem('language');
        this.user_name = localStorage.getItem('user_name');
    }



    changeLanguage(val) {

        if (this.isloggedin) {
            this.value = val;
            localStorage.setItem('locale', val);
            this.translate.use(validLanguage(localStorage.getItem('locale')));
            this.languageService.updateLanguage(val).subscribe(res => {
                this.value = res['data'].language;
            })
        }
        else {
            this.value = val;
            localStorage.setItem('locale', val);
            this.translate.use(validLanguage(localStorage.getItem('locale')));
            this.languageService.GuestUpdateLanguage(val).subscribe(res => {
                this.value = res['data'].language;
            })
        }

    }

    //Logout
    LogOut() {
        this.authService.LogOut().subscribe((data) => {
            if (data['success']) {
                this.helper.LogOut();
            }
        });
    }

    //Search
     //search
     Search() {
        localStorage.setItem('search',this.searchValue)
    }


    //Cart
    cartAll() {
        this.cartList = [];
        if (this.isloggedin) {
            this.cart.CartAll().subscribe((res) => {
                // this.cartList = res['data'];
                let data = res['data']
                data.forEach(element => {
                  if(element.product_id != null) {
                      this.cartList.push(element)
                  } 
                });
                this.totalAmount = 0;
                this.cartList.forEach((element) => {
                    element.total_price =
                        element.quantity *
                        element.product_id.available_price[element.price_id];
                    this.totalAmount = this.totalAmount + element.total_price;
                });
            });
        }
        else {
            this.cart.GuestCartAll().subscribe((res) => {
                this.cartList = res['data'];
                this.totalAmount = 0;
                this.cartList.forEach((element) => {
                    element.total_price =
                        element.quantity *
                        element.product_id.available_price[element.price_id];
                    this.totalAmount = this.totalAmount + element.total_price;
                });
            });
        }

    }
    removeCart(val) {
        if (this.isloggedin) {
            this.cart.RemoveCart(val._id).subscribe((res) => {
                if (res['success']) {
                    this.totalAmount =
                        this.totalAmount - val.price_id * val.quantity;
                    this.cartAll();
                }
            });
        }
        else {
            this.cart.GuestRemoveCart(val._id).subscribe((res) => {
                if (res['success']) {
                    this.totalAmount =
                        this.totalAmount - val.price_id * val.quantity;
                    this.cartAll();
                }
            });
        }
    }

    //catname
    categoryName(val) {
        localStorage.setItem('catname', val)
    }

    //imagechange on mouseover

    dropImage;

    imagechange(val) {
        this.category.GetType().subscribe((res) => {
            let data = res['data'];
            data.forEach(element => {
                if (element.name == val) {
                    this.dropImage = this.url + element.file[0].path;
                }
            });
        });
    }

}
