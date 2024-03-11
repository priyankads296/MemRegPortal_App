import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AllClaimData, ClaimData, ClaimDataList, DeleteClaim } from '../models/claim.model';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {

  private memberNameSource=new BehaviorSubject<string>('');
  currentMemberClaimId=this.memberNameSource.asObservable();

  baseApiUrl: string=environment.baseApiUrl;

  constructor(private http:HttpClient) { }

  changeClaimId(_claimId:string|null){
    this.memberNameSource.next(_claimId as string);
  }
  isOpen=false;
  openModal(){
    this.isOpen=true;
  }
  closeModal(){
    this.isOpen=false;
  }
  

  addClaim(name:string,claimRequest:ClaimDataList):Observable<ClaimData>{
    return this.http.post<ClaimData>(this.baseApiUrl+'/api/MemReg/SubmitClaim?name='+name,claimRequest);
  }
  getAllClaim():Observable<AllClaimData>{
    return this.http.get<AllClaimData>(this.baseApiUrl+'/api/MemReg/GetAllClaim');
  }
  getClaimByName(memberName:string):Observable<AllClaimData>{
    return this.http.get<AllClaimData>(this.baseApiUrl+'/api/MemReg/GetClaimByName?memberName='+memberName);
  }
  getClaimById(claimId:string):Observable<AllClaimData>{
    return this.http.get<AllClaimData>(this.baseApiUrl+'/api/MemReg/GetClaimById?claimId='+claimId);
  }
  deleteClaimById(id:string):Observable<DeleteClaim>{
    return this.http.delete<DeleteClaim>(this.baseApiUrl+'/api/MemReg/DeleteClaimById?id='+id);
    
  }
}
