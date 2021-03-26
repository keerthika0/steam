import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HelperService } from './helper.service';

@Injectable({
    providedIn: 'root',
})
export class HttpService {
    headers: HttpHeaders = new HttpHeaders();
    fileHeaders: HttpHeaders = new HttpHeaders();

    constructor(private http: HttpClient, private helper: HelperService) {}

    SetHeader() {
        const token = localStorage.getItem('token');
        const session_id = localStorage.getItem('session');
         if (token) {
            this.headers = new HttpHeaders({
                Authorization: token,
                SessionId: session_id,
            });
        }
        else{
            this.headers = new HttpHeaders({
                SessionId: session_id,
            });
        }
       
    }

    SetFileHeader() {
        const token = localStorage.getItem('token');
        const sessiontoken = localStorage.getItem('session');
      
        if (token) {
            this.fileHeaders = new HttpHeaders({
                Authorization: token,
                'Content-Type': 'multipart/form-data',
                SessionId:sessiontoken
            });
        }
        else{
            this.headers = new HttpHeaders({
                SessionId:sessiontoken,
                'Content-Type': 'multipart/form-data',
            });
        }
    }

    handleErrors = (err) => {
        if (err.status === 401) {
            this.helper.LogOut();
        } else {
            // console.log(err);
            if (err?.error?.inputValid) err.error.message = err.error.errors[0];
            return throwError(err);
        }
    };

    get(url, params: HttpParams = new HttpParams()): Observable<any> {
        this.SetHeader();
        return this.http
            .get(url, { headers: this.headers, params })
            .pipe(catchError(this.handleErrors));
    }

    getpublic(
        url,
        params: HttpParams = new HttpParams(),
        headers?
    ): Observable<any> {
        return this.http
            .get(url, { params, headers })
            .pipe(catchError(this.handleErrors));
    }

    post(
        url: string,
        body: Object = {},
        params: HttpParams = new HttpParams()
    ): Observable<any> {
        this.SetHeader();
        // console.log(this.headers);
        return this.http
            .post(url, body, { headers: this.headers, params })
            .pipe(catchError(this.handleErrors));
    }

    postpublic(
        url: string,
        body: Object = {},
        params: HttpParams = new HttpParams(),
        headers?
    ): Observable<any> {
        return this.http
            .post(url, body, { headers, params })
            .pipe(catchError(this.handleErrors));
    }

    put(url: string, body: Object = {}): Observable<any> {
        return this.http.put(url, body).pipe(catchError(this.handleErrors));
    }

    delete(
        url: string,
        params: HttpParams = new HttpParams()
    ): Observable<any> {
        return this.http
            .delete(url, { headers: this.headers, params })
            .pipe(catchError(this.handleErrors));
    }
}
