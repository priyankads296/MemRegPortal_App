import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DeleteEmployeeID, EmployeeData, EmployeeDataList } from '../models/employee.model';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseApiUrl: string=environment.baseApiUrl;

  constructor(private http:HttpClient) { }

  getAllEmployees():Observable<EmployeeData>{
    return this.http.get<EmployeeData>(this.baseApiUrl+'/api/MemReg/GetAllRecord');
  }

  addEmployee(addEmployeeRequest:EmployeeDataList):Observable<EmployeeDataList>{
    
    return this.http.post<EmployeeDataList>(this.baseApiUrl+'/api/MemReg/InsertMember',addEmployeeRequest);
  }

  getEmployeeById(id:string):Observable<EmployeeData>{
    return this.http.get<EmployeeData>(this.baseApiUrl+'/api/MemReg/GetRecordById?id='+id);
  }
  getEmployeeByName(empName:string):Observable<EmployeeData>{
    return this.http.get<EmployeeData>(this.baseApiUrl+'/api/MemReg/GetRecordByName?name='+empName);
  }
  updateEmployee(name:string,updateEmployeeRequest:EmployeeDataList):Observable<EmployeeDataList>{
    return this.http.put<EmployeeDataList>(this.baseApiUrl+'/api/MemReg/UpdateMemberByName',updateEmployeeRequest);
  }

  deleteEmployee(id:string):Observable<DeleteEmployeeID>{
    return this.http.delete<DeleteEmployeeID>(this.baseApiUrl+'/api/MemReg/DeleteRecordById?id='+id);
    
  }

 
}
