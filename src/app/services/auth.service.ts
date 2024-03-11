import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginDetails, LoginResponse } from '../models/login.model';
import { RegisterDetails } from '../models/register.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: BehaviorSubject<any>=new BehaviorSubject(null); //to decrypt jwt token
  baseApiUrl:string=environment.baseApiUrl; 
  jwtHelperService=new JwtHelperService();

  constructor(private http:HttpClient) { }

  errorCheck(res:any)
  {
    if(res instanceof HttpErrorResponse)
        {
          if(res.error){
            if(Array.isArray(res.error))
            {
              res.error.forEach((e,i)=>{
                // this.errorCaptured+=e;
              });
            }else if(typeof res.error==='object'){
              const errorMessage=Object.values(res.error["errors"]).flat();
              // this.errorCaptured=JSON.stringify(res.error["errors"],null,2);
              errorMessage.forEach(m=>alert(m));
            }else{
              // this.errorCaptured+=res.error;
            }
          }
        }
  }

  registerUser(user:RegisterDetails){
    return this.http.post(this.baseApiUrl+"/api/Login/Register",user);
  }
 
  loginUser(loginInfo:LoginDetails)
  {
    return this.http.post(this.baseApiUrl+"/api/Login/Login",loginInfo);
  }
  setToken(token:string){
    localStorage.setItem("access_token",token);
    this.loadCurrentUser();
  }

  loadCurrentUser(){
    const token=localStorage.getItem("access_token");
    const userInfo=token != null ? this.jwtHelperService.decodeToken(token) : null ;
    const data=userInfo?{
      Firstname: userInfo.Firstname,
      Lastname: userInfo.Lastname,
      PhoneNo: userInfo.PhoneNo,
      UserID: userInfo.UserID,
      Username: userInfo.Username,
      // UserId:userInfo.UserId

    } :null;
    this.currentUser.next(data);
    console.log(data);
  }

  isLoggedIn():boolean{
    return localStorage.getItem("access_token")?true:false;
  }

  removeToken(){
    localStorage.removeItem("access_token");
  }
 
}
