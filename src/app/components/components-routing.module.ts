import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LandingComponent } from './landing/landing.component';
import { AuthGuard } from './authentication/auth.guard';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ProductgridComponent } from './productgrid/productgrid.component';
import { TermsComponent } from './landing/terms/terms.component';
import { PrivacyComponent } from './landing/privacy/privacy.component';
import { ProductviewComponent } from './productview/productview.component';
import { GuestcheckoutComponent } from './guestcheckout/guestcheckout.component';
import { GuestcartComponent } from './guestcart/guestcart.component';
import { OrderviewComponent } from './orderview/orderview.component';
import { PaypaysuccessComponent } from './paypaysuccess/paypaysuccess.component';
import { PayerrorComponent } from './payerror/payerror.component';
import { ReturnConditionsComponent } from './support/return-conditions/return-conditions.component'
import { ReturnFormComponent } from './support/return-form/return-form.component'
import { DataProtectionComponent } from './support/data-protection/data-protection.component'
import { DeliveryChargesComponent } from './support/delivery-charges/delivery-charges.component';
import { CookiesComponent } from './support/cookies/cookies.component';
import { TermsOfUseComponent } from './support/terms-of-use/terms-of-use.component';

const routes: Routes = [
    {
        path: '',
        component: LandingComponent,
    },
    {
        path: 'landing',
        component: LandingComponent,
    },
    {
        path: 'terms',
        component: TermsComponent,
    },
    {
        path: 'privacy',
        component: PrivacyComponent,
    },
    {
        path: 'terms-of-use',
        component: TermsOfUseComponent
    },
    {
        path: 'cookies-policy',
        component: CookiesComponent
    },
    {
        path: 'delivery-charges',
        component: DeliveryChargesComponent
    },
    {
        path: 'data-protection',
        component: DataProtectionComponent
    },
    {
        path: 'return-form',
        component: ReturnFormComponent
    },
    {
        path: 'return-conditions',
        component: ReturnConditionsComponent
    },
    {
        path: 'aboutus',
        component: AboutusComponent,
    },
    {
        path: 'guest-checkout',
        component: GuestcheckoutComponent,
    },
    {
        path: 'guest-cart',
        component: GuestcartComponent
    },
    {
        path: 'cart',
        component: GuestcartComponent,
    },
    {
        path: 'orderview/:id',
        component: OrderviewComponent,
    },
    {
        path: 'grid',
        component: ProductgridComponent,
    },
    {
        path: 'grid/:id/:type',
        component: ProductgridComponent,
    },
    {
        path: 'grid/:id/:type/:subtype',
        component: ProductgridComponent,
    },
    {
        path: 'grid/search/:id',
        component: ProductgridComponent,
    },
    {
        path: 'grid/type/:id',
        component: ProductgridComponent,
    },
    {
        path: 'productview/:id',
        component: ProductviewComponent,
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('./authentication/authentication.module').then(
                (mod) => mod.AuthenticationModule
            ),
    },
    {
        path: '',
        component: LayoutComponent,
        loadChildren: () =>
            import('./pages/pages.module').then((mod) => mod.PagesModule),
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
    },
    {
        path: 'paypalsuccess/:id',
        component: PaypaysuccessComponent,
    },
    {
        path: 'paypalerror/:id',
        component: PayerrorComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ComponentsRoutingModule { }
