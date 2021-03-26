import { Component, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { AuthService } from 'src/app/services/auth.service';
import { HelperService } from 'src/app/services/helper.service';
import { CartService } from 'src/app/services/cart.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { PageScrollService, EasingLogic } from 'ngx-page-scroll-core';
import { DOCUMENT } from '@angular/common';
import { Constants } from 'src/app/shared/constants/constants';
import { TranslateService } from '@ngx-translate/core';
import { validLanguage } from 'src/app/helpers/languages';
import { LanguageService } from 'src/app/services/language.service';
import { ProfileService } from '../../services/profile.service';
import { AccountService } from '../../services/account.service';

declare var $: any;

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less'],
})
export class HeaderComponent implements OnInit {
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
        private category: CategoryService,
        private product: ProductService,
        private cart: CartService,
        private authService: AuthService,
        private router: Router,
        private helper: HelperService,
        private pageScrollService: PageScrollService,
        private translate: TranslateService,
        private languageService: LanguageService,
        private profile: ProfileService,
        private accountService: AccountService,
        private route: ActivatedRoute,
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
    path;
    url = Constants.baseUrl;
    //Category
    categoryList = [];

    //Product
    productList = [];
    listOfData = [];
    productListofData = [];
    userId = localStorage.getItem('userId');
    headerImage;

    @Output() valueChange = new EventEmitter();

    //search
    searchTextChanged = new Subject<string>();
    searchValue = '';
    @Output() textvalue = new EventEmitter();

    languages = [];
    getLanguage = [];
    value;
    //Cart
    cartList = [];
    totalAmount = 0;
    logoImg;
    public user_name: string;
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
                this.settingData = res['data']
                this.logoImg = this.url + res['data']['site_logo'];
            }
        });

        // ngx scroll
        this.pageScrollService.scroll({
            document: this.document,
            scrollTarget: '.theEnd',
        });

        // this.languages=langDropDown;
        this.languageService.getLanguage().subscribe(res => {
            this.languages = res['data'];
        })

        // this.navMenu();
        this.isloggedin = localStorage.getItem('isLoggedIn');
        this.cartAll();

        this.category.CategoryByType().subscribe((res) => {
            this.categoryList = res['data'];
        });
        this.route.params.subscribe((routeParams) => {
            if (this.router.url == '/grid/type/' + routeParams.type) {
                this.category.GetType().subscribe((res) => {
                    let data = res['data'];
                    data.forEach(element => {
                        if (element.name == routeParams.type) {
                            this.headerImage = this.url + element.header_image[0].path;
                        }
                    });
                });
            }
            else if (this.router.url == '/grid/' + routeParams.id + '/' + routeParams.type + '/' + routeParams.subtype && (routeParams.id != 'type' && routeParams.id != 'search')) {
                this.category.CategoryByType().subscribe((res) => {
                    this.categoryList = res['data'];
                    for (let i = 0; i < this.categoryList[routeParams.type].length; i++) {
                        if (this.categoryList[routeParams.type][i]._id == routeParams.id) {
                            if (this.categoryList[routeParams.type][i].header_image.length > 0) {
                                this.headerImage = this.url + this.categoryList[routeParams.type][i].header_image[0].path;
                            }
                            else {
                                this.headerImage = "../../../assets/style/css/images/banner-background/background3.png"

                            }
                        }
                    }

                });

            }
            else {
                this.headerImage = "../../../assets/style/css/images/banner-background/background3.png"
            }

        });

        this.translate.use(validLanguage(localStorage.getItem('locale')));
        this.value = localStorage.getItem('language');
        this.user_name = localStorage.getItem('user_name');
        if (this.isloggedin) {
            this.profile.getNotificationList().subscribe(res => {
                // this.notifyCount=res.unread_count;
                let i = res.unread_count;
                if (i > 0) {
                    this.notifyCount = i;
                }

            })

        }

    }

    categoryName(val) {
        localStorage.setItem('catname', val)
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


    //search
    Search() {
        this.searchTextChanged.next(this.searchValue);
        localStorage.setItem('search',this.searchValue)
    }

    //Logout
    LogOut() {
        this.authService.LogOut().subscribe((data) => {
            if (data['success']) {
                this.helper.LogOut();
                this.close();
            }
        });
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
