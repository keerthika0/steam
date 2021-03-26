import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { NzCarouselComponent } from 'ng-zorro-antd/carousel';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HeaderComponent } from 'src/app/shared/header/header.component';
declare var $: any;
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Constants } from 'src/app/shared/constants/constants';
import { TranslateService } from '@ngx-translate/core';
import { validLanguage } from 'src/app/helpers/languages';

@Component({
    selector: 'app-productgrid',
    templateUrl: './productgrid.component.html',
    styleUrls: ['./productgrid.component.less'],
})
export class ProductgridComponent implements OnInit {
    @ViewChild('myChild') private myChild: HeaderComponent;
    // validateForm!: FormGroup;

    // submitForm(): void {
    //     for (const i in this.validateForm.controls) {
    //         this.validateForm.controls[i].markAsDirty();
    //         this.validateForm.controls[i].updateValueAndValidity();
    //     }
    // }
    sortValue = 0;
    rangeValue = [0, 5000];
    range = [0, 5000];
    minrange;
    maxrange;
    formatter(rangeValue: number): string {
        return '€' + `${rangeValue}`;
    }
    // NZ Zorro Carousel
    @ViewChild(NzCarouselComponent, { static: false })
    myCarousel: NzCarouselComponent;

    categoryValue = 'All';
    brandValue = 'A';
    //Product
    listOfData = [];
    productListofData = [];
    isLoading = false;
    url = Constants.baseUrl;
    userId = localStorage.getItem('userId');
    isloggedin = localStorage.getItem('isLoggedIn');
    //Counter
    showcount = true;
    carouselProduct = [];

    //Category
    categoryList = [];


    //routePrams
    category_id;
    resultData = [];
    typeList = [];
    searchValue;
    cattype;
    id;
    type;
    sub_type;
    //dynamic
    public sub_cat_id;

    price_amount1 = new FormControl(null, [Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]);

    constructor(
        private product: ProductService,
        private category: CategoryService,
        private wish: WishlistService,
        private carts: CartService,
        private message: NzMessageService,
        private router: Router,
        private route: ActivatedRoute,
        private translate: TranslateService
    ) { }

