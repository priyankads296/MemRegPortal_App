import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClaimDataList } from 'src/app/models/claim.model';
import { DependentDataList } from 'src/app/models/dependent.model';
import { EmployeeDataList } from 'src/app/models/employee.model';
import { AuthService } from 'src/app/services/auth.service';
import { ClaimService } from 'src/app/services/claim.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-claim-modal',
  templateUrl: './claim-modal.component.html',
  styleUrls: ['./claim-modal.component.css']
})
export class ClaimModalComponent {
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
  
  constructor(private route: ActivatedRoute,private employeeService:EmployeeService,private router: Router,
    private datePipe:DatePipe,private claimService:ClaimService,private authService:AuthService) { }
    empName:string|null="";
  empDOB: string|null="";
  

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next:(params) => {
        this.empName=params.get('Name');
        const modifiedName=this.empName?.replace(/%/g,'_');
        console.log(params);
        this.claimDetails.MemberName=params.get('Name');
       
        if(this.empName){
          this.employeeService.getEmployeeByName(this.empName)
          .subscribe({
            next:(response)=>{
              console.log(response);
              console.log(response["data"]);
              
              this.employeeDetails=<EmployeeDataList><unknown>response["data"];
              const _dob=new Date(this.employeeDetails.DOB);
              const formattedDate=this.datePipe.transform(_dob,'dd-MM-yyyy','UTC');
              this.empDOB=formattedDate;
              
              
            },
            error:(response)=>{
              
              console.log(response);
              this.authService.errorCheck(response);
            }
          })
          
          
        }
      }
    })
  

    
  
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

  
  addClaim()
  {
    this.claimDetails.Dependents=this.emptyDependentDetails;
    console.log(this.claimDetails.Dependents);
    const claimRequest=this.claimDetails;
    this.claimService.addClaim(this.employeeDetails.Name,claimRequest)
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
        alert("Data not entered. Please enter all the details correctly.");
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
