import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { ProfileService } from 'src/app/services/profile.service';
import { CardService } from 'src/app/services/card.service';
import { CartService } from 'src/app/services/cart.service';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { DisabledTimeFn, DisabledDateFn } from 'ng-zorro-antd/date-picker';
import { AuthService } from 'src/app/services/auth.service'
declare var $: any;
import { TranslateService } from '@ngx-translate/core';
import { validLanguage } from 'src/app/helpers/languages';


@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.less'],
})
export class AccountComponent implements OnInit {
    listOfData = [];
    //changepassword
    passwordVisibleOld = false;
    passwordVisibleNew = false;
    passwordVisibleConfirm = false;
    passwordOld?: string;
    passwordNew?: string;
    passwordConfirm?: string;
    editLoading = false;
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

    //Card
    minyear = new Date().getFullYear();
    maxyear = new Date().getFullYear() + 20;
    minmonth = new Date().getMonth()+1;
    cardList = [];
    orderList = [];


    //Profile
    fullname= "-";
    email= "-";
    dob;
    gender= "-";
    mobile= "-";
    location= "-";
    nickname= "-";
    today = new Date();
    //Coupon
    couponList = [];

    // Modal -- Edit Address
    editProfileVisible = false;

    editProfile(): void {
        this.editProfileVisible = true;
    }

    // Form -- Edit Address
    editProfileValidateForm!: FormGroup;
    addvalidateForm!: FormGroup;
    editvalidateForm!: FormGroup;
    addcardvalidateForm!: FormGroup;
    passwordForm: FormGroup;
  
    dateOfBirth = 'yyyy/MM/dd';

    // Add Adrress -- Modal
    addisVisible = false;

    addshowModal(): void {
        this.addisVisible = true;
    }

    addhandleOk(): void {
        this.addisVisible = false;
    }

    addhandleCancel(): void {
        this.addisVisible = false;
    }
    // Edit Adrress -- Modal
    editisVisible = false;

