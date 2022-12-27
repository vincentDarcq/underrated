import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate{

  token: string;
  valid: boolean;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  public async canActivate(): Promise<boolean> {
    this.valid = await this.getValidToken();
    if(this.valid){
      return this.valid;
    } else {
      this.router.navigate(['/sign']);
    }
  }

  private getValidToken(): Promise<boolean>{
    if(localStorage.getItem("token")){
      this.token = localStorage.getItem("token");
    }
    return this.http.get<boolean>(`/api/auth/validToken`, {
      params: {
        token: this.token
      }
    }).toPromise();
  }

  public signin(id: string, pwd: string){
    this.http.get<string>(`/api/auth/signin`, {
      params: {
        id: id,
        pwd: pwd
      }
    }).subscribe ( (token: string) => {
      localStorage.setItem("token", token);
      this.token = token;
      this.router.navigate(['/admin-f']);
    });
  }

  public signout(){
    localStorage.removeItem("token");
    this.token = null;
    this.router.navigate(['/']);
  }
}
