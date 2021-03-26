import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TranslateService } from '@ngx-translate/core';
import { validLanguage } from 'src/app/helpers/languages';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.less']
})
export class EmailComponent implements OnInit {

  verifyToken;

  constructor(
      private authService: AuthService,
      private message: NzMessageService,
      private router: Router,
      private route: ActivatedRoute,
      private translate: TranslateService
  ) {}

  ngOnInit(): void {
    localStorage.setItem('token', this.route.snapshot.paramMap.get('id'));
    let session = uuid();
    localStorage.setItem('session', session);
       this.EmailVerify();
   this.translate.use(validLanguage(localStorage.getItem('locale')));
  }

  EmailVerify() {
    this.authService.VerifyEmail().subscribe((res) => {
        if (res['success']) {
            this.message.success(res['message']);
            this.router.navigate(['/auth/login']);
        } else {
            this.message.error(res['message']);
        }
    });
}

}
