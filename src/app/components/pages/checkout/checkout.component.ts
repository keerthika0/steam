import { Component, OnInit, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { ProfileService } from 'src/app/services/profile.service';
import { Router } from '@angular/router';
import { CardService } from 'src/app/services/card.service';
import { HeaderComponent } from 'src/app/shared/header/header.component';
declare var $: any;
import { TranslateService } from '@ngx-translate/core';
import { validLanguage } from 'src/app/helpers/languages';
import { AccountService } from 'src/app/services/account.service';

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.less'],
})
export class CheckoutComponent implements OnInit {
    @ViewChild('myChild') private myChild: HeaderComponent;
    deliValue = 'NORMAL';

    isLoading = false;
    //Cart
    cartList = [];
    totalAmount = 0;
    coupon_discount: any = 0;
    delivery_fee = 0;
    couponapplied = false;
    coupon_details: any;
    coupon_code = '';
    //Address
    name;
    mobilenumber;
    address;
    pincode;
    city;
    state;
    default;
    locality;
    alternatemobile;
    landmark;
    address_type;
    defaultAddress;
    addressList = [];
    address_id;
    C_Code;
    payMethod;
    settingData:any;
    //Card
    minyear = new Date().getFullYear();
    maxyear = new Date().getFullYear() + 20;
    minmonth = new Date().getMonth() + 1;
    cardList = [];

    constructor(
        private router: Router,
        private nzMessageService: NzMessageService,
        private fb: FormBuilder,
        private cart: CartService,
        private profile: ProfileService,
        private card: CardService,
        private translate: TranslateService,
        private accountService: AccountService
    ) { }

    // Card Payemnt
    cardPayment = null;
    addressSelect = null;
    selectedAddress: any;
    // Remove Address
    confirm(val): void {
        this.deleteAddress(val);
    }

    // Edit Adrress -- Modal
    editisVisible = false;

    editshowModal(data, i): void {
        this.editisVisible = true;
        this.name = data.user_name;
        this.mobilenumber = data.mobile;
        this.alternatemobile = data.alt_mobile;
        this.locality = data.locality;
        this.city = data.city;
        this.state = data.state;
        this.landmark = data.landmark;
        this.address_type = data.address_type;
        this.address = data.address;
        this.pincode = data.pincode;
        this.address_id = i;
    }

    edithandleOk(): void {
        this.editisVisible = false;
    }

    edithandleCancel(): void {
        this.editisVisible = false;
    }

    // Add Adrress -- Modal
    addisVisible = false;
    quantityIssue = false;
    productNotAvailable = false;

    addshowModal(): void {
        this.addisVisible = true;
    }

    addhandleOk(): void {
        this.addisVisible = false;
        this.payMethod = null;
    }

    addhandleCancel(): void {
        this.addisVisible = false;
        this.payMethod = null;
    }

    //Place order --Modal
    placeorder = false;
    selectAddress;
    selectState;
    selectCity;
    selectLocality;
    selectPincode;

    placeshowModal() {
        if (this.addressSelect == null) {
            this.nzMessageService.error(this.translate.instant('SelectAddress'));
        } else if (this.cardPayment == null) {
            this.nzMessageService.error(this.translate.instant('SelectCardDetails'));
        } else {
            this.placeorder = true;
        }
    }

    placeOder() {
        this.placeorder = false;
    }

    placeOrderOk() {
        this.placeorder = true;
    }

    // Add Card -- Modal
    addCardVisible = false;

    addCard(): void {
        this.addCardVisible = true;
    }

    addCardhandleOk(): void {
        this.addCardVisible = false;
    }

    addCardhandleCancel(): void {
        this.addCardVisible = false;
    }

