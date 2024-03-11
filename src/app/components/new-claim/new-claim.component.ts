import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClaimDataList } from 'src/app/models/claim.model';
import { DependentDataList } from 'src/app/models/dependent.model';
import { EmployeeDataList } from 'src/app/models/employee.model';
import { AuthService } from 'src/app/services/auth.service';
import { ClaimService } from 'src/app/services/claim.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-new-claim',
  templateUrl: './new-claim.component.html',
  styleUrls: ['./new-claim.component.css']
})
export class NewClaimComponent {
  
  constructor(private route: ActivatedRoute,private employeeService:EmployeeService,private router: Router,
    private datePipe:DatePipe,private claimService:ClaimService,
    private authService:AuthService) { }


    empName:string="";
    empDOB: string|null="";
    errorCaptured:string="";
    dobPopulated=false;
  ngOnInit():void{}
  employeeDetails:EmployeeDataList[]=[];

  dependentDetails:DependentDataList={
    
    Name:'',
    Gender:'',
    Address:'',
    DOB:new Date,
    PhoneNo:'',
    EmailId:'',
    PAN:''
  }
  emptyDependentDetails:DependentDataList[]=[];
  claimDetails:ClaimDataList={
    Id:'',
    MemberName:'',
    DOB:new Date,
    Address:'',
    AdmissionDate:new Date,
    DischargeDate:new Date,
    ProviderName:'',
    Description:'',
    Amount:0,
    Dependents:this.emptyDependentDetails
  }

  showDependentForm:boolean=false;
  openDependentForm():void
  {
    this.showDependentForm=true;
  }
  closeDependentForm():void
  {
    this.showDependentForm=false;
    this.emptyDependentDetails.push(
      this.dependentDetails
    );
    console.log(this.emptyDependentDetails);
  }
  
  updateDOB()
  {
    this.employeeService.getAllEmployees()
    .subscribe({
      next:(res)=>
      {
          this.employeeDetails=res.data;
          
          // this.empName=element.Name
      },
      error:(res)=>{
        console.log(res);
      }
    
    });
    for(let i of this.employeeDetails)
    {
      if(this.claimDetails.MemberName==i.Name)
      {
        const _dob=i.DOB;
        const formattedDate=this.datePipe.transform(_dob,'dd-MM-yyyy','UTC');
        this.empDOB=formattedDate;
       
      }
      
    }
    if(this.empDOB)
    {

      this.dobPopulated=true;
      
    }
    if(this.claimDetails.MemberName=="")
    {
      this.dobPopulated=false;
      this.empDOB="";
    }
      
  }

  addClaim()
  {
    
    this.claimDetails.Dependents=this.emptyDependentDetails;
    console.log(this.claimDetails.Dependents);
    const claimRequest=this.claimDetails;
    this.empName=this.claimDetails.MemberName as string;
    console.log(this.empName);
    this.claimService.addClaim(this.empName,claimRequest)
    .subscribe({
      next:(res)=>
      {
        console.log(claimRequest);
        console.log(res);
        alert("Claim Added Successfully");
        this.clearForm();
        window.location.reload();
      },
      error:(res)=>{
        console.log(res);
        this.authService.errorCheck(res);
        // if(res instanceof HttpErrorResponse)
        // {
        //   if(res.error){
        //     if(Array.isArray(res.error))
        //     {
        //       res.error.forEach((e,i)=>{
        //         this.errorCaptured+=e;
        //       });
        //     }else if(typeof res.error==='object'){
        //       const errorMessage=Object.values(res.error["errors"]).flat();
        //       // this.errorCaptured=JSON.stringify(res.error["errors"],null,2);
        //       errorMessage.forEach(m=>alert(m));
        //     }else{
        //       this.errorCaptured+=res.error;
        //     }
        //   }
        // }
        // // alert(this.errorCaptured);
        
      }
    
    });
  }
  addDependent(){
    this.emptyDependentDetails.push(
      this.dependentDetails
    );
    console.log(this.emptyDependentDetails);

  }

  claimForm=new FormGroup({
    ClaimId:new FormControl(""),
    MemberName:new FormControl("",[
      Validators.required,
      Validators.minLength(2),
      Validators.pattern("^[a-zA-Z ]*$")]),
    Address:new FormControl("",[
        Validators.required
      ]),
    DOB:new FormControl(Date,[
        Validators.required
      ]),
    AdmissionDate:new FormControl(Date,[
        Validators.required
      ]),
    DischargeDate:new FormControl(Date,[
        Validators.required
      ]),
    ProviderName:new FormControl("",[
      Validators.required
    ]),
    Description:new FormControl("",[
        Validators.required
      ]),
    Amount:new FormControl(0,[
      Validators.required
    ]),
    Dependents:new FormControl([])
  })
  dependentForm=new FormGroup({
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
    Address:new FormControl("",[
      Validators.required
    ]),
    DOB:new FormControl(Date,[
      Validators.required
    ]),
    PhoneNo:new FormControl("",[
      Validators.required
    ]),
    EmailId:new FormControl("",[
      Validators.required
    ]
    ),
    PAN:new FormControl("",[
      Validators.required
    ])
  });

  clearForm() {
    this.memberName.setValue('');
    this.address.setValue('');
    this.dob.setValue('');
    this.doa.setValue('');
    this.dod.setValue('');
    this.description.setValue('');
    this.amount.setValue('');
    this.dependents.setValue('');
  }
  get memberName(): FormControl{
    return this.claimForm.get("MemberName") as FormControl;
  }
  get address(): FormControl{
    return this.claimForm.get("Address") as FormControl;
  }
  get dob(): FormControl{
    return this.claimForm.get("DOB") as FormControl;
  }
  get doa(): FormControl{
    return this.claimForm.get("AdmissionDate") as FormControl;
  }
  get dod(): FormControl{
    return this.claimForm.get("DischargeDate") as FormControl;
  }
  get description(): FormControl{
    return this.claimForm.get("Description") as FormControl;
  }
  get amount(): FormControl{
    return this.claimForm.get("Amount") as FormControl;
  }
  get dependents(): FormControl{
    return this.claimForm.get("Dependents") as FormControl;
  }
}
