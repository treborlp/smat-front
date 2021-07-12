import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { environment } from 'environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

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
    }

    get accessToken(): string
    {
        return localStorage.getItem('access_token') ?? '';
    }

    set refreshToken(token: string)
    {
        localStorage.setItem('refresh_token', token);
    }

    get refreshToken(): string
    {
        return localStorage.getItem('refresh_token') ?? '';
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
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'text/plain; charset=UTF-8'
            })
        }
        return this._httpClient.post(`${environment.HOST}/login/enviarCorreo`, email, {headers:httpOptions.headers});
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string, token: string): Observable<any>
    {
        const body = { clave: password };
        return this._httpClient.post(`${environment.HOST}/login/restablecer/${token}`, body);

    }

    checkUrlToken(token:string): Observable<any>{
        return this._httpClient.get(`${environment.HOST}/login/verificar/${token}`)
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

        //Set http parameters
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

                // Store the access refresh token in local storage
                // this.refreshToken = response.refresh_token;

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.user;

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
        const jwtUtil = new JwtHelperService;
        const decodeToken = jwtUtil.decodeToken(this.accessToken);
        const httpOptions = {
           headers : new HttpHeaders({
               'Authorization': 'bearer ' + this.accessToken
           })
        }
        
        // Renew token
        return this._httpClient.get(`${environment.HOST}/usuarios/${decodeToken.user_name}`, {
            headers: httpOptions.headers
        }).pipe(
            catchError(() => {
                // Return false
                return of(false);
            }),
            switchMap((response: any) => {

                // Store the access token in the local storage
                //this.accessToken = response.access_token;

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response;

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
