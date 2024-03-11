import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClaimDataList } from 'src/app/models/claim.model';
import { ClaimService } from 'src/app/services/claim.service';
import { Location } from '@angular/common';
import { ViewClaimModalComponent } from '../view-claim-modal/view-claim-modal.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-claim-page',
  templateUrl: './claim-page.component.html',
  styleUrls: ['./claim-page.component.css']
})
export class ClaimPageComponent {
  constructor(private claimService:ClaimService,private router: Router,
    private datePipe:DatePipe,private location: Location,
    private _viewClaimModal:ViewClaimModalComponent,
    private authService:AuthService) { }

  claims:ClaimDataList[]=[];
  memberName:any;
  p:number=1;
  admDate:string|null="";
  disDate:string|null="";

  ngOnInit():void{
    this.claimService.getAllClaim()
    .subscribe({
      next:(clm)=>{
        console.log(this.claims);
        this.claims=clm.data;
        console.log(this.claims);
        // for(let i of this.claims)
        // {
        //   console.log(i);
        //   const _doa=i.AdmissionDate;
        //   const formattedDOA=this.datePipe.transform(_doa,'dd-MM-yyyy','UTC');
        //   this.admDate=formattedDOA;
        //   const _dod=i.DischargeDate;
        //   const formattedDOD=this.datePipe.transform(_dod,'dd-MM-yyyy','UTC');
        //   this.disDate=formattedDOD;
        // }
        
        
      },
      error:(response) => {
        // console.log(response["error"].title);
        this.authService.errorCheck(response);
      }
    })
  }

  formatDate(_date:Date)
  {
  
   return this.datePipe.transform(_date,'dd-MM-yyyy','UTC');
  
  }
  Search()
  {
    if(this.memberName==""){
      this.ngOnInit();
    }
    else{
      this.claims=this.claims.filter(res=>{
        return (res.MemberName as string).toLocaleLowerCase().match(this.memberName.toLocaleLowerCase()) ||
        res.Id.toLocaleLowerCase().match(this.memberName.toLocaleLowerCase());
      })
    }
  }
  // changeURL(_mName: any)
  // {
  //   // this.location.go('/claim/memberName?='+_mName);
  //   this.router.navigate(['/claim/memberName',_mName]);
  // }
  viewClaim(_claimId:string | null){
    this.claimService.changeClaimId(_claimId);
    this.location.go('/claim/claimId?='+_claimId);
    // this._viewClaimModal.viewClaimModal();
  }
  clmToDelete:ClaimDataList|null=null;
  openDeleteClaimModal(clm:ClaimDataList):void
  {
    this.clmToDelete=clm;

  }
  deleteClaim()
  {
    if(this.clmToDelete)
    {
      this.claimService.deleteClaimById(this.clmToDelete.Id)
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
          alert("Data not entered. Please enter all the details correctly.");
        }
      })
    }
  }

}

