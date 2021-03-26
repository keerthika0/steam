import { Component, OnInit, ViewChild } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
declare var $: any;
import { NzMessageService } from 'ng-zorro-antd/message';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { Constants } from 'src/app/shared/constants/constants';
import { WishlistService } from 'src/app/services/wishlist.service';
import { TranslateService } from '@ngx-translate/core';
import { validLanguage } from 'src/app/helpers/languages';

@Component({
    selector: 'app-guestcart',
    templateUrl: './guestcart.component.html',
    styleUrls: ['./guestcart.component.less']
})
export class GuestcartComponent implements OnInit {

    @ViewChild('myChild') private myChild: HeaderComponent;

    isCheckoutSignIn = false;

    //Cart
    cartList = [];
    totalAmount = 0;
    delivery_fee = 0;
    quantityIssue = false;
    productNotAvailable = false;
    url = Constants.baseUrl;
    isloggedin;
    constructor(
        private cart: CartService,
        private message: NzMessageService,
        private wish: WishlistService,
        private translate:TranslateService
    ) { }

    

    ngOnInit(): void {

        this.translate.use(validLanguage(localStorage.getItem('locale')));

        this.isloggedin = localStorage.getItem('isLoggedIn');

        this.quantitySelector();
        this.cartAll();
    }

    quantitySelector() {
        var minVal = 1,
            maxVal = 20;
        $('.increaseQty').on('click', function () {
            var $parentElm = $(this).parents('.qtySelector');
            $(this).addClass('clicked');
            setTimeout(function () {
                $('.clicked').removeClass('clicked');
            }, 100);
            var value = $parentElm.find('.qtyValue').val();
            if (value < maxVal) {
                value++;
            }
            $parentElm.find('.qtyValue').val(value);
        });
        $('.decreaseQty').on('click', function () {
            var $parentElm = $(this).parents('.qtySelector');
            $(this).addClass('clicked');
            setTimeout(function () {
                $('.clicked').removeClass('clicked');
            }, 100);
            var value = $parentElm.find('.qtyValue').val();
            if (value > 1) {
                value--;
            }
            $parentElm.find('.qtyValue').val(value);
        });
    }

    priceInd = 0;

    //Cart
    cartAll() {
        if (this.isloggedin == 'true') {
            this.cart.CartAll().subscribe((res) => {
                // this.cartList = res['data'];
                let data = res['data']
                // data.forEach(element => {
                //   if(element.product_id != null) {
                //       this.cartList.push(element)
                //   } 
                // });
                this.cartList = res['data']
                this.totalAmount = 0;
                this.cartList.forEach((element) => {
                    if(element.product_id != null){
                        if (element.product_id.stock_count < element.quantity) {
                            this.quantityIssue = true;
                        }
                        if (
                            element.product_id.deleted == true ||
                            element.product_id.status == false
                        ) {
                            this.productNotAvailable = true;
                        }
                        element.total_price =
                            element.quantity *
                            element.product_id.available_price[element.price_id];
                        this.totalAmount = this.totalAmount + element.total_price;
                    }
                   
                });
                if (this.totalAmount > res['delivery_fee'].order_price) {
                    this.delivery_fee = res['delivery_fee'].delivery_fee_above_min;
                } else {
                    this.delivery_fee = res['delivery_fee'].delivery_fee_below_min;
                }
            });

        }
        else {
            this.cart.GuestCartAll().subscribe((res) => {
                this.cartList = res['data'];
                 this.totalAmount = 0;
                this.cartList.forEach((element) => {
                    if (element.product_id.stock_count < element.quantity) {
                        this.quantityIssue = true;
                    }
                    if (
                        element.product_id.deleted == true ||
                        element.product_id.status == false
                    ) {
                        this.productNotAvailable = true;
                    }
                    element.total_price =
                        element.quantity *
                        element.product_id.available_price[element.price_id];
                    this.totalAmount = this.totalAmount + element.total_price;
                });
                if (this.totalAmount > res['delivery_fee'].order_price) {
                    this.delivery_fee = res['delivery_fee'].delivery_fee_above_min;
                } else {
                    this.delivery_fee = res['delivery_fee'].delivery_fee_below_min;
                }
            });

        }
    }
   
    removeCart(val) {
        if (this.isloggedin == 'true') {
            this.cart.RemoveCart(val._id).subscribe((res) => {
                if (res['success']) {
                    this.totalAmount =
                    this.totalAmount - val.price_id * val.quantity;
                    this.quantityIssue = false;
                    this.myChild.ngOnInit();
                    this.cartAll();
                    //   this.header.ngOnInit();
                }
            });

        }
        else {
            this.cart.GuestRemoveCart(val.product_id._id).subscribe((res) => {
                if (res['success']) {
                    this.totalAmount =
                        this.totalAmount - val.price_id * val.quantity;
                    this.quantityIssue = false;
                    this.myChild.ngOnInit();
                    this.cartAll();
                    //   this.header.ngOnInit();
                }
            });

        }

    }
    addWish(data) {
        this.wish.WishAdd(data.product_id._id).subscribe((res) => {
            if (res['success']) {
                this.removeCart(data);
                this.message.success(res['message']);
            }
        });
    }

    increaseCart(i) {
        if (this.isloggedin == 'true') {
            if(  this.cartList[i].product_id.stock_count[this.cartList[i].price_id] > this.cartList[i].quantity){
             this.cart
                .IncreaseCart(this.cartList[i]._id)
                .subscribe((res) => {
                    if (res['success']) {
                        this.quantityIssue = false; 
                        this.ngOnInit();
                    }
                });
            }
            else{
                this.message.error(this.translate.instant('AddQuantityError') +
                this.cartList[i].product_id.stock_count[this.cartList[i].price_id])
            }
        }
        else {
             if(  this.cartList[i].product_id.stock_count[this.cartList[i].price_id] > this.cartList[i].quantity){
            this.cart
                .GuestIncreaseCart(this.cartList[i]._id)
                .subscribe((res) => {
                    if (res['success']) {
                         this.quantityIssue = false;
                        this.ngOnInit();
                    }
                });
            }
            else{
                this.message.error(this.translate.instant('AddQuantityError') +
                this.cartList[i].product_id.stock_count[this.cartList[i].price_id])
            }
        }
    }
    AddProduct = false;
    decreaseCart(i) {
        if (this.isloggedin == 'true') {
            this.cart
                .DecreaseCart(this.cartList[i]._id)
                .subscribe((res) => {
                    if (res['success']) {
                        this.quantityIssue = false;
                        this.ngOnInit();
                    }
                });
        }
        else {
            this.cart
                .GuestDecreaseCart(this.cartList[i]._id)
                .subscribe((res) => {
                    if (res['success']) {
                        this.quantityIssue = false;
                        this.ngOnInit();
                    }
                });
        }

    }

}
