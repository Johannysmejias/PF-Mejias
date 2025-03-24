import { Injectable } from "@angular/core";
import { LoginPayload } from "../../modules/auth/models";
import { BehaviorSubject, map, Observable } from "rxjs";
import { User } from '../../modules/dashboard/pages/users/index';
import { generateRandomString } from "../../shared/utils";
import { Route, Router } from "@angular/router";

const FAKE_USERS_DB: User[]=[
{
    id: generateRandomString(6),
    name: "Admin",
    email: "admin@gmail.com",
    password: "123456",
    accessToken: "dgyfbf1",
    role: "ADMIN"
},
{
    id: generateRandomString(6),
    name: "Employee",
    email: "employee@gmail.com",
    password: "123456",
    accessToken: "fdewsxc3",
    role: "EMPLOYEE"
}
];

@Injectable({providedIn: 'root'})
export class AuthService{
    private _authUser$ = new BehaviorSubject<null | User>(null);
    authUser$= this._authUser$.asObservable();

    constructor(private router: Router){

    }
    login(payload:LoginPayload): void{
        const loginResult = FAKE_USERS_DB.find((user) => user.email === payload.email && user.password === payload.password);
        if(!loginResult){
            alert("Email o password invalidos");
            return;
        }
        localStorage.setItem('access_token', loginResult.accessToken);
        this._authUser$.next(loginResult);
        this.router.navigate(['dashboard', 'home'])
    }
    isAuthenticated(): Observable<boolean>{
        const storegeUser = FAKE_USERS_DB.find(x => x.accessToken === localStorage.getItem('access_token'))
        this._authUser$.next(storegeUser || null );
        return this.authUser$.pipe( map(x => !!x));
    }
    logout(): void {
        localStorage.removeItem('access_token');
        this._authUser$.next(null);
        this.router.navigate(['auth', 'login']);
    }
}