import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $: any;
import { NzMessageService } from 'ng-zorro-antd/message';
import { CartService } from 'src/app/services/cart.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { validLanguage } from 'src/app/helpers/languages';
import { AccountService } from 'src/app/services/account.service';

@Component({
    selector: 'app-guestcheckout',
    templateUrl: './guestcheckout.component.html',
    styleUrls: ['./guestcheckout.component.less'],
})
export class GuestcheckoutComponent implements OnInit {
    deliValue = 'NORMAL';
    addPayment!: FormGroup;
    addAddress!: FormGroup;
    isShow = false;
    //Payment balance
    cartList = [];
    totalAmount;
    quantityIssue = false;
    productNotAvailable = false;
    delivery_fee;

    //card
    minyear = new Date().getFullYear();
    maxyear = new Date().getFullYear() + 20;
    minmonth = new Date().getMonth() + 1;
    address;
    card;
    payMethod ;
    settingData:any;

    addAddressSubmit(): void {
        for (const i in this.addAddress.controls) {
            this.addAddress.controls[i].markAsDirty();
            this.addAddress.controls[i].updateValueAndValidity();
        }
        if (this.addAddress.valid) {
            let val = {
                user_name: this.addAddress.value.name,
                mobile: this.addAddress.value.mobileNumber,
                alt_mobile: this.addAddress.value.alternatemobile,
                landmark: this.addAddress.value.landmark,
                pincode: this.addAddress.value.pincode,
                address: this.addAddress.value.address,
                locality: this.addAddress.value.locality,
                city: this.addAddress.value.city,
                state: this.addAddress.value.state,
                // address_type: this.addAddress.value.address_type,
                defaultAddress: this.addAddress.value.defaultAddress,
            };
            this.nzMessageService.success(this.translate.instant('AddAddress'));
            // this.profile.AddAddress(val).subscribe((res) => {
            //     if (res['success']) {
            //         this.nzMessageService.success(res['message']);
            //          } else {
            //         this.nzMessageService.error(res['success']);
            //     }
            // });
            this.address = val;
        }
    }
    addPaymentSubmit(): void {
        for (const i in this.addPayment.controls) {
            this.addPayment.controls[i].markAsDirty();
            this.addPayment.controls[i].updateValueAndValidity();
        }
        if (this.addPayment.valid) {
            let val = {
                number: this.addPayment.value.cardNumber,
                month: this.addPayment.value.month,
                year: this.addPayment.value.year,
                cvc: this.addPayment.value.cvv,
                name: this.addPayment.value.cardHolderName,
            };
            this.card = val;
         }
    }

    isDisable = false;

    submitOrder() {
        this.isDisable = true;
            let val = {
                address: this.address,
                card: this.card,
                delivery_type: this.deliValue,
                email: this.addAddress.value.email,
                mobile: this.addAddress.value.mobileNumber,
                payment_method: this.payMethod
            }
            this.cart.GuestOrderCreate(val).subscribe((res) => {
                if (res['success']) {
                     if(this.payMethod == 'PAYPAL'){
                        window.location.href = res.href;
                        // this.isDisable = false;
                        
                    }
                    else{
                        this.nzMessageService.success(res['message']);
                          this.router.navigate(['/grid'])
                   
                    }
                            
                    } else {
                    this.nzMessageService.error(res['message']);
                    this.isDisable = false;
                     }
            },
                (err) => {
                    this.nzMessageService.error(err.error.message);
                    this.isDisable = false;
                });


      
    }
    deliveryFee;
    cartAll() {
        this.cart.GuestCartAll().subscribe((res) => {
            let data = res['data'];
            this.cartList = [];
            data.forEach(element => {
              if(element.product_id != null) {
                  this.cartList.push(element)
              } 
            });
            // this.cartList = res['data'];
            this.deliveryFee = res['delivery_fee'];
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
            if (this.deliValue == 'NORMAL') {
                if (this.totalAmount > res['delivery_fee'].order_price) {
                    this.delivery_fee = res['delivery_fee'].delivery_fee_above_min;
                } else {
                    this.delivery_fee = res['delivery_fee'].delivery_fee_below_min;
                }
            }
            else {
                if (this.totalAmount < res['delivery_fee'].order_price) {
                    this.delivery_fee = res['delivery_fee'].delivery_fee_below_max;
                } else {
                    this.delivery_fee = res['delivery_fee'].delivery_fee_above_max;
                }
            }

        });
    }



    constructor(private fb: FormBuilder, private nzMessageService: NzMessageService, private router: Router,
        private cart: CartService, private translate: TranslateService,private accountService: AccountService) { }

    ngOnInit(): void {

        this.translate.use(validLanguage(localStorage.getItem('locale')));
        this.accountService.GetSettings().subscribe((res) => {
            if (res['success']) {
             this.settingData = res['data'];
              }
          });
        this.cartAll();
        this.deliveryAddress();
        this.paymentOption();
        this.addAddress = this.fb.group({
            email: [null, [Validators.email, Validators.required]],
            name: [
                null,
                [
                    Validators.required,
                    Validators.minLength(3),
                    // Validators.maxLength(20),
                    Validators.pattern('^[a-zA-Z ]*$'),
                ],
            ],
            mobileNumber: [
                null,
                [Validators.required, Validators.pattern('([0-9]{8,12})')],
            ],
            // address_type: [null],
            pincode: [null, [Validators.required]],
            address: [null, [Validators.required, Validators.maxLength(30)]],
            locality: [null, [Validators.required, Validators.maxLength(30)]],
            city: [null, [Validators.required, Validators.maxLength(20)]],
            state: [null, [Validators.required, Validators.maxLength(20)]],
            delivery_option: [null, [Validators.required]],

            alternatemobile: [null],
            landmark: [null],
        });
        this.addPayment = this.fb.group({
            cardHolderName: [
                null,
                [
                    Validators.required,
                    Validators.minLength(3),
                    // Validators.maxLength(20),
                    Validators.pattern('^[a-zA-Z ]*$'),
                ],
            ],
            cardNumber: [null, [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$')]],
            month: [
                null,
                [Validators.required, Validators.max(12), Validators.min(1)],
            ],
            cvv: [
                null,
                [
                    Validators.required,
                    Validators.min(100),
                    Validators.max(9999),
                ],
            ],
            year: [
                null,
                [
                    Validators.required,
                    Validators.min(this.minyear),
                    Validators.max(this.maxyear),
                ],
            ],
        });
    }

    deliveryAddress() {
        $('.delivery-address').click(function () {
            $('.hide-delivery-address').stop().slideUp(300);
            $(this).next('.hide-delivery-address').stop().slideToggle(300);
            $('.hitter').show();
        });
        $('.submit-address').click(function () {
            $('.hide-delivery-address').stop().slideUp(300);
            $(this).next('.hide-delivery-address').stop().slideToggle(300);
            $('.hitter').show();
        });

        $('.hitter').click(function () {
            $('.hide-delivery-address').stop().slideUp(300);
        });
    }

    paymentOption() {
        $('.payment-option').click(function () {
            $('.hide-payment-option').stop().slideUp(300);
            $(this).next('.hide-payment-option').stop().slideToggle(300);
            $('.hitter').show();
        });

        $('.add-card').click(function () {
            $('.hide-payment-option').stop().slideUp(300);
            $(this).next('.hide-payment-option').stop().slideToggle(300);
            $('.hitter').show();
        });

        $('.hitter').click(function () {
            $('.hide-payment-option').stop().slideUp(300);
        });
    }
}
