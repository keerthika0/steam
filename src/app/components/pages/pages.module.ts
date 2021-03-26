import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AboutComponent } from './about/about.component';
import { AccountComponent } from './account/account.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderViewComponent } from './order-view/order-view.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { HttpClient } from '@angular/common/http';
import { NotificationComponent } from './notification/notification.component';
import { InvoiceViewComponent } from './invoice-view/invoice-view.component';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}


@NgModule({
    declarations: [
        WishlistComponent,
        CheckoutComponent,
        AboutComponent,
        AccountComponent,
        OrderViewComponent,
        ProductDetailComponent,
        NotificationComponent,
        InvoiceViewComponent,
    ],
    imports: [
        CommonModule,
        PagesRoutingModule,
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
export class PagesModule { }
