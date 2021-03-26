import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AccountComponent } from './account/account.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { LandingComponent } from '../landing/landing.component';
import { NotificationComponent } from './notification/notification.component';
import { InvoiceViewComponent } from './invoice-view/invoice-view.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: LandingComponent,
    },
    {
        path: 'notification',
        component: NotificationComponent
    },
    {
        path: 'account',
        component: AccountComponent,
    },
    {
        path: 'invoice-view/:id',
        component: InvoiceViewComponent
    },
    {
        path: 'product/:id',
        component: ProductDetailComponent,
    },

    {
        path: 'wishlist',
        component: WishlistComponent,
    },
    {
        path: 'checkout',
        component: CheckoutComponent,
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule { }
