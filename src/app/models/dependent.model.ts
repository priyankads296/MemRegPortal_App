export interface DependentData {
    IsSuccess: string,
    Message: string
  }
  
  export interface DependentDataList {
    
    Name:string,
    Gender:string,
    Address:string,
    DOB:Date,
    PhoneNo:string,
    EmailId:string,
    PAN:string

  }

export interface DeleteDependent
{
    IsSuccess: string,
    Message: string
}
export interface DeleteDependentID{
     Id:string
}