    ngOnInit(): void {
        this.translate.use(validLanguage(localStorage.getItem('locale')));

        this.minRange();
        this.category_id = this.route.snapshot.paramMap.get('id');
        this.blockTag();

        this.categorys();

        this.category.GetType().subscribe((res) => {
            this.typeList = res['data'];
        });

        if (this.category_id != null) {
            this.route.params.subscribe((routeParams) => {
                this.sampleitem = [];
                this.listOfData = [];
                this.product_array = [];
                this.cattype = routeParams.type;
                if (this.router.url == '/grid/' + routeParams.id + '/' + routeParams.type +'/'+ routeParams.subtype) {
                    this.product_array = [];
                    this.id = routeParams.id == 'type'?null: routeParams.id == 'search'?null:routeParams.id;
                    this.type = routeParams.type;
                    this.sub_type = routeParams.subtype
                    this.categoryList = [];
                    if (routeParams.id != 'type' && routeParams.id !== 'search') {
                        this.productListbyLimit(routeParams.id,null,routeParams.type,null,null,routeParams.subtype,0,5000)
                         this.sub_cat_id = localStorage.getItem('catname');
                        this.categoryValue = routeParams.id;
                         this.category.CategoryByType().subscribe((res) => {
                            this.categoryList = res['data'];
                            this.categoryList = this.categoryList[routeParams.type];
                        });
                    } else if (routeParams.id !== 'search') {
                        this.sub_cat_id = routeParams.type;
                        // this.productByType(routeParams.type);
                        this.productListbyLimit(null,null,routeParams.type,null,null,null,0,5000)
                        this.category.CategoryByType().subscribe((res) => {
                            this.categoryList = res['data'];
                            this.categoryList = this.categoryList[routeParams.type];
                        });
                    } else {
                        this.type = null;
                        this.searchValue = localStorage.getItem('search');
                        this.productListbyLimit(null,this.searchValue,null,null,null,null,0,5000)
                      
                        this.categorys();
                        }
                }
                else if(this.router.url == '/grid/' + routeParams.id + '/' + routeParams.type){
                    this.product_array = [];
                    this.id = routeParams.id == 'type'?null: routeParams.id == 'search'?null:routeParams.id;
                    this.type = routeParams.type;
                    this.sub_type = routeParams.subtype
                     if (routeParams.id !== 'search') {
                        this.sub_cat_id = routeParams.type;
                         this.productListbyLimit(null,null,routeParams.type,null,null,null,0,5000)
                        this.category.CategoryByType().subscribe((res) => {
                            this.categoryList = res['data'];
                            this.categoryList = this.categoryList[routeParams.type];
                        });
                    } else if(routeParams.id == 'search') {
                        this.type = null;
                        this.searchValue = localStorage.getItem('search');
                        this.productListbyLimit(null,this.searchValue,null,null,null,null,0,5000)
                      
                        this.categorys();
                        }
                    else{
                        this.productListbyLimit(null,null,routeParams.type,null,null,null,0,5000)
                      
                        this.sub_cat_id = localStorage.getItem('catname');
                        this.categoryValue = 'All';
                         this.category.CategoryByType().subscribe((res) => {
                            this.categoryList = res['data'];
                            this.categoryList = this.categoryList[routeParams.type];
                        });
                   
                   
                    }
                }
                   
            });

        } else {
            this. productListbyLimit(null,null,null,null,null,null,0,0);
            // this.productList();
          }


    }
    index = 1;
    size = 12;
    sampleitem = [];
    product_array = [];
    eventchange(pagenumber, si) {
        if (this.listOfData.length > 0) {
            this.sampleitem = this.listOfData.slice((pagenumber - 1) * si, pagenumber * si);
        }
    }
    productList() {
        this.listOfData = [];
        this.sampleitem = [];
        this.product.ProductAll().subscribe((res) => {
            if (res['success']) {
                for (let i = 0; i < res['data'].length; i++) {
                    if(res['data'][i].stock_count !=  0){
                        this.listOfData.push(res['data'][i])
                    }
                }
                for(let i= 0 ; i< this.listOfData.length;i++){
                    this.listOfData[i].iswishlisted = false;
                    this.listOfData[i].productcount = 1;
                    for(let j = 0; j< this.listOfData[i].stock_count.length ; j++){
                    if(this.listOfData[i].stock_count[j] != 0 ){
                        this.listOfData[i].price_id = j;
                         break;
                    }
                }
                this.listOfData[i].available_price[0] = this.listOfData[i].available_price[this.listOfData[i].price_id];
                this.listOfData[i].price[0] = this.listOfData[i].price[this.listOfData[i].price_id];
               
                // this.listOfData[i].price_id = 0;
                let products = this.listOfData[i].wishlist;
                for (let j = 0; j < products.length; j++) {
                    this.listOfData[i].id = i;
                    if (products[j] == this.userId) {
                        this.listOfData[i].iswishlisted = true;
                    }
                 }
                }
                
                this.productListofData = this.listOfData;
                this.listOfData.forEach(element => {
                    this.product_array.push(element);
                    this.sampleitem.push(element);
                });
            }
        });
    }

    product_count;
    isLoader = false;
    sortprice;
    sortval;
    ind;
    productListbyLimit(id, key, type, curid, limit, sub_type, min, max) {
        this.isLoader = true;
        this.listOfData = [];
        this.sampleitem = [];
        let val = {
            key: key,
            type: type,
            curid: curid,
            limit: limit,
            id: id == 'All' ? null : id,
            sub_type: sub_type,
            min: min == undefined ? '0' :min == ''?'0': min.toString(),
            max: max == undefined ? '5000' : max == '0' ? '5000' :min == ''?'5000': max

        }
        this.product.ProductByLimit(val).subscribe((res) => {
            if (res['success']) {
                this.product_count = res['counts'];
                for (let i = 0; i < res['data'].length; i++) {
                    if (res['data'][i].stock_count != 0) {
                        this.listOfData.push(res['data'][i])
                    }
                }
                for (let i = 0; i < this.listOfData.length; i++) {
                    this.listOfData[i].iswishlisted = false;
                    this.listOfData[i].productcount = 1;
                    let priceid = 0;
                    this.sortprice = this.listOfData[i].available_price;
                    this.sortval = this.listOfData[i].available_price[priceid];
                    this.ind;
                    let minvalue = 0;
                    for (let x = 0; x < this.sortprice.length; x++) {
                        if (this.minrange != 0) {
                            if (this.sortprice[x] >= this.minrange && this.listOfData[i].stock_count[x] != 0) {
                                if (minvalue != 0) {
                                    if (this.sortprice[x] <= minvalue) {
                                        minvalue = this.sortprice[x];
                                        this.sortval = this.sortprice[x];
                                        this.ind = x;
                                        this.listOfData[i].price_id = this.ind;
                                    }
                                }
                                else {
                                    if (this.listOfData[i].stock_count[x] != 0) {
                                        minvalue = this.sortprice[x]
                                        this.sortval = this.sortprice[x];
                                        this.ind = x;
                                        this.listOfData[i].price_id = this.ind;

                                    }
                                }

                            }
                        }
                        else if (this.sortprice[x] <= this.sortval && this.listOfData[i].stock_count[x] != 0) {
                            this.sortval = this.sortprice[x];
                            this.ind = x;
                            this.listOfData[i].price_id = this.ind;
                        }
                    }
                    //   for(let j = 0; j< this.listOfData[i].stock_count.length ; j++){
                    //     if(this.listOfData[i].stock_count[j] != 0){
                    //         this.listOfData[i].price_id = j;
                    //          break;
                    //     }
                    // }
                    let products = this.listOfData[i].wishlist;
                    for (let j = 0; j < products.length; j++) {
                        this.listOfData[i].id = i;
                        if (products[j] == this.userId) {
                            this.listOfData[i].iswishlisted = true;
                        }
                    }
                    this.listOfData[i].available_price[0] = this.listOfData[i].available_price[this.listOfData[i].price_id];
                    this.listOfData[i].price[0] = this.listOfData[i].price[this.listOfData[i].price_id];
                }

                this.listOfData.forEach(element => {
                    this.product_array.push(element);
                    this.sampleitem.push(element);
                });
                this.isLoader = false;
            }
        }, (err) => {
            this.isLoader = false;
        });
    }

