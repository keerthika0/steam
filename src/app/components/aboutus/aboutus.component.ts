import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { validLanguage } from 'src/app/helpers/languages';
import { AccountService } from 'src/app/services/account.service';
import { Constants } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.less']
})
export class AboutusComponent implements OnInit {
  settingData:any;
  contentData:any = [];
  landImg;
  url = Constants.baseUrl;

  constructor(private translate: TranslateService,private accountService: AccountService) {

  }

  ngOnInit(): void {
    this.translate.use(validLanguage(localStorage.getItem('locale')));
    this.accountService.GetSettings().subscribe((res) => {
      if (res['success']) {
        this.settingData = res['data'];
        this.contentData = this.settingData.content;
        var jsonObj = {};
        for (var i = 0 ; i < this.contentData.length; i++) {
            jsonObj[this.contentData[i].key] = this.contentData[i].value;
        }
        this.contentData = jsonObj;
        this.landImg = this.url + res['data']['header_image'];
        }
    });
  }
 

  
}
