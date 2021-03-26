import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { LandingHeaderComponent } from './landing-header/landing-header.component';
import { LandingFooterComponent } from './landing-footer/landing-footer.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { HttpClient } from '@angular/common/http';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzUploadModule } from 'ng-zorro-antd/upload';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        LandingHeaderComponent,
        LandingFooterComponent,
    ],
    imports: [
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient],
            },
        }),
        CommonModule,
        RouterModule,
        FormsModule,
        NzButtonModule,
        NzGridModule,
        NzCardModule,
        NzFormModule,
        NzIconModule,
        NzRadioModule,
        NzInputModule,
        NzLayoutModule,
        NzToolTipModule,
        NzStatisticModule,
        NzSelectModule,
        NzRateModule,
        NzTableModule,
        NzSliderModule,
        NzCarouselModule,
        NzPopconfirmModule,
        NzModalModule,
        NzCheckboxModule,
        NzTagModule,
        NzBadgeModule,
        NzDatePickerModule,
        NzDrawerModule,
        NzMenuModule,
        NgxPageScrollModule,
        NzPaginationModule,
        NzDropDownModule, NzDividerModule, NzUploadModule
    ],
    exports: [
        FooterComponent,
        HeaderComponent,
        LandingHeaderComponent,
        LandingFooterComponent,
        NzButtonModule,
        NzGridModule,
        NzCardModule,
        NzFormModule,
        NzIconModule,
        NzRadioModule,
        NzInputModule,
        NzLayoutModule,
        NzToolTipModule,
        NzStatisticModule,
        NzSelectModule,
        FormsModule,
        NzRateModule,
        NzTableModule,
        NzSliderModule,
        NzCarouselModule,
        NzPopconfirmModule,
        NzModalModule,
        NzCheckboxModule,
        NzBadgeModule,
        NzTagModule,
        NzDatePickerModule,
        NzDrawerModule,
        NzMenuModule,
        NgxPageScrollModule,
        NzPaginationModule,
        NzDropDownModule, NzDividerModule, NzUploadModule
    ],
})
export class SharedModule { }
