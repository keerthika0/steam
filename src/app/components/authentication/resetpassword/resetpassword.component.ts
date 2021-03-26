import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from "ng-zorro-antd/message";
import { TranslateService } from '@ngx-translate/core';
import { validLanguage } from 'src/app/helpers/languages';

@Component({
    selector: 'app-resetpassword',
    templateUrl: './resetpassword.component.html',
    styleUrls: ['./resetpassword.component.less'],
})
export class ResetpasswordComponent implements OnInit {
    passwordForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private auth: AuthService,
        private notify: NzMessageService,
        private router: Router,
        private route: ActivatedRoute,
        private translate:TranslateService
    ) {
        localStorage.setItem(
            'token',
            this.route.snapshot.paramMap.get('id')
        );
    }

    ngOnInit(): void {
        this.translate.use(validLanguage(localStorage.getItem('locale')));
        this.passwordForm = this.fb.group({
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
        } else if (
            control.value !== this.passwordForm.controls.password.value
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

    Reset() {
        if(!this.passwordForm.valid){
            this.notify.error(this.translate.instant('EnterAllValues'))
        }
         if (this.passwordForm.valid) {
            const { password, confirmPassword } = this.passwordForm.value;
            if (confirmPassword === password) {
                this.auth
                    .ResetPassword({
                        password,
                    })
                    .subscribe(
                        (res) => {
                            if (res['success']) {
                                localStorage.clear();
                                this.notify.success(res['message']);
                                this.router.navigate(['/auth/login']);
                                this.passwordForm.reset();
                            } else {
                                this.notify.error(res['message']);
                            }
                        },
                        (err) => {
                            this.notify.error(err.error['message']);
                        }
                    );
            }
        }
    }

}
