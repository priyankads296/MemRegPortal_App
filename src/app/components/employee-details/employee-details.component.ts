import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeDataList } from 'src/app/models/employee.model';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit{
 
  constructor(private employeeService:EmployeeService,private router: Router,
    private authService:AuthService) { }

  // selectedCountry!: string;
  // selectedState!:string;
  employees:EmployeeDataList[]=[];
  empName:any;
  p:number=1;

  ngOnInit(): void {
    this.employeeService.getAllEmployees()
    .subscribe({
      next:(emp)=>{
        console.log(this.employees);
        this.employees=emp.data;
        console.log(this.employees);
        
      },
      error:(response) => {
        this.authService.errorCheck(response);
        console.log(response);
      }
    })
  }

  Search(){
    if(this.empName==""){
      this.ngOnInit();
    }
    else{
      this.employees=this.employees.filter(res=>{
        return res.Name.toLocaleLowerCase().match(this.empName.toLocaleLowerCase()) ||
        res.Id.toLocaleLowerCase().match(this.empName.toLocaleLowerCase());
      })
    }
  }

  key:string='id';
  reverse:boolean=false;
  Sort(key: any){
    this.key=key;
    this.reverse=!this.reverse;
  }
  empToDelete:EmployeeDataList|null=null;
  showDeleteModal=false;

  openDeleteModal(emp:EmployeeDataList):void
  {
    // console.log("open",emp);
    this.empToDelete=emp;
    console.log(this.empToDelete.Id);
    // this.deleteEmp();
    // this.showDeleteModal=true;
    
  }
  closeDeleteModal():void{
    this.showDeleteModal=false;
    this.empToDelete=null;
  }
  deleteEmp()
  {
    console.log(this.empToDelete);
    if(this.empToDelete)
    {
      console.log(this.empToDelete.Id);
      this.employeeService.deleteEmployee(this.empToDelete.Id)
      .subscribe({
        next:(res)=>{
          // alert("Employee deleted!");
          console.log(res);
          // this.empToDelete=null;
          window.location.reload();
          
        },
        error:(response)=>{
          console.log(response);
          this.authService.errorCheck(response);
          // alert("Data not entered. Please enter all the details correctly.");
        }
      })
    }
    
    
  }

 
}

