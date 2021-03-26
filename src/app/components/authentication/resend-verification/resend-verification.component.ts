import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NzMessageService } from "ng-zorro-antd/message";
import { TranslateService } from '@ngx-translate/core';
import { validLanguage } from 'src/app/helpers/languages';

@Component({
    selector: 'app-resend-verification',
    templateUrl: './resend-verification.component.html',
    styleUrls: ['./resend-verification.component.less'],
})
export class ResendVerificationComponent implements OnInit {
    validateForm!: FormGroup;
   
    constructor(private fb: FormBuilder, private auth:AuthService, private nzMessage:NzMessageService,private translate:TranslateService) {}

    ngOnInit(): void {
        this.translate.use(validLanguage(localStorage.getItem('locale')));
        this.validateForm = this.fb.group({
            email: [null, [Validators.email, Validators.required]],
        });
    }
    submitForm(): void {
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
            this.validateForm.controls[i].updateValueAndValidity();
        }
        if(this.validateForm.valid){
            let val = {email:this.validateForm.value.email}
            this.auth.ResendEmail(val).subscribe((res)=>{
                if(res['success']){
                    this.nzMessage.success(res['message'])
                   this.validateForm.reset();
                }
                else{
                    this.nzMessage.error(res['message'])
                }
            },(err)=>{
                this.nzMessage.error(err.error.message)
            })
        }
    }
}
