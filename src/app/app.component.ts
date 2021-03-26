import { Component } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { languages, validLanguage } from "./helpers/languages";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'goldenroseuser';

  constructor(public translate: TranslateService){}
  ngOnInit(){
  this.translate.addLangs(languages);
		if (localStorage.getItem("locale")) {
			const browserLang = localStorage.getItem("locale");
			this.translate.use(validLanguage(browserLang));
		} else {
			localStorage.setItem("locale", "es");
			this.translate.setDefaultLang("es");
    }
   }
}
