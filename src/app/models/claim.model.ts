import { DecimalPipe } from "@angular/common";
import { DependentDataList } from "./dependent.model";

export interface ClaimData {
    IsSuccess: string,
    Message: string
  }
  
  export interface ClaimDataList {
    
    Id:string;
    MemberName:string | null,
    DOB:Date,
    Address:string,
    AdmissionDate:Date,
    DischargeDate:Date,
    ProviderName:string,
    Description:string,
    Amount:number,
    Dependents:DependentDataList[]

  }

export interface AllClaimData
{
    IsSuccess: string,
    Message: string,
    data:ClaimDataList[]
}
export interface DeleteClaim
{
    IsSuccess: string,
    Message: string
}

// export interface DeleteDependent
// {
//     IsSuccess: string,
//     Message: string
// }
// export interface DeleteDependentID{
//      Id:string
// }