    editshowModal(data, i): void {
        this.editisVisible = true;
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

    constructor(
        private fb: FormBuilder,
        private nzMessageService: NzMessageService,
        private profile: ProfileService,
        private card: CardService,
        private cart: CartService,
        private auth:AuthService,
        private translate:TranslateService

    ) { }


    ngOnInit(): void {
        this.translate.use(validLanguage(localStorage.getItem('locale')));
        this.btns();
        this.btns0();
        this.btns1();
        this.tabContent();
        this.clickPopup();
        this.inputSelect();
        this.showButton();
        this.getAllAddress();
        this.getAllCard();
        this.getAllCoupon();
        this.getProfile();
        this.GetOrders();
        this.passwordForm = this.fb.group({
            password: [null, [Validators.required]],
            newPassword: [
                null,
                [
                    Validators.required,
                    Validators.pattern(
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\/])(?=.{8,})/
                    ),
                    this.passwordValidator,this.OldNewPasswordValid
                ],
            ],
            confirmPassword: [
                null,
                [Validators.required, this.confirmValidator],
            ],
        });

      
        this.editProfileValidateForm = this.fb.group({
            fullName: [null, [Validators.required,Validators.minLength(3),Validators.maxLength(20),Validators.pattern('^[a-zA-Z ]*$')]],
            nickname: [null, [Validators.required,Validators.minLength(3),Validators.maxLength(20),Validators.pattern('^[a-zA-Z ]*$')]],
            email: [null, [Validators.email, Validators.required]],
            mobile: [
                null,
                [Validators.required, Validators.pattern('([0-9]{8,12})')],
            ],
            location: [null, [Validators.required]],
            dob: [null, [Validators.required]],
            gender: [null, [Validators.required]],
        });
        this.addvalidateForm = this.fb.group({
            name: [null, [Validators.required, Validators.minLength(3),Validators.maxLength(20),Validators.pattern('^[a-zA-Z ]*$')]],
            mobileNumber: [null,  [Validators.required, Validators.pattern('([0-9]{8,12})')]],
            pincode: [null, [Validators.required]],
            address: [null, [Validators.required,Validators.maxLength(30)]],
            locality: [null, [Validators.required,Validators.maxLength(30)]],
            city: [null, [Validators.required,Validators.maxLength(20)]],
            state: [null, [Validators.required,Validators.maxLength(20)]],
            defaultAddress: [false],
            address_type: [null],
            alternatemobile: [null, [Validators.pattern('([0-9]{8,12})')]],
            landmark: [null]
        });
        this.addcardvalidateForm = this.fb.group({
            cardHolderName: [null, [Validators.required,Validators.minLength(3),Validators.maxLength(20),Validators.pattern('^[a-zA-Z ]*$')]],
            cardNumber: [null, [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$')]],
            month: [null, [Validators.required, Validators.max(12), Validators.min(1)]],
            cvv: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(4)]],
            year: [null, [Validators.required, Validators.min(this.minyear), Validators.max(this.maxyear)]],

        });
        this.editvalidateForm = this.fb.group({
            name: [null, [Validators.required, Validators.min(3),Validators.maxLength(20)]],
            mobileNumber: [null,  [Validators.required, Validators.pattern('([0-9]{8,12})')]],
            pincode: [null, [Validators.required]],
            address: [null, [Validators.required,Validators.maxLength(30)]],
            locality: [null, [Validators.required,Validators.maxLength(30)]],
            city: [null, [Validators.required,Validators.maxLength(20)]],
            state: [null, [Validators.required,Validators.maxLength(20)]],
            defaultAddress: [false],
            address_type: [null],
            alternatemobile: [null, [Validators.pattern('([0-9]{8,12})')]],
            landmark: [null]
        });
    }

    showButton() {
        $('#show-button').click(function () {
            $('#hide-button').show();
            $('#show-button').hide();
        });
    }

    inputSelect() {
        $('input, select').on('input', function () {
            var value = $(this).val();
            if ($(this).is('#number')) {
                value = value.replace(/(.{4})/g, '$1 ');
                $('.card-number .mono').text(value);
            } else if ($(this).is('#holder')) {
                $('.card-holder .mono').text(value);
            } else if ($(this).is('#month')) {
                var date = value + $('.card-date .mono').text().slice(2, 8);
                $('.card-date .mono').text(date);
            } else if ($(this).is('#year')) {
                var date = $('.card-date .mono').text().slice(0, 3) + value;
                $('.card-date .mono').text(date);
            } else if ($(this).is('#ccv')) {
                $('.card-code .mono').text(value);
            }
        });
    }

    clickPopup() {
        $('.click-popup').on('click', function () {
            $('.custom-model-main').addClass('model-open');
        });
        $('.close-btn, .bg-overlay').click(function () {
            $('.custom-model-main').removeClass('model-open');
        });
    }

    tabContent() {
        $('.tab_content').hide();
        $('.tab_content:first').show();

        $('ul.tabs li').click(function () {
            $('.tab_content').hide();
            var activeTab = $(this).attr('rel');
            $('#' + activeTab).fadeIn();

            $('ul.tabs li').removeClass('active');
            $(this).addClass('active');

            $('.tab_drawer_heading').removeClass('d_active');
            $(".tab_drawer_heading[rel^='" + activeTab + "']").addClass(
                'd_active'
            );
        });
        $('.tab_drawer_heading').click(function () {
            $('.tab_content').hide();
            var d_activeTab = $(this).attr('rel');
            $('#' + d_activeTab).fadeIn();

            $('.tab_drawer_heading').removeClass('d_active');
            $(this).addClass('d_active');

            $('ul.tabs li').removeClass('active');
            $("ul.tabs li[rel^='" + d_activeTab + "']").addClass('active');
        });
    }

    btns() {
        $('.btns').click(function () {
            var lable = $('.btns').text().trim();

            if (lable == 'Details') {
                $('.btns').text('Hide');
                $('.myText').show();
            } else {
                $('.btns').text('Details');
                $('.myText').hide();
            }
        });
    }
    btns0() {
        $('.btns0').click(function () {
            var lable = $('.btns0').text().trim();

            if (lable == 'Details') {
                $('.btns0').text('Hide');
                $('.myText0').show();
            } else {
                $('.btns0').text('Details');
                $('.myText0').hide();
            }
        });
    }

    btns1() {
        $('.btns1').click(function () {
            var lable = $('.btns1').text().trim();

            if (lable == 'Details') {
                $('.btns1').text('Hide');
                $('.myText1').show();
            } else {
                $('.btns1').text('Details');
                $('.myText1').hide();
            }
        });
    }
    //Coupon
    getAllCoupon() {
        this.profile.GetCouponList().subscribe((res) => {
            if (res['success']) {
                this.couponList = res['data'].reverse();
               }
        })
    }
    Notify() {
        this.nzMessageService.success("Copied");
    }

     //Address
     getAllAddress() {
        this.profile.GetAddress().subscribe((res) => {
            if (res['success']) {
                this.addressList = res['data']
            }
        })
    }
    deleteAddress(val) {
        let id = {
            address_id: val
        }
        this.profile.DeleteAddress(id).subscribe((res) => {
            if (res['success']) {
                this.nzMessageService.success(res['message'])
                this.getAllAddress();
            }
            else {
                this.nzMessageService.error(res['message'])
            }
        })
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

            }
            this.profile.AddAddress(val).subscribe((res) => {
                if (res['success']) {
                    this.nzMessageService.success(res['message']);
                    this.addvalidateForm.reset();
                    this.addisVisible = false;
                    this.getAllAddress();
                }
                else {
                    this.nzMessageService.error(res['success']);
                }
            })
        }
    }
    editsubmitForm() {
        for (const i in this.editvalidateForm.controls) {
            this.editvalidateForm.controls[i].markAsDirty();
            this.editvalidateForm.controls[i].updateValueAndValidity();
        }
        if (this.editvalidateForm.valid) {
            let val = {
                address_id: this.address_id,
                user_name: this.editvalidateForm.value.name,
                mobile: this.mobilenumber,
                alt_mobile: this.editvalidateForm.value.alternatemobile,
                landmark: this.editvalidateForm.value.landmark,
                pincode: this.editvalidateForm.value.pincode,
                address: this.editvalidateForm.value.address,
                locality: this.editvalidateForm.value.locality,
                city: this.editvalidateForm.value.city,
                state: this.editvalidateForm.value.state,
                address_type: this.editvalidateForm.value.address_type,
                defaultAddress: this.editvalidateForm.value.defaultAddress,
            }
            this.profile.UpdateAddress(val).subscribe((res) => {
                if (res['success']) {
                    this.editisVisible = false;
                    this.nzMessageService.success(res['message']);
                    this.editvalidateForm.reset();
                    this.getAllAddress();
                }
                else {
                    this.nzMessageService.error(res['success']);
                }
            })
        }

    }

    //Card
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
                name: this.addcardvalidateForm.value.cardHolderName
            }
            this.card.AddCard(val).subscribe((res) => {
                if (res['success']) {
                    this.addCardVisible = false;
                    this.nzMessageService.success(res['message']);
                    this.addcardvalidateForm.reset();
                    this.cardList.push(res['data']);
                }
                else {
                    this.nzMessageService.error(res['message']);
                }
            })


        }
    }

    getAllCard() {
        this.card.GetCard().subscribe((res) => {
            if (res['success']) {
                this.cardList = res['data'];
            }
        })
    }

    deleteCard(id) {

        this.card.DeleteCard(id).subscribe((res) => {
            if (res['success']) {
                this.nzMessageService.success(res['message']);
                this.getAllCard();
            }
            else {
                this.nzMessageService.error(res['success']);
            }
        })
    }

    //Profile
    getProfile() {
        this.profile.GetProfile().subscribe((res) => {
             if (res['success']) {
               this.dob = res['data']['birthday'];
               this.email = res['data']['email'];
               this.mobile = res['data']['mobile'];
               this.nickname = res['data']['nick_name'];
               this.fullname = res['data']['user_name'];
               this.location = res['data']['location'];
               this.gender = res['data']['gender'];
            }
        })
    }
    editProfileSubmitForm(): void {
        for (const i in this.editProfileValidateForm.controls) {
            this.editProfileValidateForm.controls[i].markAsDirty();
            this.editProfileValidateForm.controls[i].updateValueAndValidity();
        }
        if(this.editProfileValidateForm.valid){
            let val={
                user_name:this.fullname,
                email:this.email,
                mobile:this.mobile,
                date_of_birth:this.dob,
                location:this.location,
                nick_name:this.nickname,
                gender:this.gender
            }
             this.profile.UpdateProfile(val).subscribe((res)=>{
                if(res['success']){
                    this.editProfileVisible = false;
                    this.nzMessageService.success(res['message']);
                }
                else{
                    this.nzMessageService.error(res['message'])
                }
            })
        }
    }

    GetOrders(){
        this.cart.OrderAll().subscribe((res)=>{
                if(res['success']){
                    this.orderList = res['data'];
                  
                      }
                else{
                    this.nzMessageService.error(res['message'])
                }
            })

    }

    disabledDate = (current: Date): boolean => {
         let month = this.today.getMonth();
         let year = this.today.getFullYear()-18;
         let date = this.today.getDate();
         let endyear = this.today.getFullYear() - 101; 
         return differenceInCalendarDays(new Date(year,month,date),current) < 0|| current < new Date(endyear,month,date);
    };
  
    //change password
    OldNewPasswordValid = (control: FormControl): { [s: string]: boolean } => {
		if (!control.value) {
			return { required: true };
		} else if (control.value === this.passwordForm.controls.password.value) {
			return { errorValidity: true, error: true };
		}
		return {};
	};

	confirmValidator = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return { error: true, required: true };
        } else if (
            control.value !== this.passwordForm.controls.newPassword.value
        ) {
            return { confirm: true, error: true };
        }
        return {};
    };

    passwordValidator = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return { error: true, required: true };
        }
        this.passwordForm.controls.confirmPassword.updateValueAndValidity();
        return {};
    };

    UpdatePassword() {
        if(!this.passwordForm.valid){
            this.nzMessageService.error(this.translate.instant('EnterAllValues'))
        }
        if (this.passwordForm.valid) {
            const { password, newPassword } = this.passwordForm.value;
            this.auth
                .ChangePassword({
                    old_password: password,
                    password: newPassword,
                })
                .subscribe(
                    (data) => {
                        if (data['success']) {
                            this.nzMessageService.success(data['message']);
                            this.passwordForm.reset();
                        } else {
                            this.nzMessageService.error(data['message']);
                        }
                    },
                    (err) => {
                        this.nzMessageService.error(err.error['message']);
                    }
                );
        }
    }

}
