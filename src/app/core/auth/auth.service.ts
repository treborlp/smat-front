import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { environment } from 'environments/environment';

@Injectable()
export class AuthService
{
    private _authenticated: boolean = false;
    private url: string = `${environment.HOST}/oauth/token`

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string)
    {
        localStorage.setItem('access_token', token);
        //sessionStorage.setItem('access_token', token);
    }

    get accessToken(): string
    {
        return localStorage.getItem('access_token') ?? '';
        //return sessionStorage.getItem('access_token') ?? '';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any>
    {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any>
    {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { email: string, password: string }): Observable<any>
    {
        // Throw error, if the user is already logged in
        if ( this._authenticated )
        {
            return throwError('User is already logged in.');
        }

        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/x-www-form-urlencoded; charset=UTF-8',
              'Authorization': 'Basic ' + btoa(environment.TOKEN_AUTH_USERNAME + ':' + environment.TOKEN_AUTH_PASSWORD),
            }),
            body: `grant_type=password&username=${encodeURIComponent(credentials.email)}&password=${encodeURIComponent(credentials.password)}`, 
          };

        return this._httpClient.post(this.url, httpOptions.body, {headers:httpOptions.headers}).pipe(
            switchMap((response: any) => {

                // Store the access token in the local storage
                this.accessToken = response.access_token;
                console.log(response)

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                //this._userService.user = response.user;
                const usertemp: any = 
                {
                    id    : 'cfaad35d-07a3-4447-a6c3-d8c3d54fd5df',
                    name  : 'Brian Hughes',
                    email : 'hughes.brian@company.com',
                    avatar: 'assets/images/avatars/brian-hughes.jpg',
                    status: 'online'
                }


                this._userService.user = usertemp;

                // Return a new observable with the response
                return of(response);
            })
        );
    }

     /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any>
    {
        // Renew token
        return this._httpClient.post('api/auth/refresh-access-token', {
            //access_token: this.accessToken
        }).pipe(
            catchError(() => {
                // Return false
                return of(false);
            }),
            switchMap((response: any) => {

                // Store the access token in the local storage
                //this.accessToken = response.access_token;
                this.accessToken = this.accessToken;

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service

                const usertemp: any = 
                {
                    id    : 'cfaad35d-07a3-4447-a6c3-d8c3d54fd5df',
                    name  : 'Brian Hughes',
                    email : 'hughes.brian@company.com',
                    avatar: 'assets/images/avatars/brian-hughes.jpg',
                    status: 'online'
                }
                
                this._userService.user = usertemp;
                //this._userService.user = response.user;


                // Return true
                return of(true);
            })
        );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any>
    {
        // Remove the access token from the local storage
        localStorage.removeItem('access_token');

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: { name: string, email: string, password: string, company: string }): Observable<any>
    {
        return this._httpClient.post('api/auth/sign-up', user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string, password: string }): Observable<any>
    {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean>
    {
        // Check if the user is logged in
        if ( this._authenticated )
        {
            return of(true);
        }

        // Check the access token availability
        if ( !this.accessToken )
        {
            return of(false);
        }

        // Check the access token expire date
        if ( AuthUtils.isTokenExpired(this.accessToken) )
        {
            return of(false);
        }

        // If the access token exists and it didn't expire, sign in using it
        return this.signInUsingToken();
    }
}