    productPrevious(){
         this.product_array = this.product_array.slice(0,-12);
         let arr = this.product_array;
            this.sampleitem = arr.slice(-12)
    }

    categorys() {
        this.category.CategoryAll().subscribe((res) => {
            let list = [];
            list = res['data'];
            this.categoryList = [];
            list.forEach((element) => {
                if (element.status == true) {
                    this.categoryList.push(element);
                }
            });
        });
        // this.ProductAll();
    }

    blockTag() {
        $('.open-item').click(function () {
            if ($(this).hasClass('closetag')) {
                $('.block-tag').animate(
                    {
                        height: '108px',
                    },
                    500,
                    function () { }
                );
                $(this).addClass('opentag');
                $(this).removeClass('closetag');
            } else {
                $('.block-tag').animate(
                    {
                        height: '54px',
                    },
                    500,
                    function () { }
                );
                $(this).addClass('closetag');
                $(this).removeClass('opentag');
            }
        });
    }
    AddProduct = false;
    //Product Count
    Addcount(i) {
        if (
            this.listOfData[i].stock_count[this.listOfData[i].price_id] <
            this.listOfData[i].productcount + 1
        ) {
            this.message.error(
                this.translate.instant('AddQuantityError') +
                this.listOfData[i].stock_count[this.listOfData[i].price_id]
            );
            this.AddProduct = true;
        } else {
            this.AddProduct = false;
            this.listOfData[i].productcount =
                this.listOfData[i].productcount + 1;
        }
    }
    Removecount(i) {
        if (this.listOfData[i].productcount == 1) {
            this.showcount = false;
        } else {
            this.listOfData[i].productcount =
                this.listOfData[i].productcount - 1;
        }
    }
    productByCategory(id, val) {
           this.isLoader = true;
        this.sampleitem = [];
        this.product_array = [];
         if (id == 'All') {
            if(this.cattype == 'WOMEN' || this.cattype == 'MEN' || this.cattype == 'COMMUNION' || this.cattype == 'BABYBORN'){
                this.sub_cat_id = id;
                this.categoryValue = id;
                // this.productByType(this.cattype);
                this.productListbyLimit(null,null,this.cattype,null,null,null,0,5000)
            }
            else{
                this.categoryValue = id;
                this.sub_cat_id = id;
                this.productList();
            }
        }
        else if(val != 'WOMEN' && val != 'MEN' && val != 'COMMUNION' && val != 'BABYBORN'){
            this.listOfData = [];
            this.productListofData = [];
            this.productListbyLimit(id,null,null,null,null,null,0,5000)
        }
         else {
             this.listOfData = [];
               this.categoryValue = id;
               this.productListbyLimit(this.categoryValue,null,val,null,null,null,0,5000)
            // this.product.ProductByCategory(id, val).subscribe((res) => {
            //     // this.listOfData = res['data'];
            //     // this.sampleitem = this.listOfData;
            //     if (res['success']) {
            //         for (let i = 0; i < res['data'].length; i++) {
            //             if(res['data'][i].stock_count !=  0){
            //                 this.listOfData.push(res['data'][i])
            //             }
            //         }
            //         for(let i= 0 ; i< this.listOfData.length;i++){
            //             this.listOfData[i].iswishlisted = false;
            //         this.listOfData[i].productcount = 1;
            //         for(let j = 0; j< this.listOfData[i].stock_count.length ; j++){
            //             if(this.listOfData[i].stock_count[j] != 0){
            //                 this.listOfData[i].price_id = j;
            //                  break;
            //             }
            //         }
            //         this.listOfData[i].available_price[0] = this.listOfData[i].available_price[this.listOfData[i].price_id];
            //         this.listOfData[i].price[0] = this.listOfData[i].price[this.listOfData[i].price_id];
                   
            //         // this.listOfData[i].price_id = 0;
            //         let products = this.listOfData[i].wishlist;
            //         for (let j = 0; j < products.length; j++) {
            //             this.listOfData[i].id = i;
            //             if (products[j] == this.userId) {
            //                 this.listOfData[i].iswishlisted = true;
            //             }
            //          }
            //         }
                    
            //         this.productListofData = this.listOfData;
            //          this.sampleitem = this.listOfData;
            //          this.isLoader = false;
            //         // setTimeout(() => {
            //         //     this.eventchange(1, 12)
            //         // }, 1000);
            //     }
            // });
        }
    }

