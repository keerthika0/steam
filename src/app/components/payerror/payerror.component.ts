import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { validLanguage } from 'src/app/helpers/languages';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service'

@Component({
  selector: 'app-payerror',
  templateUrl: './payerror.component.html',
  styleUrls: ['./payerror.component.less']
})
export class PayerrorComponent implements OnInit {

  constructor(private translate: TranslateService, private route:Router, private router:ActivatedRoute,
    private accountService:AccountService) { }

    isLoggedin;

  ngOnInit(): void {
    this.translate.use(validLanguage(localStorage.getItem('locale')));
    this.isLoggedin = localStorage.getItem('isLoggedIn')
  
    let val = {
      id:this.router.snapshot.paramMap.get('id'),
      status:'FAILED'
    }
    if(this.isLoggedin){
      this.accountService.PayError(val).subscribe((res)=>{ })
    }
   else{
    this.accountService.GuestPayError(val).subscribe((res)=>{ })
   }
  }




}