    // Form
    editvalidateForm!: FormGroup;
    addvalidateForm!: FormGroup;
    addcardvalidateForm!: FormGroup;
    editsubmitForm() {
        for (const i in this.editvalidateForm.controls) {
            this.editvalidateForm.controls[i].markAsDirty();
            this.editvalidateForm.controls[i].updateValueAndValidity();
        }
        if (this.editvalidateForm.valid) {
            let val = {
                address_id: this.address_id,
                user_name: this.editvalidateForm.value.name,
                mobile: this.editvalidateForm.value.mobileNumber,
                alt_mobile: this.editvalidateForm.value.alternatemobile,
                landmark: this.editvalidateForm.value.landmark,
                pincode: this.editvalidateForm.value.pincode,
                address: this.editvalidateForm.value.address,
                locality: this.editvalidateForm.value.locality,
                city: this.editvalidateForm.value.city,
                state: this.editvalidateForm.value.state,
                address_type: this.editvalidateForm.value.address_type,
                defaultAddress: this.editvalidateForm.value.defaultAddress,
            };
            this.profile.UpdateAddress(val).subscribe((res) => {
                if (res['success']) {
                    this.nzMessageService.success(res['message']);
                    this.editvalidateForm.reset();
                    this.editisVisible = false;
                    this.getAllAddress();
                } else {
                    this.nzMessageService.error(res['success']);
                }
            });
        }
    }
    addsubmitForm() {
        for (const i in this.addvalidateForm.controls) {
            this.addvalidateForm.controls[i].markAsDirty();
            this.addvalidateForm.controls[i].updateValueAndValidity();
        }
        if (this.addvalidateForm.valid) {
            let val = {
                user_name: this.addvalidateForm.value.name,
                mobile: this.addvalidateForm.value.mobileNumber,
                alt_mobile: this.addvalidateForm.value.alternatemobile,
                landmark: this.addvalidateForm.value.landmark,
                pincode: this.addvalidateForm.value.pincode,
                address: this.addvalidateForm.value.address,
                locality: this.addvalidateForm.value.locality,
                city: this.addvalidateForm.value.city,
                state: this.addvalidateForm.value.state,
                address_type: this.addvalidateForm.value.address_type,
                defaultAddress: this.addvalidateForm.value.defaultAddress,
            };
            this.profile.AddAddress(val).subscribe((res) => {
                if (res['success']) {
                    this.nzMessageService.success(res['message']);
                    this.addvalidateForm.reset();
                    this.addisVisible = false;
                    this.payMethod = null;
                    this.getAllAddress();
                } else {
                    this.nzMessageService.error(res['success']);
                }
            });
        }
    }

    deleteAddress(val) {
        let id = {
            address_id: val,
        };
        this.profile.DeleteAddress(id).subscribe((res) => {
            if (res['success']) {
                this.nzMessageService.success(res['message']);
                this.getAllAddress();
            } else {
                this.nzMessageService.error(res['message']);
            }
        });
    }

    getAllAddress() {
        this.profile.GetAddress().subscribe((res) => {
            if (res['success']) {
                this.addressList = res['data'];
                this.addressList.forEach(element => {
                    if (element.default == true) {
                        this.addressSelect = element._id;
                        this.selectAddressforPayment(element)
                    }
                });
            }
        });
    }


    addcardsubmitForm() {
        for (const i in this.addcardvalidateForm.controls) {
            this.addcardvalidateForm.controls[i].markAsDirty();
            this.addcardvalidateForm.controls[i].updateValueAndValidity();
        }

        if (this.addcardvalidateForm.valid) {
            let val = {
                number: this.addcardvalidateForm.value.cardNumber,
                month: this.addcardvalidateForm.value.month,
                year: this.addcardvalidateForm.value.year,
                cvc: this.addcardvalidateForm.value.cvv,
                name: this.addcardvalidateForm.value.cardHolderName,
            };
            this.cardPayment = val;
            this.addcardvalidateForm.reset();
            this.addCardVisible = false;
            // this.card.AddCard(val).subscribe((res) => {
            //     if (res['success']) {
            //         this.nzMessageService.success(res['message']);
            //        
            //         this.getAllCard();
            //         this.addCardVisible = false;
            //     } else {
            //         this.nzMessageService.error(res['message']);
            //     }
            // });
        }
    }