    productByType(id) {
        this.listOfData = [];
        this.product.ProductByType(id).subscribe((res) => {
            // this.listOfData = res['data'];
            if (res['success']) {
                for (let i = 0; i < res['data'].length; i++) {
                    if(res['data'][i].stock_count !=  0){
                        this.listOfData.push(res['data'][i])
                    }
                }
                for(let i= 0 ; i< this.listOfData.length;i++){
                    this.listOfData[i].iswishlisted = false;
                this.listOfData[i].productcount = 1;
                for(let j = 0; j< this.listOfData[i].stock_count.length ; j++){
                    if(this.listOfData[i].stock_count[j] != 0){
                        this.listOfData[i].price_id = j;
                         break;
                    }
                }
                this.listOfData[i].available_price[0] = this.listOfData[i].available_price[this.listOfData[i].price_id];
                this.listOfData[i].price[0] = this.listOfData[i].price[this.listOfData[i].price_id];
               
                // this.listOfData[i].price_id = 0;
                let products = this.listOfData[i].wishlist;
                for (let j = 0; j < products.length; j++) {
                    this.listOfData[i].id = i;
                    if (products[j] == this.userId) {
                        this.listOfData[i].iswishlisted = true;
                    }
                 }
                }
                
                this.productListofData = this.listOfData;
                //  this.sampleitem = this.listOfData;
                setTimeout(() => {
                    this.eventchange(1, 12)
                }, 1000);
            }
        });
    }

    ProductAll() {
        this.product.ProductAll().subscribe((res) => {
            let listdata = res['data'];
            listdata = listdata.reverse();
            if (res['success']) {
                for (let i = 0; i < listdata.length; i++) {
                    if (listdata[i].stock_available == true) {
                        this.carouselProduct.push(listdata[i]);
                    }
                }
                for (let i = 0; i < this.carouselProduct.length; i++) {
                    this.carouselProduct[i].iswishlisted = false;
                    this.carouselProduct[i].productcount = 1;
                    this.carouselProduct[i].price_id = 0;
                    let products = this.carouselProduct[i].wishlist;
                    for (let j = 0; j < products.length; j++) {
                        if (products[j] == this.userId) {
                            this.carouselProduct[i].iswishlisted = true;
                        }
                    }
                }
            }
        });
    }

