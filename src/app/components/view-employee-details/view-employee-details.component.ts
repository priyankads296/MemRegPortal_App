import { CommonModule, DatePipe, formatDate } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { ClaimDataList } from 'src/app/models/claim.model';
import { DependentDataList } from 'src/app/models/dependent.model';
import { EmployeeDataList } from 'src/app/models/employee.model';
import { AuthService } from 'src/app/services/auth.service';
import { ClaimService } from 'src/app/services/claim.service';
import { EmployeeService } from 'src/app/services/employee.service';

interface State{
  name:string;
  code:string;
  country:string;
}; 

@Component({
 
  selector: 'app-view-employee-details',
  templateUrl: './view-employee-details.component.html',
  styleUrls: ['./view-employee-details.component.css']
})
export class ViewEmployeeDetailsComponent implements OnInit{

  employeeDetails:EmployeeDataList={
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

  dependentDetails:DependentDataList[]=[];
  claimDetails:any[]=[];
 
  editingEmployee!: EmployeeDataList; 

 constructor(private route: ActivatedRoute,private employeeService:EmployeeService,private router: Router,
  private claimService:ClaimService,private datePipe:DatePipe,
  private authService:AuthService) { }
  
  empName:string|null="";
  empDOB: string|null="";
  empState: string|null="";
  countries: string[]=['India','USA','Canada','UK'];
  states:string[]=[];

  selectedCountry!: string;
  selectedState!:string;
  claimDetailsKeys:string[]=[];
  
  // allStates:State[]=[];

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next:(params) => {
        this.empName=params.get('Name');
        const modifiedName=this.empName?.replace(/%/g,'_');
        // console.log(params);
       
        if(this.empName){
          this.employeeService.getEmployeeByName(this.empName)
          .subscribe({
            next:(response)=>{
              // console.log(response);
              // console.log(response["data"]);
              
              this.employeeDetails=<EmployeeDataList><unknown>response["data"];
              const _dob=new Date(this.employeeDetails.DOB);
              const formattedDate=this.datePipe.transform(_dob,'dd-MM-yyyy','UTC');
              this.empDOB=formattedDate;

              // console.log(this.empState);
              this.selectedCountry=this.employeeDetails.Country;
              this.selectedState=this.employeeDetails.State;
              // console.log(this.selectedState);
              // this.filterStates();
              // console.log(this.filteredStates);
              // console.log(this.employeeDetails.DOB);
              // console.log(this.empDOB);
              // console.log(formattedDate);
              
            },
            error:(response)=>{
              
              console.log(response);
              this.authService.errorCheck(response);
            }
          })
          this.claimService.getClaimByName(this.empName)
          .subscribe({
            next:(res)=>{
              
              this.claimDetails=res["data"];
              console.log(this.claimDetails.length);
              // console.log(this.claimDetails.length);
              // this.claimDetailsKeys=Object.keys(this.claimDetails);
              // console.log(this.claimDetailsKeys.length);
            },
            error:(response) => {
              console.log(response);
              this.authService.errorCheck(response);
            }
          })
          
        }
        // if(this.empName)
        // {
        //   this.claimService.getClaimByName(this.empName)
        //   .subscribe({
        //     next:(res)=>{
              
        //       this.claimDetails=res.data;
        //     },
        //     error:(response) => {
        //       console.log(response);
        //     }
        //   })
        // }
      }
    })
  

    
  
  }
  
  openEditModal(employee:EmployeeDataList)
  {
    this.editingEmployee={...employee};
  }

  populateStates(){
    const selectedCountry=this.employeeDetails["Country"];
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
  updateEmployee(){
    this.employeeService.updateEmployee(this.employeeDetails.Name,this.employeeDetails)
    .subscribe({
      next:(response)=>{
        alert("Data Edited Successfully");
      }
    })
  }

//  allCountries:string[]=['India','USA','Canada','UK'];
//  allStates:State[]=[
//     {name:'Delhi',code:'ST1',country:'India'},
//     {name:'Maharashtra',code:'ST2',country:'India'},
//     {name:'Bihar',code:'ST3',country:'India'},
//     {name:'West Bengal',code:'ST4',country:'India'},
//     {name:'Tamil Nadu',code:'ST5',country:'India'},
//     {name:'New York',code:'ST6',country:'USA'},
//     {name:'California',code:'ST7',country:'USA'},
//     {name:'Texas',code:'ST8',country:'USA'},
//     {name:'Florida',code:'ST9',country:'USA'},
//     {name:'Ontario',code:'ST10',country:'Canada'},
//     {name:'Quebec',code:'ST11',country:'Canada'},
//     {name:'British Columbia',code:'ST12',country:'Canada'},
//     {name:'Alberta',code:'ST13',country:'Canada'},
//     {name:'England',code:'ST14',country:'UK'},
//     {name:'Scotland',code:'ST15',country:'UK'},
//     {name:'Wales',code:'ST16',country:'UK'},
//     {name:'Northern Ireland',code:'ST17',country:'UK'}
//   ];
  // filteredStates:State[]=[];
  // filterStates(){
  //   const selectedCountry=this.employeeDetails.Country;
  //   this.filteredStates=this.allStates.filter(state=>state.country==selectedCountry);
  //   console.log(this.filteredStates);
  // }
  
  
  

  

}