    getAllCard() {
        this.card.GetCard().subscribe((res) => {
            if (res['success']) {
                this.cardList = res['data'];
                this.cardList = this.cardList.reverse()
              }
        });
    }

    ngOnInit(): void {
        this.translate.use(validLanguage(localStorage.getItem('locale')));
        this.accountService.GetSettings().subscribe((res) => {
            if (res['success']) {
             this.settingData = res['data'];
              }
          });
        this.returning();
        this.haveCoupon();
        this.deliveryAddress();
        this.paymentOption();
        this.deliveryOption();
        this.clickEdit();
        this.cartAll();
        this.getAllAddress();
        this.getAllCard();

        this.editvalidateForm = this.fb.group({
            defaultAddress: [false],
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
            pincode: [null, [Validators.required]],
            address: [null, [Validators.required, Validators.maxLength(30)]],
            locality: [null, [Validators.required, Validators.maxLength(30)]],
            city: [null, [Validators.required, Validators.maxLength(20)]],
            state: [null, [Validators.required, Validators.maxLength(20)]],

            address_type: [null],
            alternatemobile: [null],
            landmark: [null],
        });
        this.addvalidateForm = this.fb.group({
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
            pincode: [null, [Validators.required]],
            address: [null, [Validators.required, Validators.maxLength(30)]],
            locality: [null, [Validators.required, Validators.maxLength(30)]],
            city: [null, [Validators.required, Validators.maxLength(20)]],
            state: [null, [Validators.required, Validators.maxLength(20)]],

            defaultAddress: [false],
            address_type: [null],
            alternatemobile: [null],
            landmark: [null],
        });
        this.addcardvalidateForm = this.fb.group({
            cardHolderName: [
                null,
                [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(20),
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
                    Validators.minLength(3),
                    Validators.maxLength(4),
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

    clickEdit() {
        $('.click-edit').on('click', function () {
            $('.custom-model-main').addClass('model-open');
        });
        $('.close-btn, .bg-overlay').click(function () {
            $('.custom-model-main').removeClass('model-open');
        });
    }

    paymentOption() {
        $('.payment-option').click(function () {
            $('.hide-payment-option').stop().slideUp(300);
            $(this).next('.hide-payment-option').stop().slideToggle(300);
            $('.hitter').show();
        });

        $('.hitter').click(function () {
            $('.hide-payment-option').stop().slideUp(300);
        });
    }

    deliveryOption() {
        $('.delivery-option').click(function () {
            $('.hide-delivery-option').stop().slideUp(300);
            $(this).next('.hide-delivery-option').stop().slideToggle(300);
            $('.hitter').show();
        });

        $('.hitter').click(function () {
            $('.hide-delivery-option').stop().slideUp(300);
        });
    }

    returning() {
        $('.returning-customer').click(function () {
            $('.hide-login').stop().slideUp(300);
            $(this).next('.hide-login').stop().slideToggle(300);
            $('.hitter').show();
        });

        $('.hitter').click(function () {
            $('.hide-login').stop().slideUp(300);
        });
    }

    haveCoupon() {
        $('.have-coupon').click(function () {
            $('.hide-coupon').stop().slideUp(300);
            $(this).next('.hide-coupon').stop().slideToggle(300);
            $('.hitter').show();
        });

        $('.hitter').click(function () {
            $('.hide-coupon').stop().slideUp(300);
        });
    }

    deliveryAddress() {
        $('.delivery-address').click(function () {
            $('.hide-delivery-address').stop().slideUp(300);
            $(this).next('.hide-delivery-address').stop().slideToggle(300);
            $('.hitter').show();
        });

        $('.hitter').click(function () {
            $('.hide-delivery-address').stop().slideUp(300);
        });
    }

    //cart
    deliveryFee: any;

    cartAll() {
        this.cartList = [];
        this.cart.CartAll().subscribe((res) => {
            // this.cartList = res['data'];
            let data = res['data']
            data.forEach(element => {
              if(element.product_id != null) {
                  this.cartList.push(element)
              } 
            });
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
                if(this.Coupon_Code){
                    this.checkCoupon(this.Coupon_Code)
                }
                
            }
            else {
                if (this.totalAmount < res['delivery_fee'].order_price) {
                    this.delivery_fee = res['delivery_fee'].delivery_fee_below_max;
                } else {
                    this.delivery_fee = res['delivery_fee'].delivery_fee_above_max;
                }
                if(this.Coupon_Code){
                    this.checkCoupon(this.Coupon_Code)
                }
            }
        });
    }

    
    Coupon_Code;

    checkCoupon(code) {
        this.Coupon_Code = code;
        this.cart.CheckCoupon(code).subscribe((res) => {
            if (res['success']) {
                this.nzMessageService.success(res['message']);
                this.couponapplied = true;
                this.coupon_code = code;
                this.coupon_details = res['data'];
                this.coupon_discount = (
                    ((this.totalAmount + this.delivery_fee) / 100) *
                    this.coupon_details.percentage
                ).toFixed(2);
            } else {
                this.nzMessageService.error(res['message']);
                this.couponapplied = false;
                this.coupon_discount = 0;
            }
        });
    }
    couponCode;
    deleteCoupon() {
        this.couponapplied = false;
        this.coupon_discount = 0;
        this.couponCode = '';
        this.nzMessageService.success('Coupon Removed');
    }

    selectCardforPayment(id) {
        this.cardPayment = id;
    }

    selectAddressforPayment(address) {
        this.addressSelect = address._id;
        this.selectedAddress = address;
        this.selectAddress = address.address;
        this.selectState = address.state;
        this.selectCity = address.city;
        this.selectLocality = address.locality;
        this.selectPincode = address.pincode;
    }

    isDisable = false;

    disablePay=false;
    
    paynow() {
        if (this.payMethod == 'CARD') {
            if (this.addressSelect == null) {
                this.nzMessageService.error(this.translate.instant('SelectAddress'));
            }
            if (this.cardPayment == null) {
                this.nzMessageService.error(this.translate.instant('SelectCardDetails'));
            }
            if (this.addressSelect != null && this.cardPayment != null) {
                this.disablePay=true;
                this.cart
                    .PayNow({
                        card: this.cardPayment,
                        address_id: this.addressSelect,
                        coupon_code: this.coupon_code,
                        delivery_type: this.deliValue,
                        payment_method: this.payMethod
                    })
                    .subscribe(
                        (res) => {
                            if (res['success']) {
                                this.nzMessageService.success(res['message']);
                                this.disablePay=false;
                                this.myChild.ngOnInit();
                                this.router.navigate(['/cart']);
                            } else {
                                this.nzMessageService.error(res['message']);
                                this.disablePay=false;
                            }
                        },
                        (err) => {
                            this.nzMessageService.error(err.error.message);
                        }
                    );
            }
        }
        else {
            this.isDisable = true;

            this.cart
                .PayNow({
                    card_id: this.cardPayment,
                    address_id: this.addressSelect,
                    coupon_code: this.coupon_code,
                    delivery_type: this.deliValue,
                    payment_method: this.payMethod
                })
                .subscribe(
                    (res) => {
                         if (res['success']) {
                            window.location.href = res.href;
                            // this.isDisable = false;
                            // this.nzMessageService.success(res['message']);
                            // this.myChild.ngOnInit();
                        } else {
                            this.nzMessageService.error(res['message']);
                            this.isDisable = false;
                        }
                    },
                    (err) => {
                        this.nzMessageService.error(err.error.message);
                        this.isDisable = false;
                    }
                );
        }
    }

    OrderPay() {
      
    }
}
