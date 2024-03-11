import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeDataList } from 'src/app/models/employee.model';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-add-emp-modal',
  templateUrl: './add-emp-modal.component.html',
  styleUrls: ['./add-emp-modal.component.css']
})
export class AddEmpModalComponent {
  constructor(private employeeService:EmployeeService,private router: Router,
    private authService:AuthService) { }
  addEmployeeRequest:EmployeeDataList={
    Id:'',
    CreatedDate:'',
    UpdatedDate:'',
    Name:'',
    Gender:'',
    Country:'',
    State:'',
    City:'',
    Address:'',
    DOB:new Date,
    PhoneNo:'',
    EmailId:'',
    PAN:''
  }
  countries: string[]=['India','USA','Canada','UK'];
  states:string[]=[];
  employees:EmployeeDataList[]=[];
  populateStates(){
    const selectedCountry=this.addEmployeeRequest["Country"];
    this.updateStates(selectedCountry);
    
    }
    private updateStates(selectedCountry: string) {
      switch(selectedCountry){
        case 'India':
          this.states=['Delhi','Maharashtra','Bihar','West Bengal','Tamil Nadu'];
          break;
        case 'USA':
          this.states=['New York','California','Texas','Florida'];
          break;
        case 'Canada':
          this.states=['Ontario','Quebec','British Columbia','Alberta'];
          break;
        case 'UK':
          this.states=['England', 'Scotland', 'Wales','Northern Ireland'];
  }
}
addEmployee()
  {
    this.employeeService.addEmployee(this.addEmployeeRequest)
    .subscribe({
      next:(res)=>
      {
        alert("Employee Data entered successfully!");
        
        this.clearForm();
        // this.employees.unshift(res);
        // this.router.navigate(['employeeDetails']);
        window.location.reload();
        // this.onClose();
      },
      error:(response)=>{
        console.log(response);
        this.authService.errorCheck(response);
        // alert("Data not entered. Please enter all the details correctly.");
      }
    });
  }
  clearForm() {
    this.name.setValue('');
    this.gender.setValue('');
    this.address.setValue('');
    this.dob.setValue('');
    this.country.setValue('');
    this.state.setValue('');
    this.city.setValue('');
    this.phoneNo.setValue('');
    this.emailId.setValue('');
    this.pan.setValue('');
  }
  employeeForm=new FormGroup({
    Id:new FormControl(""),
    CreatedDate:new FormControl(""),
    UpdatedDate:new FormControl(""),
    Name:new FormControl("",[
      Validators.required,
      Validators.minLength(2),
      Validators.pattern("^[a-zA-Z ]*$")]),
    Gender:new FormControl("",[
      Validators.required
    ]),
    Country:new FormControl("",[
      Validators.required
    ]),
    State:new FormControl("",[
      Validators.required
    ]),
    City:new FormControl("",[
      Validators.required,
      Validators.pattern("^[a-zA-Z ]+$")
    ]),
    Address:new FormControl("",[
      Validators.required,
      Validators.minLength(2),
      Validators.pattern("^[a-zA-Z1-9 ]*$")
    ]),
    DOB:new FormControl(Date,[
      Validators.required
    ]),
    PhoneNo:new FormControl("",[
      Validators.required,
      Validators.pattern("^[0-9]{1,10}$"),
      
    ]),
    EmailId:new FormControl("",[
      Validators.required,
      Validators.email
    ]
    ),
    PAN:new FormControl("",[
      Validators.required,
      Validators.pattern("^[a-zA-Z0-9]{12}$")
    ])
  });
  get name(): FormControl{
    return this.employeeForm.get("Name") as FormControl;
  }
  get gender():FormControl{
    return this.employeeForm.get("Gender") as FormControl;
  }
  get address(): FormControl{
    return this.employeeForm.get("Address") as FormControl;
  }
  get country(): FormControl{
    return this.employeeForm.get("Country") as FormControl;
  }
  get state(): FormControl{
    return this.employeeForm.get("State") as FormControl;
  }
  get city(): FormControl{
    return this.employeeForm.get("City") as FormControl;
  }
  get dob(): FormControl{
    return this.employeeForm.get("DOB") as FormControl;
  }
  get phoneNo(): FormControl{
    return this.employeeForm.get("PhoneNo") as FormControl;
  }
  get emailId(): FormControl{
    return this.employeeForm.get("EmailId") as FormControl;
  }
  get pan(): FormControl{
    return this.employeeForm.get("PAN") as FormControl;
  }

}
