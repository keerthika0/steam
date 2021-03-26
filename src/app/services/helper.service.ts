import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { v4 as uuid } from 'uuid';

@Injectable({
    providedIn: 'root',
})
export class HelperService {
    constructor(private router: Router, private cookieService: CookieService) { }

    isLoggedIn() {
        return (
            localStorage.getItem('isLoggedIn') == 'true' &&
            localStorage.getItem('token') != ''
        );
    }

    LogOut() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('token')
        this.router.navigate(['/landing']);
       }

    isAlreadyLoggedIn() {
        if (localStorage.getItem('isLoggedIn') == 'true' &&
            localStorage.getItem('token') != '') {
                this.router.navigate(['/grid']);
        }
        else if (localStorage.getItem('session') != null) {
            }
        else {
            let session = uuid();
            localStorage.setItem('session', session);
            this.cookieService.set('session', session);
            sessionStorage.setItem('session', session)
        }
    }

    Login(data) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('token', data['data']);
        localStorage.setItem('userId', data['user']['_id']);
        localStorage.setItem('email', data['user']['email']);
        localStorage.setItem('mobile', data['user']['mobile']);
        localStorage.setItem('userId', data['user']['_id']);
        localStorage.setItem('user_name',data['user']['user_name']);
        
        localStorage.setItem('locale',data['user']['language']);
        this.router.navigate(['/grid']);
    }
}