    //Cart
    addCart(data, i) {
        if (this.isloggedin) {
            this.carts
                .AddCart({
                    id: data._id,
                    price_id: this.listOfData[i].price_id,
                    qty: this.listOfData[i].productcount,
                })
                .subscribe((res) => {
                    this.isLoading = true;
                    if (res['success']) {
                        this.message.success(res['message']);
                        this.myChild.ngOnInit();
                        this.isLoading = false;
                        this.cartAll();
                        // location.reload();
                    } else {
                        this.isLoading = false;
                    }
                });

        }
        else {
            this.carts
                .GuestAddCart({
                    id: data._id,
                    price_id: this.listOfData[i].price_id,
                    qty: this.listOfData[i].productcount,
                })
                .subscribe((res) => {
                    this.isLoading = true;
                    if (res['success']) {
                        this.message.success(res['message']);
                        this.myChild.ngOnInit();
                        this.isLoading = false;
                        this.cartAll();
                        // location.reload();
                    } else {
                        this.isLoading = false;
                    }
                });

        }

    }
    addPremiumCart(data, i) {
        if (this.isloggedin) {
            this.carts
                .AddCart({
                    id: data._id,
                    price_id: data.price_id,
                    qty: data.productcount,
                })
                .subscribe((res) => {
                    this.isLoading = true;
                    if (res['success']) {
                        this.message.success(res['message']);
                        this.isLoading = false;
                        this.myChild.ngOnInit();
                        this.cartAll();
                    } else {
                        this.isLoading = false;
                    }
                });

        }
        else {
            this.carts
                .GuestAddCart({
                    id: data._id,
                    price_id: data.price_id,
                    qty: data.productcount,
                })
                .subscribe((res) => {
                    this.isLoading = true;
                    if (res['success']) {
                        this.message.success(res['message']);
                        this.isLoading = false;
                        this.myChild.ngOnInit();
                        this.cartAll();
                    } else {
                        this.isLoading = false;
                    }
                });

        }
    }

    cartAll() {
        if (this.isloggedin) {
            this.carts.CartAll().subscribe((res) => { });
        }
        else {
            this.carts.GuestCartAll().subscribe((res) => {
            });
        }
    }
    //WishList
    addWish(data, i) {
        this.wish.WishAdd(data._id).subscribe((res) => {
            if (res['success']) {
                this.message.success(res['message']);
                this.listOfData[i].iswishlisted = true;
            }
        });
    }

    removeWish(data, i) {
        this.wish.WishDelete(data._id).subscribe((res) => {
            if (res['success']) {
                this.message.success(res['message']);
                this.listOfData[i].iswishlisted = false;
            }
        });
    }

    //Range slider
    sliderrange = [];
    rangeSort(min, max) {
         this.sliderrange = [];
         this.sampleitem = [];
         this.listOfData = [];
          if ((this.minrange == 0 || this.minrange == undefined) && (this.maxrange == 0 || this.maxrange == undefined)) {
            this.sampleitem = this.productListofData;
            this.listOfData = this.sampleitem;
        }
      else if ((this.minrange == 0 || this.minrange == undefined) && this.maxrange != 0) {
             for (let i = 0; i < this.productListofData.length; i++) {
                if (this.productListofData[i].available_price[0] <= max) {
                    this.sampleitem.push(this.productListofData[i]);
                }
            }
        }
        else if ((this.maxrange == 0 || this.maxrange == undefined) && this.minrange != 0) {
             for (let i = 0; i < this.productListofData.length; i++) {
                if (this.productListofData[i].available_price[0] >= min) {
                    this.sampleitem.push(this.productListofData[i]);
                }
            }
        }
        else {
             for (let i = 0; i < this.productListofData.length; i++) {
                if (this.productListofData[i].available_price[0] >= min &&  this.productListofData[i].available_price[0] <= max) {
                    this.sampleitem.push(this.productListofData[i])
                }
            }
        }
        this.listOfData = this.sampleitem;
    }

    clearSort() {
        this.minrange = 0;
        this.maxrange = 0;
        this.sliderrange = [];
        this.categoryValue = 'All';
        this.isSort = false;
       this.ngOnInit();
    }

    getCatname(val) {
        this.categoryList.forEach(element => {
            if (element._id == val) {
                localStorage.setItem('catname', element.name);
                this.sub_cat_id = localStorage.getItem('catname')
            }
        });
    }

    isSort = false;
    sort(id,searValue,type,curid,limit,subtype,minrange,maxrange){
        let catid = id == 'All'?null:id;
         this.isSort = true;
         if(this.maxrange < this.minrange){
            this.message.error( this.translate.instant('invalidrange')
            )
        }
        else{
            this.productListbyLimit(catid,searValue,type,curid,limit,subtype,minrange,maxrange)
  
        }
    }
   
    minRange(){
        this.minrange = this.minrange == null ? '' : this.minrange;
        if (this.minrange != null) {
            if (!this.minrange.toString().includes('-')) {
                this.minrange = this.minrange < 0 ? 0 : this.minrange;
            }
            else {
                this.minrange = null;
             }
        }
        // else{
        //     this.minrange = 0;
        // }
      
    }

    maxRange() {
        this.maxrange = this.maxrange == null ? '' : this.maxrange;
        if (this.maxrange != null) {
            if (!this.maxrange.toString().includes('-')) {
                this.maxrange = this.maxrange < 0 ? 0 : this.maxrange;
            }
            else {
                this.maxrange = 5000;
            }
        }
    }

}
