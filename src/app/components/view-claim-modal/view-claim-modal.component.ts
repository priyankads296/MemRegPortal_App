import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClaimDataList } from 'src/app/models/claim.model';
import { ClaimService } from 'src/app/services/claim.service';
import { Location } from '@angular/common';
import { DependentDataList } from 'src/app/models/dependent.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-view-claim-modal',
  templateUrl: './view-claim-modal.component.html',
  styleUrls: ['./view-claim-modal.component.css']
})
export class ViewClaimModalComponent {

  constructor(private claimService:ClaimService,private router: Router,
    private datePipe:DatePipe,private route:ActivatedRoute,
    private location:Location,private authService:AuthService) { }

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
  memName!: string;
  memClaimId!:string;
  memDOB:string|null="";
  admDate:string|null="";
  disDate:string|null="";
  depDOB:string|null="";

  ngOnInit():void{
    this.claimService.currentMemberClaimId.subscribe(_claimId=>
      {
        this.memClaimId=_claimId;
        //  console.log(this.memName);
        if(_claimId)
         this.viewClaimModal(this.memClaimId);
      });
      // this.claimService.getClaimByName(this.memName)
      //   .subscribe({
      //     next:(res)=>{
      //       console.log(res["data"]);            
      //       this.claimDetails=<ClaimDataList><unknown>res["data"];
      //       console.log(this.claimDetails.Dependents[0]);
    
      //       // this.emptyDependentDetails=this.claimDetails.Dependents;
      //       this.dependentDetails=<DependentDataList><unknown>this.claimDetails.Dependents[0];
      //       // console.log(this.dependentDetails.Address);

      //       const _dob=new Date(this.claimDetails.DOB);
      //       const formattedDate=this.datePipe.transform(_dob,'dd-MM-yyyy','UTC');
      //       this.memDOB=formattedDate;

      //       const _doa=new Date(this.claimDetails.AdmissionDate);
      //       const formattedAdmissionDate=this.datePipe.transform(_doa,'dd-MM-yyyy','UTC');
      //       this.admDate=formattedAdmissionDate;

      //       const _dod=new Date(this.claimDetails.DischargeDate);
      //       const formattedDischargeDate=this.datePipe.transform(_dod,'dd-MM-yyyy','UTC');
      //       this.disDate=formattedDischargeDate;

      //       const _depdob=new Date(this.dependentDetails.DOB);
      //       const formattedDependentDOB=this.datePipe.transform(_depdob,'dd-MM-yyyy','UTC');
      //       this.depDOB=formattedDependentDOB;
      //     }
      //   }) 

          
        // console.log(params);
        
  }
  viewClaimModal(memClaimId:any)
  {
    // if(memName)
    this.claimService.getClaimById(memClaimId)
        .subscribe({
          next:(res)=>{
            console.log(res["data"]);            
            this.claimDetails=<ClaimDataList><unknown>res["data"];
            console.log(this.claimDetails.Dependents[0]);
    
            // this.emptyDependentDetails=this.claimDetails.Dependents;
            this.dependentDetails=<DependentDataList><unknown>this.claimDetails.Dependents[0];
            // console.log(this.dependentDetails.Address);

            const _dob=new Date(this.claimDetails.DOB);
            const formattedDate=this.datePipe.transform(_dob,'dd-MM-yyyy','UTC');
            this.memDOB=formattedDate;

            const _doa=new Date(this.claimDetails.AdmissionDate);
            const formattedAdmissionDate=this.datePipe.transform(_doa,'dd-MM-yyyy','UTC');
            this.admDate=formattedAdmissionDate;

            const _dod=new Date(this.claimDetails.DischargeDate);
            const formattedDischargeDate=this.datePipe.transform(_dod,'dd-MM-yyyy','UTC');
            this.disDate=formattedDischargeDate;

            const _depdob=new Date(this.dependentDetails.DOB);
            const formattedDependentDOB=this.datePipe.transform(_depdob,'dd-MM-yyyy','UTC');
            this.depDOB=formattedDependentDOB;
          },
          error:(response)=>{
            console.log(response);
            this.authService.errorCheck(response);
            // alert("Data not entered. Please enter all the details correctly.");
          }

        });
    
  }
  closeModal()
  {
    this.location.go("/claim-page")
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
