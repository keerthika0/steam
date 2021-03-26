import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { TranslateService } from '@ngx-translate/core';
import { validLanguage } from 'src/app/helpers/languages';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.less'],
})
export class SignupComponent implements OnInit {
     passwordVisible = false;
    confirmpasswordVisible = false;
    password?: string;
    confirmpassword?: string;
    signUpForm: FormGroup;
    aggreed: Boolean = true;
     isVisisble = false;
 
    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private notify: NzMessageService,
        private helper: HelperService,
        private router: Router,
        private translate:TranslateService
    ) { }

      ngOnInit(): void {
        this.translate.use(validLanguage(localStorage.getItem('locale')));
        this.signUpForm = this.fb.group({
            user_name: [null, [Validators.required,Validators.minLength(3),Validators.pattern('^[a-zA-Z ]*$')]],
            
            email: [null, [Validators.email, Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}')]],
            mobile: [
                null,
                [Validators.required, Validators.pattern('([0-9]{8,12})')],
            ],
            password: [
                null,
                [
                    Validators.required,
                    Validators.pattern(
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\/])(?=.{8,})/
                    ),
                    this.passwordValidator,
                ],
            ],
            confirmPassword: [
                null,
                [Validators.required, this.confirmValidator],
            ],
           
        });
   
    }

    confirmValidator = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return { error: true, required: true };
        } else if (control.value !== this.signUpForm.controls.password.value) {
            return { confirm: true, error: true };
        }
        return {};
    };


    passwordValidator = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return { error: true, required: true };
        }
        this.signUpForm.controls.confirmPassword.updateValueAndValidity();
        return {};
    };

    SignUp() {

        for (const i in this.signUpForm.controls) {
            this.signUpForm.controls[i].markAsDirty();
            this.signUpForm.controls[i].updateValueAndValidity();
        }

        if (this.signUpForm.valid) {
            const {
                email,
                mobile,
                password,
                user_name
            } = this.signUpForm.value;
             this.authService
                .SignUp({ user_name,email, mobile, password })
                .subscribe(
                    (data) => {
                        if (data['success']) {
                            this.notify.success(data['message']);
                            this.signUpForm.reset();
                            this.isVisisble = true;
                            localStorage.clear();
                            window.sessionStorage.clear();
                        }
                    },
                    (err) => {
                         this.notify.error(err.error.message);
                    }
                );
        }
    }

}
