import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsRoutingModule } from './components-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LayoutComponent } from './layout/layout.component';
import { LandingComponent } from './landing/landing.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ProductgridComponent } from './productgrid/productgrid.component';
import { TermsComponent } from './landing/terms/terms.component';
import { PrivacyComponent } from './landing/privacy/privacy.component';
import { ProductviewComponent } from './productview/productview.component';
import { GuestcheckoutComponent } from './guestcheckout/guestcheckout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GuestcartComponent } from './guestcart/guestcart.component';
import { OrderviewComponent } from './orderview/orderview.component';
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { HttpClient } from '@angular/common/http';
import { PaypaysuccessComponent } from './paypaysuccess/paypaysuccess.component';
import { PayerrorComponent } from './payerror/payerror.component';
import { ReturnConditionsComponent } from './support/return-conditions/return-conditions.component';
import { ReturnFormComponent } from './support/return-form/return-form.component';
import { DataProtectionComponent } from './support/data-protection/data-protection.component';
import { DeliveryChargesComponent } from './support/delivery-charges/delivery-charges.component';
import { CookiesComponent } from './support/cookies/cookies.component';
import { TermsOfUseComponent } from './support/terms-of-use/terms-of-use.component';


export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
    declarations: [
        LayoutComponent,
        LandingComponent,
        AboutusComponent,
        ProductgridComponent,
        TermsComponent,
        PrivacyComponent,
        ProductviewComponent,
        GuestcheckoutComponent,
        GuestcartComponent,
        OrderviewComponent,
        PaypaysuccessComponent,
        PayerrorComponent,
        ReturnConditionsComponent,
        ReturnFormComponent,
        DataProtectionComponent,
        DeliveryChargesComponent,
        CookiesComponent,
        TermsOfUseComponent,
    ],
    imports: [
        CommonModule,
        ComponentsRoutingModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient],
            },
        }),
    ],
})
export class ComponentsModule { }
