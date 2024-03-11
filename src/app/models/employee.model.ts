export interface EmployeeData {
    IsSuccess: string,
    Message: string,
    data: EmployeeDataList[]
  }
  
  export interface EmployeeDataList {
    
    Id:string;
    CreatedDate:string,
    UpdatedDate:string,
    Name:string,
    Gender:string,
    Country:string,
    State:string,
    City:string,
    Address:string,
    DOB:Date,
    PhoneNo:string,
    EmailId:string,
    PAN:string

  }

export interface DeleteEmployee
{
    IsSuccess: string,
    Message: string
}
export interface DeleteEmployeeID{
     Id:string
}