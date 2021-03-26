import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-return-form',
	templateUrl: './return-form.component.html',
	styleUrls: ['./return-form.component.less']
})
export class ReturnFormComponent implements OnInit {
	validateForm!: FormGroup;

	submitForm(): void {
		for (const i in this.validateForm.controls) {
			this.validateForm.controls[i].markAsDirty();
			this.validateForm.controls[i].updateValueAndValidity();
		}
	}

	constructor(private msg: NzMessageService, private fb: FormBuilder,private authService: AuthService) { }


	// Image Upload
	handleChange(info: NzUploadChangeParam): void {
		if (info.file.status !== 'uploading') {
			console.log(info.file, info.fileList);
		}
		if (info.file.status === 'done') {
			this.msg.success(`${info.file.name} this.translate.instant('FileUploadSuccessfull')`);
		} else if (info.file.status === 'error') {
			this.msg.error(`${info.file.name} this.translate.instant('FileUploadFailed')`);
		}
	}

	image :any;

	ngOnInit(): void {

		// Form
		this.validateForm = this.fb.group({
			type: [null, [Validators.required]],
			name: [null, [Validators.required]],
			address: [null, [Validators.required]],
			email: [null, [Validators.required]],
			reference: [null, [Validators.required]],
			reason: [null, [Validators.required]],
			acceptTerms: [null, [Validators.required]],
		});
	}


	 onFileChange(e) {
        if (e.target.files && e.target.files[0]) {
            var reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = (event) => { 
            }
            this.image = e.target.files[0];
        }
    }

	
    public validateFormData: any = new FormData();

	returnFormSubmit(): void {
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
            this.validateForm.controls[i].updateValueAndValidity();
        }

        if (this.validateForm.valid) {
            this.validateFormData = new FormData();
            this.validateFormData.append('email', this.validateForm.value.email);
            this.validateFormData.append('name', this.validateForm.value.name);
            this.validateFormData.append('type', this.validateForm.value.type);
            this.validateFormData.append('reason', this.validateForm.value.reason);
            this.validateFormData.append('reference', this.validateForm.value.reference);
            this.validateFormData.append('address', this.validateForm.value.address);
            this.validateFormData.append('image', this.image);

            this.authService.ReturnForm(this.validateFormData).subscribe((res) => {
	        if (res['success']) {
	            this.msg.success(res['message']);
	            this.validateForm.reset();
	        } else {
	            this.msg.error(res['message']);
	        }
	    });
        }

    }

}
