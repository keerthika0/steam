import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HelperService } from 'src/app/services/helper.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { validLanguage } from 'src/app/helpers/languages';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
    validateForm!: FormGroup;
    isLoading = false;
    submitForm(): void {
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
            this.validateForm.controls[i].updateValueAndValidity();
        }
    }

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private notify: NzMessageService,
        private helper: HelperService,
        private router: Router,
        private translate:TranslateService
    ) {}

    ngOnInit(): void {
        this.translate.use(validLanguage(localStorage.getItem('locale')));
        this.helper.isAlreadyLoggedIn();
        this.validateForm = this.fb.group({
            email: [null, [Validators.email, Validators.required]],
            password: [null, [Validators.required]],
            // remember: [true],
        });
    }
    Login() {
        if(this.validateForm.value.email == null || this.validateForm.value.password == null){
            this.notify.error(this.translate.instant('EnterYourCredentials'));
        }
       else if (this.validateForm.valid) {
           this.isLoading = true;
            this.authService.Login(this.validateForm.value).subscribe(
                (data) => {
                    this.notify.success(data['message']);
                    this.isLoading = false;
                    this.helper.Login(data);
                    
                },
                (err) => {
                    this.notify.error(err.error.message);
                    this.isLoading= false;
                }
            );
        }
    }
}
