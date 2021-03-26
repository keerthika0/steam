import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { EmailComponent } from './email/email.component';
import { ResendVerificationComponent } from './resend-verification/resend-verification.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: LoginComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'signup',
        component: SignupComponent,
    },
    {
        path: 'forgot',
        component: ForgotpasswordComponent,
    },
    {
        path: 'resetpassword/:id',
        component: ResetpasswordComponent,
    },
    {
        path: 'resend',
        component: ResendVerificationComponent,
    },
    {
        path: 'emailVerify/:id',
        component: EmailComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
