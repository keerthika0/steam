import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { validLanguage } from 'src/app/helpers/languages';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/services/account.service'

@Component({
  selector: 'app-paypaysuccess',
  templateUrl: './paypaysuccess.component.html',
  styleUrls: ['./paypaysuccess.component.less']
})
export class PaypaysuccessComponent implements OnInit {

  seconds = 10;
  isLoggedin;
  constructor(private translate: TranslateService, private route: Router, private router:ActivatedRoute,
    private accountService:AccountService) { }

  ngOnInit(): void {
    this.translate.use(validLanguage(localStorage.getItem('locale')));
    this.isLoggedin = localStorage.getItem('isLoggedIn');
    console.log(this.isLoggedin,'looged')
    let val = {
      id:this.router.snapshot.paramMap.get('id'),
      status:'SUCCESS'
    }
    if(this.isLoggedin){
      this.accountService.PayError(val).subscribe()
    }
   else{
    this.accountService.GuestPayError(val).subscribe()
   }
    // setInterval(() => {
    //   this.counter();
    // }, 1000)
  }

  counter() {
    if (this.seconds > 0) {
          this.seconds = this.seconds - 1;
      }
    else {
      this.route.navigate(['/grid'])
    }

  }

}
