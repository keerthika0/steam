import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TranslateService } from '@ngx-translate/core';
import { validLanguage } from 'src/app/helpers/languages';

@Component({
    selector: 'app-forgotpassword',
    templateUrl: './forgotpassword.component.html',
    styleUrls: ['./forgotpassword.component.less'],
})
export class ForgotpasswordComponent implements OnInit {
    validateForm!: FormGroup;

    submitForm(): void {
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
            this.validateForm.controls[i].updateValueAndValidity();
        }
        if (this.validateForm.valid) {
            this.ForgotPassword();
        }
    }

    constructor(
        private fb: FormBuilder,
        private message: NzMessageService,
        private auth: AuthService,
        private translate: TranslateService
    ) {}
    ngOnInit(): void {
        this.translate.use(validLanguage(localStorage.getItem('locale')));
        this.validateForm = this.fb.group({
            email: [null, [Validators.email, Validators.required]],
        });
    }

    ForgotPassword(): void {
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
            this.validateForm.controls[i].updateValueAndValidity();
        }
        if (this.validateForm.valid) {
            this.auth
                .ForgotPassword({ email: this.validateForm.value.email })
                .subscribe(res => {
                    if (res['success']) {
                        this.message.success(res['message']);
                        this.validateForm.reset()
                    } 
                    else{
                        this.message.error(res['message']);
                    }
                },(err)=>{
                    this.message.error(err.error.message)
                });
        }
    }
}
