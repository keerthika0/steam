import { Component, OnInit } from '@angular/core';
declare var $: any;

import { TranslateService } from '@ngx-translate/core';
import { validLanguage } from 'src/app/helpers/languages';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.less'],
})
export class LayoutComponent implements OnInit {



    constructor(private translate: TranslateService) {

    }

    ngOnInit(){
        this.translate.use(validLanguage(localStorage.getItem('locale')));
        document.documentElement.lang = localStorage.getItem('locale');
        console.log(localStorage.getItem("locale"),'value')
         this.boxToggle();

       
    }

    boxToggle() {
        $('.box-cat-toggle').click(function (event) {
            event.preventDefault();
            event.stopPropagation();
            $(this).next().slideToggle();
        });
    }
}
